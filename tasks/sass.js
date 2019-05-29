var config = require('./helpers/getConfig.js');
var isProduction = require('./helpers/isProduction.js');

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var sassVars = require('gulp-sass-vars');
var globImporter = require('node-sass-glob-importer');

gulp.task('sass', function() {
	const {breakpoints = {}, rules = {}, breakpointsVars = {}} = config.mediaQueries;

	var onError = function(error) {
		notify.onError({
			title: 'Sass error!',
			message: '<%= error.message %>',
			sound: 'Beep',
		})(error);

		return this.emit('end');
	};

	var settings = {
		includePaths: ['bower_components', 'node_modules'],
		outputStyle: isProduction() ? 'compressed' : 'expanded',
		precision: 5,
		importer: [
			globImporter(),
		],
	};

	var stream = gulp.src([
		'*.scss',
	], {
		cwd: config.src.styles,
	});

	return stream
		.pipe(plumber({
			errorHandler: onError,
		}))
		.pipe(isProduction()
			? gutil.noop()
			: sourcemaps.init(),
		)
		.pipe(sassVars({
			...breakpointsVars,
			...rules,
			breakpoints,
			breakpointsVars,
			paths: config.assets,
		}, { verbose: false }))
		.pipe(sass(settings))
		.pipe(postcss([
			autoprefixer(),
		]))
		.pipe(isProduction()
			? gutil.noop()
			: sourcemaps.write('./'),
		)
		.pipe(gulp.dest(config.dest.styles));
});
