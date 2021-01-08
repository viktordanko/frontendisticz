const { series, parallel } = require('gulp');

const clean = require('./tasks/clean');
const compress = require('./tasks/compress');
const imagemin = require('./tasks/imagemin');

const copyImages = require('./tasks/copyImages');
const copyJs = require('./tasks/copyJs');
const copyRoot = require('./tasks/copyRoot');

const iconSvg = require('./tasks/iconSvg');
const iconFont = require('./tasks/iconFont');

const processData = require('./tasks/processData');
const nunjucks = require('./tasks/nunjucks');
const sass = require('./tasks/sass');
const webpack = require('./tasks/webpack');

const validate = require('./tasks/validate');
const watch = require('./tasks/watch');

const build = function build(done) {
	return series(
		clean,
		parallel(
			iconSvg,
			iconFont,
			processData,
		),
		parallel(
			sass,
			webpack,
			nunjucks,
			copyImages,
			copyJs,
			copyRoot,
		),
	)(done);
};

const dev = function dev(done) {
	return series(
		build,
		watch,
	)(done);
};

const min = function min(done) {
	process.env.NODE_ENV = 'production';
	return series(
		build,
		imagemin,
	)(done);
};

const zip = function zip(done) {
	return series(
		min,
		compress,
	)(done);
};

const minwatch = function minwatch(done) {
	return series(
		min,
		watch,
	)(done);
};

module.exports = {
	clean,
	compress,
	copyImages,
	copyJs,
	copyRoot,
	iconSvg,
	iconFont,
	imagemin,
	processData,
	nunjucks,
	sass,
	validate,
	watch,
	webpack,

	default: dev,
	build,
	min,
	export: zip,
	minwatch,
};
