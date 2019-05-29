var config = require('./helpers/getConfig.js');

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');


gulp.task('iconfont', function(callback) {
	var stream = gulp.src([
		'*.svg',
		'!_no-delete.svg',
	], {
		cwd: config.src.icons,
	});

	var isEmpty = true;

	stream
		.pipe(iconfont({
			fontName: 'icons',
			formats: ['ttf', 'eot', 'woff'],
		}))
		.on('glyphs', function(glyphs, options) {
			isEmpty = false;

			gulp.src(config.src.styles + 'tpl/icons.css.tpl')
				.pipe(consolidate('lodash', {
					glyphs: glyphs.map(function(glyph) {
						return {
							name: glyph.name,
							code: glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase(),
						};
					}),
					fontName: options.fontName,
					fontPath: config.assets.fonts,
					className: 'icon',
				}))
				.pipe(rename('icons.scss'))
				.pipe(gulp.dest(config.src.styles + 'core/generated/'))
				.on('end', callback);
		})
		.on('end', function() {
			if (isEmpty) {
				callback();
			}
		})
		.pipe(gulp.dest(config.dest.fonts));
});
