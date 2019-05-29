var config = require('./helpers/getConfig.js');

var gulp = require('gulp');
var notifier = require('node-notifier');

gulp.task('watch', ['browserSync'], function() {

	gulp.watch(config.src.styles + '**/*.scss', ['sass']);
	gulp.watch(config.src.templates + '**/*.njk', ['nunjucks']);
	gulp.watch(config.src.images + 'bg/sprites/*.png', ['spritepacker']);
	gulp.watch(config.src.images + 'bg/sprites-retina/*.png', ['spritepacker-retina']);
	gulp.watch(config.src.icons + '*.svg', ['iconfont']);
	gulp.watch(config.src.iconsSVG + '*.svg', ['icon-svg']);
	gulp.watch(config.src.scripts + 'static/*.js', ['copy-js']);
	gulp.watch([
		config.src.images + '**/*',
		'!' + config.src.images + '**/sprites*',
		'!' + config.src.images + '**/sprites*/*',
		'!' + config.src.images + '**/icons*',
		'!' + config.src.images + '**/icons*/*',
	], [
		'copy-images',
	]);
	gulp.watch([
		config.basePath.src + '**/*',
		'!' + config.src.styles + '**/*',
		'!' + config.src.scripts + '**/*',
		'!' + config.src.images + '**/*',
		'!' + config.src.templates + '**/*',
	], [
		'copy-root',
	]);

	notifier.notify({
		'title': 'Start Project',
		'message': 'Gulp is watching files.',
		'sound': 'Hero',
	});
});
