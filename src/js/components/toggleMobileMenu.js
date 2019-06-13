export const init = () => {

	const btn = document.querySelector('.js-toggleMobileMenu');
	const menu = document.querySelector('.m-main');
	const header = document.querySelector('.header');

	const toggleMenu = (open) => {
		btn.setAttribute('aria-expanded', open);
		if (open) {
			menu.classList.add('is-opened');
			header.classList.add('is-opened');
			document.addEventListener('click', handleClickOutside);
		} else  {
			menu.classList.remove('is-opened');
			header.classList.remove('is-opened');
			document.removeEventListener('click', handleClickOutside);
		}
	};

	btn.addEventListener('click', () => {
		let isOpen = btn.getAttribute('aria-expanded') === 'true';
		toggleMenu(!isOpen);
	});

	// Close the mobile menu when click outside
	const handleClickOutside = () => {
		if (!event.target.closest('.m-main') && !event.target.closest('.js-toggleMobileMenu')) {
			toggleMenu(false);
		}
	};

};
