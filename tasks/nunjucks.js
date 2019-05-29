const config = require('./helpers/getConfig.js');

const {src, dest} = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cachebust = require('gulp-cache-bust');


module.exports = function nunjucks() {
	const onError = function(error) {
		notify.onError({
			title: 'Nunjucks error!',
			message: '<%= error.message %>',
			sound: 'Beep',
		})(error);

		return this.emit('end');
	};

	return src([
		'*.njk',
	], {
		cwd: config.src.templates,
	})
		.pipe(plumber({
			errorHandler: onError,
		}))
		.pipe(nunjucksRender({
			path: config.src.templates,
			data: config,
			envOptions: {
				trimBlocks: true,
				lstripBlocks: true,
			},
		}))
		.pipe(cachebust({
			type: 'timestamp',
		}))
		.pipe(dest(config.dest.templates));
};
