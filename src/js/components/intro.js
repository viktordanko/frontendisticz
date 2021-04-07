export const init = () => {
	const animatedInro = document.querySelector('html.page-anim');
	if (!animatedInro) return;

	setTimeout(() => {
		document.querySelector('html.page-anim').classList.add('page-anim-start');
		setTimeout(() => {
			document.querySelector('html.page-anim').classList.remove('page-anim', 'page-anim-start');
		}, 2000);
	}, 750);
};
