const config = require('./helpers/getConfig.js');
const isProduction = require('./helpers/isProduction.js');
const path = require('path');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const bundler = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isMinwatch = function() {
	return gutil.env._[0] === 'minwatch';
};


module.exports = function webpack(callback) {
	const {rules = {}, breakpointsVars = {}} = config.mediaQueries;

	var isReady = false;
	var settings = {
		mode: 'development',
		resolve: {
			extensions: ['.js', '.json', '.jsx'],
			modules: [
				path.join(__dirname, '../node_modules'),
				path.join(__dirname, '../bower_components'),
			],
		},
		entry: {
			app: './' + config.src.scripts + 'app',
		},
		output: {
			path: path.join(__dirname, '../' + config.dest.scripts),
			filename: '[name].js',
			publicPath: '../js/',
			chunkFilename: '[name].chunk.js',
		},
		module: {
			rules: [
				{
					test: /\.js(x)?$/,
					exclude: /node_modules|bower_components/,
					use: 'babel-loader',
				},
			],
		},
		plugins: [
			new bundler.DefinePlugin({
				'PROJECT_CONFIG': JSON.stringify({
					breakpointsVars,
					rules,
				}),
			}),
		],
		profile: true,
		watch: !isProduction() || isMinwatch(),
		watchOptions: {
			ignored: /node_modules|bower_components/,
		},
		devtool: isProduction() ? false : 'source-map',
		externals: {
			'jquery': 'jQuery',
		},
	};

	if (isProduction()) {
		settings.mode = 'production';
		settings.plugins.push(new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					// hoist_vars: true,
					// hoist_funs: true,
					toplevel: true,
					drop_console: true,
					passes: 3,
				},
			},
		}));
	}

	var onError = notify.onError(function(error) {
		return {
			title: 'JS error!',
			message: error,
			sound: 'Beep',
		};
	});

	var bundle = bundler(settings, function(error, stats) {
		var jsonStats = stats.toJson();
		var errors = jsonStats.errors;
		var warnings = jsonStats.warnings;

		if (error) {
			onError(error);
		} else if (errors.length > 0) {
			onError(errors.toString());
		} else if (warnings.length > 0) {
			onError(warnings.toString());
		} else {
			gutil.log('[webpack]', stats.toString(config.webpack.stats));
		}

		if (!isReady) {
			callback();
		}

		return isReady = true;
	});

	return bundle;
};
