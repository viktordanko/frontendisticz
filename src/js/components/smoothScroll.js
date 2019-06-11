export const init = () => {

	const header = document.querySelector('.header');
	const menu = document.querySelector('.m-main');
	const btn = document.querySelector('.js-toggleMobileMenu');

	document.querySelectorAll('.js-smooth-scroll').forEach(link =>  {
		link.addEventListener('click', function(event) {
			event.preventDefault();

			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth',
			});

			header.classList.remove('is-opened');
			menu.classList.remove('is-opened');
			btn.classList.remove('is-opened');

		});
	});

};