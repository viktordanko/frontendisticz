var config = require('./helpers/getConfig.js');

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');


gulp.task('spritepacker', function() {
	var sprites = gulp.src([
		'*.png',
		'!_no-delete.png',
	], {
		cwd: config.src.images + 'bg/sprites/',
	});

	sprites = sprites.pipe(spritesmith({
		padding: 2,
		imgName: 'sprites.png',
		imgPath: 'sprites.png' + ('?v=' + (new Date().getTime())),
		cssName: 'sprites.scss',
		cssFormat: 'scss',
		algorithm: 'binary-tree',
		cssTemplate: config.src.styles + 'tpl/sprites.css.tpl',
	}));

	sprites.img.pipe(gulp.dest(config.dest.images + 'bg/'));
	sprites.css.pipe(gulp.dest(config.src.styles + 'core/generated/'));

	return sprites;
});
