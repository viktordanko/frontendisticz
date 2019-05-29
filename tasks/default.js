var gulp = require('gulp');
var runSequence = require('run-sequence');


gulp.task('default', function(callback) {
	var sequence = runSequence([
		'build',
	], [
		'watch',
	],
		callback,
	);

	return sequence;
});
