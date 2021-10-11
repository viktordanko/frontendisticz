const { src, dest } = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const config = require('./helpers/getConfig.js');
const forestryStaticData = require('./helpers/forestryData.js');
const getSitemap = require('./helpers/getSitemap.js');
const path = require('path');

module.exports = function buildCMS(done) {
	const onError = (error) => {
		notify.onError({
			title: 'Twig error!',
			message: '<%= error.message %>',
			sound: 'Beep',
		})(error);

		done();
	};

	return (
		src(['*.yml'], {
			cwd: '.forestry/front_matter/templates',
		})
			.pipe(
				plumber({
					errorHandler: onError,
				}),
			)
			// cache bust
			.pipe(
				forestryStaticData.build({
					// write static json file for testing
					file: 'routes.json',
					onData: (data, lastFile, stream) => {
						if (data == null) return data;

						Object.keys(data).forEach((lang) => {
							const part = data[lang];
							// create global accesible data
							part.global = {
								global: part.pages['data/' + lang + '/global.yml'] || {},
							};
						});

						// ganerate sitemap.xml
						const siteMapData = Object.keys(data).reduce((acc, lang) => {
							const part = data[lang];

							return acc.concat(
								Object.keys(part.routes).map((key) => {
									const { modifiedDate } = part.pages[key];
									const url = part.routes[key].replace(/\/index(.html)?$/, '/').replace('.html', '');

									let priority = url.replace(/^\//, '').split('/');
									if (priority[0] === '') priority = 0;
									else priority = priority.length;
									priority = 1 - priority * 0.2;

									return { url, modifiedDate, priority };
								}),
							);
						}, []);

						const joinedFile = lastFile.clone({ contents: false });
						joinedFile.contents = Buffer.from(getSitemap(siteMapData, process.env.SITE_URL));
						joinedFile.path = path.join(lastFile.base, 'sitemap.xml');
						stream.push(joinedFile);

						return data;
					},
				}),
			)
			.pipe(dest(config.basePath.dest))
	);
};
