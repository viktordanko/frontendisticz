var config = require('./helpers/getConfig.js');

var gulp = require('gulp');
var w3cjs = require('gulp-w3cjs');
var through2 = require('through2');


gulp.task('validate', function() {
	var stream = gulp.src([
		'*.html',
	], {
		cwd: config.dest.templates,
	});

	stream
		.pipe(w3cjs())
		.pipe(through2.obj(function(file, enc, callback) {
			callback(null, file);

			if (file.w3cjs.success) {
				return console.log('No errors found in', file.path);
			}
		}));

	return stream;
});
