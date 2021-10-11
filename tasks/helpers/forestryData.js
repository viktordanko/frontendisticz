const YAML = require('yamljs');
const slugify = require('slugify');
const fm = require('front-matter');
const marked = require('marked');
const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const through2 = require('through2');

const git = simpleGit({ maxConcurrentProcesses: 10 });
let globalData = null;
const hasTemplateField = (field) => field.name === 'template';

const build = (options = {}) => {
	let lastFile = null;
	let data = {};
	const stream = async function stream(file, encoding, cb) {
		lastFile = file;
		let content = file.contents.toString('utf-8');
		let config = YAML.parse(content);

		let template = Array.isArray(config.fields) ? config.fields.find(hasTemplateField) : null;
		template = template && template.default ? template.default : null;

		if (!Array.isArray(config.pages)) {
			cb();
			return;
		}

		const pagesData = await Promise.all(
			config.pages.map(
				(page) =>
					new Promise((resolve) => {
						const filePath = path.resolve(process.cwd(), page);
						const { name, ext, dir } = path.parse(page);

						const [, lang, type] = dir.split('/');

						const dataPromise = new Promise((resolve) => {
							fs.readFile(filePath, (err, data) => {
								let result = {};
								if (ext === '.md') {
									result = fm(data.toString('utf-8'));
								} else if (ext === '.yml') {
									result = {
										attributes: YAML.parse(data.toString('utf-8')),
									};
								}

								resolve(result);
							});
						});

						const logPromise = git.log({ file: page });

						Promise.all([dataPromise, logPromise]).then(([result, log]) => {
							// const { mtime, birthtime } = stats;
							// get first commit date of file
							let createdDate = new Date();
							let modifiedDate = new Date();

							if (log.all && log.all.length > 0) {
								createdDate = new Date(log.all.slice(-1)[0].date);
								// get latest modified date of file
								modifiedDate = new Date(log.latest.date);
							}

							resolve({
								...result,
								slug: `${slugify(name)
									.replace('homepage', 'index')
									.toLowerCase()}`,
								path: dir
									.replace(/^data(\/)?/, '')
									.replace(/^cz(\/)?/, '')
									.replace(/^pages(\/)?/, '')
									.replace(/^(.*?)\/pages(\/)?/, '$1'),
								source: page,
								lang,
								type,
								name,
								createdDate,
								modifiedDate,
							});
						});
					}),
			),
		);
		pagesData.forEach((page) => {
			const page_data = {
				...(page.attributes || {}),
				page_name: page.name,
				markdown_body: marked(page.body || ''),
				createdDate: page.createdDate,
				modifiedDate: page.modifiedDate,
			};

			const part = (data[page.lang] = data[page.lang] || {
				pages: {},
				routes: {},
				global: {},
				templates: {},
				slugs: {},
			});

			part.pages[page.source] = page_data;

			if (template) {
				const slug = page.attributes.slug ? slugify(page.attributes.slug) : page.slug;
				const urlParts = [page.path, slug].filter(Boolean).join('/');

				part.slugs[urlParts] = part.slugs[urlParts] ? part.slugs[urlParts] + 1 : 1;

				const url = `/${urlParts}${part.slugs[urlParts] > 1 ? '-' + part.slugs[urlParts] : ''}.html`;
				// const url = isProduction() ? `/${urlParts.join('/')}` : `/${urlParts.join('/')}.html`; // gulp min = not working on superkoderi.cz
				part.routes[page.source] = url;

				// add template
				if (part.templates[template] == null) {
					part.templates[template] = [];
				}

				part.templates[template].push(page.source);
			}

		});

		cb();
	};

	const streamEnd = function streamEnd(cb) {
		if (typeof options.onData === 'function') {
			data = options.onData(data, lastFile, this);
		}

		globalData = data;
		if (options.file) {
			const joinedFile = lastFile.clone({ contents: false });
			joinedFile.contents = Buffer.from(JSON.stringify(data, null, 2));
			joinedFile.path = path.join(lastFile.base, options.file);
			this.push(joinedFile);
		}
		cb();
	};
	return through2.obj(stream, streamEnd);
};

const get = () => globalData;

module.exports = { build, get };
