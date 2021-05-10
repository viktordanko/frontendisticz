module.exports = (api) => {
	api.cache(true);

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					modules: false,
				},
			],
			['@babel/preset-typescript'],
		],
		plugins: [
			[
				'@babel/plugin-transform-runtime',
				{
					corejs: false,
					helpers: true,
					regenerator: true,
				},
			],
			'@babel/plugin-proposal-object-rest-spread',
			'@babel/plugin-syntax-dynamic-import',
			'@babel/plugin-proposal-optional-chaining',
			'@babel/plugin-transform-flow-strip-types',
			'@babel/plugin-proposal-nullish-coalescing-operator',
			'@babel/plugin-proposal-class-properties',
		],
	};
};
