var config = require('./helpers/getConfig.js');

var gulp = require('gulp');


gulp.task('copy-js', function() {
	var stream = gulp.src([
		'**/*.js',
	], {
		cwd: config.src.scripts + 'static/',
	});

	stream
		.pipe(gulp.dest(config.dest.scripts));

	return stream;
});
