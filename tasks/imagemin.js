var config = require('./helpers/getConfig.js');

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');


gulp.task('imagemin', function() {
	var stream = gulp.src([
		'**/*.{png,jpg,gif,svg}',
		'!bg/icons-svg.svg',
	], {
		cwd: config.dest.images,
	});

	stream
		.pipe(imagemin([
			imagemin.jpegtran({progressive: true }),
			imagemin.optipng(),
			imagemin.gifsicle(),
			imagemin.svgo(),
		]))
		.pipe(gulp.dest(config.dest.images));

	return stream;
});
