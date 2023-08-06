const importFresh = require('import-fresh');
const { src, dest } = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');

const through2 = require('through2');

const twingRender = require('./helpers/twingRender.js');
const config = require('./helpers/getConfig.js');
const cacheBust = require('./helpers/cacheBust.js');
const forestryStaticData = require('./helpers/forestryData.js');

const path = require('path');

module.exports = function twig2(done) {
	const onError = (error) => {
		notify.onError({
			title: 'Twig error!',
			message: '<%= error.message %>',
			sound: 'Beep',
		})(error);

		done();
	};

	const forestryData = forestryStaticData.get();

	return (
		src(['ajax/*.twig'], {
			cwd: config.src.templates,
		})
			.pipe(
				plumber({
					errorHandler: onError,
				}),
			)
			.pipe(
				through2.obj(function cloneWithData(file, encoding, cb) {
					const { base, dir } = path.parse(file.path);

					this.push(file);
					if (forestryData) {
						const translationsData = forestryData.all.pages['data/all/translations.yml'] || {};
						const translations = translationsData.translations || [];

						Object.keys(forestryData).forEach((lang) => {
							const part = forestryData[lang];
							if (!part.templates || part.templates[base] == null) return;

							const pages = part.templates[base];

							pages.forEach((path) => {
								const slug = part.routes[path];
								const data = part.pages[path];
								const clone = file.clone();
								clone.data = {
									page_data: data,
									page_slug: slug,
									data_path: path,
									path: dir + slug,
									site_lang: lang,
									site_lang_url: lang === 'cz' ? '' : '/' + lang,
									site_globals: part.global,
									translations: translations.reduce((acc, cur) => {
										return {
											...acc,
											[cur.key]: cur[lang] || cur['cz'],
										};
									}, {}),
								};
								this.push(clone);
							});
						});
					}

					cb();
				}),
			)
			.pipe(
				twingRender(
					importFresh('./helpers/twing.js'),
					{ assets: config.assets, isLive: process.env.BUILD_TYPE === 'live' },
					{
						templatePaths: config.src.templates,
					},
				),
			)
			.pipe(
				through2.obj(function savePath(file, encoding, cb) {
					if (file.data && file.data.path) {
						file.path = file.data.path;
					}
					file.data = null;
					this.push(file);
					cb();
				}),
			)
			// cache bust
			.pipe(cacheBust())
			.pipe(
				gulpif(
					function (file) {
						return path.parse(file.path).name !== 'preview';
					},
					rename({
						extname: '.html',
					}),
				),
			)
			.pipe(dest(config.dest.templates + 'ajax/'))
	);
};
