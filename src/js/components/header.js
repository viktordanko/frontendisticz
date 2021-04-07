export const init = () => {
	const menu = document.querySelector('.menu');
	const hidden = 'is-hidden';
	const offsetTop = 50;
	let lastScroll = 0;

	window.addEventListener('scroll', () => {
		const currentScroll = window.pageYOffset;

		if (currentScroll > lastScroll) {
			// Hide
			if (currentScroll > offsetTop) {
				menu.dataset.state = hidden;
			}
		} else if (currentScroll < lastScroll) {
			// Show
			menu.removeAttribute('data-state');
		}
		lastScroll = currentScroll;

		return;
	});
};