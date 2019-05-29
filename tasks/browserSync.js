var config = require('./helpers/getConfig.js');

var gulp = require('gulp');
var browserSync = require('browser-sync');


gulp.task('browserSync', function() {
	return browserSync(config.browserSync);
});
