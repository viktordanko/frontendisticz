const config = require('./helpers/getConfig.js');

const {src, dest} = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cheerio = require('cheerio');
const through2 = require('through2');
const merge = require('deepmerge');

const fs = require('fs');
const dateFilter = require('nunjucks-date-filter');
const rename = require('gulp-rename');

var manageEnvironment = (environment) => {
	environment.addFilter('date', dateFilter);
};


module.exports = function nunjucks(done) {
	const onError = function(error) {
		notify.onError({
			title: 'Nunjucks error!',
			message: '<%= error.message %>',
			sound: 'Beep',
		})(error);

		done();
	};

	const time = new Date().getTime();

	const customdata = {
		meetups: JSON.parse(fs.readFileSync("./src/content/meetups.json"))
	}

	return src([
		'*.njk',
		'archiv/*.njk',
	], {
		cwd: config.src.templates,
	})
		.pipe(plumber({
			errorHandler: onError,
		}))
		.pipe(nunjucksRender({
			path: config.src.templates,
			data: merge(config, customdata),
			manageEnv: manageEnvironment,
			envOptions: {
				trimBlocks: true,
				lstripBlocks: true,
			},
		}))
		// cache bust
		.pipe(through2.obj(function(file, encoding, cb) {
			let data = file.contents.toString('utf-8');
			const $ = cheerio.load(data);
			const $elements = $('script[src], link[rel=stylesheet][href], link[rel=import][href], link[rel=preload][href]');
			const protocolRegEx = /^(http(s)?)|\/\//;

			$elements
				.map((i, node) => {
					const name = node.name.toLowerCase();
					const attrName = name === 'link'
						? 'href'
						: name === 'script'
							? 'src'
							: null;

					if (attrName == null) return null;
					const val = $(node).attr(attrName);
					if (protocolRegEx.test(val)) return null;
					return val;
				})
				.get()
				.filter((url, i, arr) => url != null && arr.indexOf(url) === i)
				.forEach((url) => {
					var originalAttrValueWithoutCacheBusting = url.split('?')[0];
					data = data.replace(new RegExp(url, 'g'), originalAttrValueWithoutCacheBusting + '?t=' + time);
				});

			file.contents = Buffer.from(data);
			this.push(file);
			cb();
		}))
		.pipe(rename(function (path) {
			if (path.basename != 'index') {
				path.dirname = path.basename;
				path.basename = 'index';
			}
		}))
		.pipe(dest(config.dest.templates));
};
