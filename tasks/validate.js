const config = require('./helpers/getConfig.js');
const {src} = require('gulp');
const w3cjs = require('gulp-w3cjs');
const through2 = require('through2');


module.exports = function validate() {
	return src([
		'*.html',
	], {
		cwd: config.dest.templates,
	})
		.pipe(w3cjs())
		.pipe(through2.obj(function(file, enc, callback) {
			callback(null, file);

			if (file.w3cjs.success) {
				return console.log('No errors found in', file.path);
			}
		}));
};
