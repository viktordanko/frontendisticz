const config = require('./helpers/getConfig.js');
const {src, dest} = require('gulp');
const gulpImagemin = require('gulp-imagemin');


module.exports = function imagemin() {

	return src([
		'**/*.{png,jpg,gif,svg}',
		'!bg/icons-svg.svg',
	], {
		cwd: config.dest.images,
	})
		.pipe(gulpImagemin([
			imagemin.jpegtran({progressive: true }),
			imagemin.optipng(),
			imagemin.gifsicle(),
			imagemin.svgo(),
		]))
		.pipe(dest(config.dest.images));
};
