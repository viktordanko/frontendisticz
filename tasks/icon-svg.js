var config = require('./helpers/getConfig.js');
var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var through2 = require('through2');

var consolidate = require('consolidate');
var gutil = require('gulp-util');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var rename = require('gulp-rename');
var fileExists = require('file-exists');


gulp.task('icon-svg', (callback) => {
	const stream = gulp.src([
		'*.svg',
		'!_no-delete.svg',
	], {
		cwd: config.src.iconsSVG,
	});

	fs.readdir(config.src.iconsSVG, (error, files) => {
		if (files.length <= 1) {
			clearInterval(interval);
			callback();
		}
	});

	stream
		.pipe(rename({
			prefix: 'icon-',
		}))
		.pipe(svgmin((file) => {
			const prefix = path.basename(file.relative, path.extname(file.relative));

			return {
				plugins: [{
					cleanupIDs: {
						prefix: `${prefix}-`,
						minify: true,
					},
				}],
			};
		}))
		.pipe(svgstore())
		.pipe(cheerio(($) => {
			$('svg > symbol').map(function() {
				const $this = $(this);
				const viewbox = $this.attr('viewbox');

				if (viewbox) {
					$this.attr('viewBox', viewbox);
					$this.removeAttr('viewbox');
				}
			});
		}))
		.pipe(gulp.dest(`${config.dest.images}bg/`))
		.pipe(through2.obj(function(file, encoding, callback) {
			const _this = this;
			const $ = file.cheerio;

			const data = $('svg > symbol').map(function() {
				const $this = $(this);
				const name = $this.attr('id').slice(5);
				const viewBox = $this.attr('viewBox').split(' ');

				return {
					name,
					width: viewBox[2],
					height: viewBox[3],
				};
			}).get();

			consolidate.lodash(`${config.src.styles}tpl/icons-svg.css.tpl`, {
				glyphs: data,
			}, (err, html) => {
				const newFile = new gutil.File({
					path: 'icons-svg.scss',
					contents: new Buffer(html),
				});

				_this.push(newFile);
				callback();
			});
		}))
		.pipe(gulp.dest(`${config.src.styles}core/generated/`));

	const interval = setInterval(function () {
		if (fileExists.sync(`${config.src.styles}core/generated/icons-svg.scss`)) {
			clearInterval(interval);
			callback();
		}
	}, 10);
});
