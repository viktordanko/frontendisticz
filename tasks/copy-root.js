var config = require('./helpers/getConfig.js');

var gulp = require('gulp');


gulp.task('copy-root', function() {
	var stream = gulp.src([
		'**/*',
		'!css/**/*',
		'!js/**/*',
		'!img/**/*',
		'!tpl/**/*',
	], {
		cwd: config.basePath.src,
	});

	stream
		.pipe(gulp.dest(config.basePath.dest));

	return stream;
});
