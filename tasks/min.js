var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');


gulp.task('min', function(callback) {
	gutil.env.env = 'production';

	var sequence = runSequence([
		'build',
	], [
		'imagemin',
	],
		callback,
	);

	return sequence;
});
