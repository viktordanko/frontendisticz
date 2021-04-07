export const init = () => {
	const { body } = document;
	const button = document.querySelector('[data-menu-btn]');
	const navigation = document.querySelector('nav');

	if (!button) return;

	button.addEventListener('click', () => {
		let isOpened = navigation.getAttribute('aria-expanded') === 'true';
		toggleMenu(!isOpened);
	});

	const toggleMenu = (isOpened) => {
		navigation.setAttribute('aria-expanded', isOpened);
		if (isOpened) {
			body.dataset.state = 'menu-opened';
		} else {
			body.dataset.state = '';
		}
	};
};
