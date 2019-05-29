var gulp = require('gulp');
var runSequence = require('run-sequence');


gulp.task('build', ['clean'], function(callback) {
	var sequence = runSequence(
		[
			'spritepacker',
			'spritepacker-retina',
			'iconfont',
			'icon-svg',
		],
		[
			'sass',
			'nunjucks',
			'webpack',
			'copy-js',
			'copy-root',
			'copy-images',
		],
		callback,
	);

	return sequence;
});
