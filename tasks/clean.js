const config = require('./helpers/getConfig.js');
const del = require('del');


module.exports = function clean() {
	return del(config.basePath.dest);
};
