const config = require('./helpers/getConfig.js');
const {src, dest} = require('gulp');

module.exports = function copyRoot() {
	return src([
		'**/*',
		'!css/**/*',
		'!js/**/*',
		'!img/**/*',
		'!tpl/**/*',
	], {
		cwd: config.basePath.src,
	})
		.pipe(dest(config.basePath.dest));
};
