const gulp = require('gulp');
const browserSync = require('browser-sync');

const isProduction = require('./helpers/isProduction');
const config = require('./helpers/getConfig.js');

const sass = require('./sass');
const twig = require('./twig');
const twig2 = require('./twig2');
const sprite = require('./sprite');
const spriteRetina = require('./spriteRetina');
const iconFont = require('./iconFont');
const iconSvg = require('./iconSvg');
const copyJs = require('./copyJs');
const webpack = require('./webpack');
const copyImages = require('./copyImages');
const copyRoot = require('./copyRoot');
const buildCMS = require('./buildCMS');

const { series, watch: watchGulp } = gulp;

module.exports = function watch(done) {
	return series(
		function syncing(syncDone) {
			browserSync(config.browserSync);
			syncDone();
		},
		function watching() {
			watchGulp(['.forestry/front_matter/templates/*.yml', 'data/**/*'], series(buildCMS, twig));
			watchGulp(`${config.src.styles}**/*.scss`, sass);
			watchGulp(`${config.src.templates}**/*.twig`, twig);
			watchGulp(`${config.src.templates}**/*.twig`, twig2);
			watchGulp(`${config.src.images}bg/sprites/*.png`, sprite);
			watchGulp(`${config.src.images}bg/sprites-retina/*.png`, spriteRetina);
			watchGulp(`${config.src.icons}*.svg`, iconFont);
			watchGulp(`${config.src.iconsSVG}*.svg`, iconSvg);
			watchGulp(`${config.src.scripts}static/*.js`, copyJs);
			if (isProduction()) {
				watchGulp([`${config.src.scripts}**/*`, `!${config.src.scripts}static/*.js`], webpack);
			}

			watchGulp(
				[
					`${config.src.images}**/*`,
					`!${config.src.images}**/sprites*`,
					`!${config.src.images}**/sprites*/*`,
					`!${config.src.images}**/icons*`,
					`!${config.src.images}**/icons*/*`,
				],
				copyImages,
			);
			watchGulp(
				[
					`${config.basePath.src}**/*`,
					`!${config.src.styles}**/*`,
					`!${config.src.scripts}**/*`,
					`!${config.src.images}**/*`,
					`!${config.src.templates}**/*`,
				],
				copyRoot,
			);
		},
	)(done);
};
