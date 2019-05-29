var config = require('./helpers/getConfig.js');

var gulp = require('gulp');
var del = require('del');


gulp.task('clean', function(callback) {
	return del(config.basePath.dest, callback);
});
