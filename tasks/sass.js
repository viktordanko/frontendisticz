var config = require('./helpers/getConfig.js');
var isProduction = require('./helpers/isProduction.js');

var {src, dest} = require('gulp');
var gulpSass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sassVars = require('gulp-sass-vars');
var globImporter = require('node-sass-glob-importer');

module.exports = function sass(done) {
	const {breakpoints = {}, rules = {}, breakpointsVars = {}} = config.mediaQueries;

	var onError = function(error) {
		notify.onError({
			title: 'Sass error!',
			message: '<%= error.message %>',
			sound: 'Beep',
		})(error);

		done();
	};

	var settings = {
		includePaths: ['bower_components', 'node_modules'],
		outputStyle: isProduction() ? 'compressed' : 'expanded',
		precision: 5,
		importer: [
			globImporter(),
		],
	};

	return src([
		'*.scss',
	], {
		cwd: config.src.styles,
		sourcemaps: !isProduction(),
	})
		.pipe(plumber({
			errorHandler: onError,
		}))
		.pipe(sassVars({
			...breakpointsVars,
			...rules,
			breakpoints,
			breakpointsVars,
			paths: config.assets,
		}, { verbose: false }))
		.pipe(gulpSass(settings))
		.pipe(postcss([
			autoprefixer(),
		]))
		.pipe(dest(config.dest.styles, {
			sourcemaps: './',
		}));
};
