const path = require('path');
const through2 = require('through2');

module.exports = function (env, data = {}) {
	return through2.obj(function cloneWithData(file, encoding, callback) {
		let template;

		if (file.isNull()) {
			callback(null, file);

			return;
		} else {
			template = path.relative(process.cwd(), file.path);
		}

		try {
			let binary = env.render(template, Object.assign({}, data, file.data));
			file.contents = Buffer.from(binary);

			callback(null, file);
		} catch (err) {
			callback(err, file);
		}
	});
};
