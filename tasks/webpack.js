const config = require('./helpers/getConfig');
const {log} = require('./helpers/logger');
const isProduction = require('./helpers/isProduction');
const path = require('path');
const notify = require('gulp-notify');
const bundler = require('webpack');

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
			publicPath: config.assets.scripts,
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
		watch: !isProduction(),
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
			log('[webpack] ' + stats.toString(config.webpack.stats));
		}

		if (!isReady) {
			callback();
		}

		return isReady = true;
	});

	return bundle;
};
