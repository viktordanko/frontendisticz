var config = require('./helpers/getConfig.js');

var gulp = require('gulp');


gulp.task('copy-images', function() {
	var stream = gulp.src([
		'**/*.{png,jpg,gif,svg,ico}',
		'!**/sprites*',
		'!**/sprites*/*',
		'!**/icons*',
		'!**/icons*/*',
	], {
		cwd: config.src.images,
	});

	stream
		.pipe(gulp.dest(config.dest.images));

	return stream;
});
