const config = require('./helpers/getConfig.js');
const isProduction = require('./helpers/isProduction');
const gulp = require('gulp');
const notifier = require('node-notifier');
const browserSync = require('browser-sync');
const { series, watch: watchGulp } = gulp;

module.exports = function watch(done) {
	return series(
		function syncing(done) {
			browserSync(config.browserSync);
			done();
		},
		function watching() {

			watchGulp(config.src.styles + '**/*.scss', require('./sass'));
			watchGulp('content/**/*.json', require('./processData'));
			watchGulp([config.src.templates + '**/*.njk', config.basePath.src + 'content/*.json'], require('./nunjucks'));
			watchGulp(config.src.icons + '*.svg', require('./iconFont'));
			watchGulp(config.src.iconsSVG + '*.svg', require('./iconSvg'));
			watchGulp(config.src.scripts + 'static/*.js', require('./copyJs'));
			if (isProduction()) {
				watchGulp([
					config.src.scripts + '**/*',
					'!' + config.src.scripts + 'static/*.js',
				], require('./webpack'));
			}

			watchGulp([
				config.src.images + '**/*',
				'!' + config.src.images + '**/sprites*',
				'!' + config.src.images + '**/sprites*/*',
				'!' + config.src.images + '**/icons*',
				'!' + config.src.images + '**/icons*/*',
			], require('./copyImages'));
			watchGulp([
				config.basePath.src + '**/*',
				'!' + config.src.styles + '**/*',
				'!' + config.src.scripts + '**/*',
				'!' + config.src.images + '**/*',
				'!' + config.src.templates + '**/*',
			], require('./copyRoot'));

			notifier.notify({
				'title': 'Start Project',
				'message': 'Gulp is watching files.',
				'sound': 'Hero',
			});
		},
	)(done);
};
