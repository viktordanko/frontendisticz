const through2 = require('through2');
const cheerio = require('cheerio');

module.exports = () => {
	const time = new Date().getTime();

	return through2.obj(function exampleCacheBust(file, encoding, cb) {
		let data = file.contents.toString('utf-8');
		const $ = cheerio.load(data);
		const $elements = $('script[src], link[rel=stylesheet][href], link[rel=import][href], link[rel=preload][href][as="script"]');
		const protocolRegEx = /^(http(s)?)|\/\//;

		$elements
			.map((i, node) => {
				const name = node.name.toLowerCase();
				// eslint-disable-next-line no-nested-ternary
				const attrName = name === 'link' ? 'href' : name === 'script' ? 'src' : null;

				if (attrName == null) return null;
				const val = $(node).attr(attrName);
				if (protocolRegEx.test(val)) return null;
				return val;
			})
			.get()
			.filter((url, i, arr) => url != null && arr.indexOf(url) === i)
			.forEach((url) => {
				const originalAttrValueWithoutCacheBusting = url.split('?')[0];
				data = data.replace(new RegExp(url, 'g'), `${originalAttrValueWithoutCacheBusting}?t=${time}`);
			});
		// eslint-disable-next-line no-param-reassign
		file.contents = Buffer.from(data);
		this.push(file);
		cb();
	});
};
