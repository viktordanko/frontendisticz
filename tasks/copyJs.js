const config = require('./helpers/getConfig.js');
const {src, dest} = require('gulp');

module.exports = function copyJs() {
	return src([
		'**/*.js',
	], {
		cwd: config.src.scripts + 'static/',
	})
		.pipe(dest(config.dest.scripts));
};
