export const init = () => {
	const { body } = document;
	const button = document.querySelector('[data-menu-btn]');
	const navigation = document.querySelector('nav');
	const menu = document.querySelector('.menu');

	if (!button) return;

	button.addEventListener('click', () => {
		let isOpened = navigation.getAttribute('aria-expanded') === 'true';
		toggleMenu(!isOpened);
	});

	const toggleMenu = (isOpened) => {
		navigation.setAttribute('aria-expanded', isOpened);
		if (isOpened) {
			body.dataset.state = 'menu-opened';
			menu.addEventListener('click', (event) => {
				if (event.target.className !== 'm-main__link') return;
				body.removeAttribute('data-state');
				navigation.removeAttribute('aria-expanded');
			});
		} else {
			body.dataset.state = '';
		}
	};
};
