export const init = () => {

	const btn = document.querySelector('.js-toggleMobileMenu');
	const header = document.querySelector('.header');
	const menuLinks = document.querySelectorAll('.m-main__link');

	const toggleMenu = (open) => {
		btn.setAttribute('aria-expanded', open);
		if (open) {
			header.classList.add('is-opened');
			document.addEventListener('click', handleClickOutside);
		} else  {
			header.classList.remove('is-opened');
			document.removeEventListener('click', handleClickOutside);
		}
	};

	btn.addEventListener('click', () => {
		let isOpen = btn.getAttribute('aria-expanded') === 'true';
		toggleMenu(!isOpen);
	});

	// Close the mobile menu when click on link anchor
	[...menuLinks].forEach(link => {
		link.addEventListener('click', function() {
			toggleMenu(false);
		});
	});

	// Close the mobile menu when click outside
	const handleClickOutside = () => {
		if (!event.target.closest('.m-main') && !event.target.closest('.js-toggleMobileMenu')) {
			toggleMenu(false);
		}
	};

};
