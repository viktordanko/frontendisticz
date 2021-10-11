const { TwingEnvironment, TwingLoaderFilesystem, TwingFilter } = require('twing');

const config = require('./getConfig');
const forestryStaticData = require('./forestryData.js');
const marked = require('marked');

let filterUrl = new TwingFilter('url', function (val, lang) {
	if (forestryStaticData == null) return '';
	if (typeof val !== 'string') return '';
	const data = forestryStaticData.get();
	const routes = data[lang].routes;
	if (routes == null || routes[val] == null) return '';

	return routes[val];
});

let filterData = new TwingFilter('data', function (val, lang) {
	if (forestryStaticData == null) return '';
	if (typeof val !== 'string') return '';
	const data = forestryStaticData.get();
	const pages = data[lang].pages;
	if (pages == null || pages[val] == null) return '';

	return pages[val];
});

let filterMarkdown = new TwingFilter('markdown', function (val, block = false) {
	if (typeof val !== 'string' || !val) return '';
	if (block === true) {
		return marked(val);
	}
	return marked.parseInline(val);
});

const loader = new TwingLoaderFilesystem('./');
Object.keys(config.twigNamespaces).forEach(function addNamespaces(namespace) {
	loader.addPath(config.twigNamespaces[namespace], namespace);
});

const env = new TwingEnvironment(loader, { autoescape: 'html' });
env.addFilter(filterUrl);
env.addFilter(filterData);
env.addFilter(filterMarkdown);

module.exports = env;
