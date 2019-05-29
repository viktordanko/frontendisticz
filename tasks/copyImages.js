const config = require('./helpers/getConfig.js');
const {src, dest} = require('gulp');

module.exports = function copyImages() {
	return src([
		'**/*.{png,jpg,gif,svg,ico}',
		'!**/sprites*',
		'!**/sprites*/*',
		'!**/icons*',
		'!**/icons*/*',
	], {
		cwd: config.src.images,
	})
		.pipe(dest(config.dest.images));
};
