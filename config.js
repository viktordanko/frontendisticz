var basePath = {
	src: 'src/',
	dest: 'web/',
	assets: '/',
};

var src = {
	fonts: basePath.src + 'fonts/',
	icons: basePath.src + 'img/bg/icons/',
	iconsSVG: basePath.src + 'img/bg/icons-svg/',
	images: basePath.src + 'img/',
	scripts: basePath.src + 'js/',
	styles: basePath.src + 'css/',
	templates: basePath.src + 'tpl/',
	ajaxTpl: basePath.src + 'tpl/ajax/',
	components: basePath.src + 'tpl/components/',
	layout: basePath.src + 'tpl/layout/',
};

var dest = {
	fonts: basePath.dest + 'fonts/',
	images: basePath.dest + 'img/',
	scripts: basePath.dest + 'js/',
	styles: basePath.dest + 'css/',
	templates: basePath.dest + '',
};

var assets = {
	fonts: basePath.assets + 'fonts/',
	images: basePath.assets + 'img/',
	scripts: basePath.assets + 'js/',
	files: basePath.assets + 'files/',
	styles: basePath.assets + 'css/',
};

var twigNamespaces = {
	components: src.components,
	layout: src.layout,
	images: src.images,
	templates: src.templates,
};

var webpack = {
	stats: {
		colors: true,
		hash: false,
		timings: true,
		assets: true,
		chunks: false,
		chunkModules: false,
		modules: false,
		children: true,
		version: false,
	},
};

var browserSync = {
	open: false,
	notify: false,
	reloadThrottle: 1000,
	watch: true,
	server: {
		baseDir: basePath.dest,
	},
};

module.exports = {
	basePath,
	src,
	dest,
	assets,
	twigNamespaces,
	webpack,
	browserSync,
	mediaQueries: {
		'breakpoints': {
			'sm': '480px',
			'md': '750px',
			'lg': '1000px',
			'xl': '1200px',
		},
		'rules': {
			'webkit': '(-webkit-min-device-pixel-ratio: 0)',
			'retina': '(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/1), (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)',
		},
	},
};
