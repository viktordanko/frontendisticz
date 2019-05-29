var config = require('./helpers/getConfig.js');
var pckg = require('../package.json');

var gulp = require('gulp');
var zip = require('gulp-zip');
var dateformat = require('dateformat');
var folder = pckg.name + '-' + dateformat(new Date(), 'yyyy-mm-dd-HH.MM');


gulp.task('compress', function() {
	var stream = gulp.src([
		'**/*',
	], {
		cwd: config.basePath.dest,
	});

	stream
		.pipe(zip(folder + '.zip'))
		.pipe(gulp.dest('_zip/'));

	return stream;
});
