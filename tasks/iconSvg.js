const config = require('./helpers/getConfig.js');
const {src, dest} = require('gulp');
const path = require('path');
const fs = require('fs');
const through2 = require('through2');

const consolidate = require('consolidate');
const gutil = require('gulp-util');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const rename = require('gulp-rename');
const fileExists = require('file-exists');

module.exports = function iconSvg(callback) {
	const stream = src([
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
		.pipe(dest(`${config.dest.images}bg/`))
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
		.pipe(dest(`${config.src.styles}core/generated/`));

	const interval = setInterval(function () {
		if (fileExists.sync(`${config.src.styles}core/generated/icons-svg.scss`)) {
			clearInterval(interval);
			callback();
		}
	}, 10);
};
