var config = require('./helpers/getConfig.js');

var gulp = require('gulp');
var notifier = require('node-notifier');
var browserSync = require('browser-sync');
const {series, watch: watchGulp} = gulp;

module.exports = function watch(done) {
	return series(
		function syncing(done) {
			browserSync(config.browserSync);
			done();
		},
		function watching() {

			watchGulp(config.src.styles + '**/*.scss', require('./sass'));
			watchGulp(config.src.templates + '**/*.njk', require('./nunjucks'));
			watchGulp(config.src.images + 'bg/sprites/*.png', require('./sprite'));
			watchGulp(config.src.images + 'bg/sprites-retina/*.png', require('./spriteRetina'));
			watchGulp(config.src.icons + '*.svg', require('./iconFont'));
			watchGulp(config.src.iconsSVG + '*.svg', require('./iconSvg'));
			watchGulp(config.src.scripts + 'static/*.js', require('./copyJs'));
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
