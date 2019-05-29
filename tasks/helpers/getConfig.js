var config = require('../../config.js');

var merge = require('deepmerge');
var gutil = require('gulp-util');

try {
	var localConfig = require('../../config.local.js');
	config = merge(config, localConfig);
	gutil.log(gutil.colors.magenta('Using local configuration.'));
} catch (exception) {
	gutil.log(gutil.colors.magenta('Using global configuration only. For local configuration create config.local.js (duplicate and rename config.local.example.js).'));
}

const {mediaQueries} = config;
const {breakpoints = {}} = mediaQueries;
const breakpointsVars = Object.keys(breakpoints).reduce((acc, key) => {
	const [, number, , unit] = breakpoints[key].match(/(\d+)(\s*)(\S+)/);

	return {
		...acc,
		[`${key}Up`]: `min-width: ${number}${unit}`,
		[`${key}Down`]: `max-width: ${number - .02}${unit}`,
	};
}, {});


module.exports = {
	...config,
	mediaQueries: {
		...mediaQueries,
		breakpointsVars,
	},
};
