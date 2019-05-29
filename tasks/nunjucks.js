var config = require('./helpers/getConfig.js');

var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var cachebust = require('gulp-cache-bust');


gulp.task('nunjucks', function() {
	var onError = function(error) {
		notify.onError({
			title: 'Nunjucks error!',
			message: '<%= error.message %>',
			sound: 'Beep',
		})(error);

		return this.emit('end');
	};

	var stream = gulp.src([
		'*.njk',
	], {
		cwd: config.src.templates,
	});

	stream
		.pipe(plumber({
			errorHandler: onError,
		}))
		.pipe(nunjucksRender({
			path: config.src.templates,
			data: config,
			envOptions: {
				trimBlocks: true,
				lstripBlocks: true,
			},
		}))
		.pipe(cachebust({
			type: 'timestamp',
		}))
		.pipe(gulp.dest(config.dest.templates));

	return stream;
});
