import FontFaceObserver from 'fontfaceobserver';


export const init = () => {
	if (window.name.indexOf('fontsLoaded=true') > -1) {
		return;
	}

	const fontRegular = new FontFaceObserver('Open Sans', {
		weight: 'normal',
		style: 'normal',
	});

	const onLoaded = () => {
		document.documentElement.className += ' fonts-loaded';
		window.name += 'fontsLoaded=true';
	};

	const onFail = () => {
		document.documentElement.className += ' fonts-failed';
	};

	return Promise.all([
		fontRegular.load(),
	])
		.then(onLoaded)
		.catch(onFail);
};
