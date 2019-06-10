export const init = () => {

	const btn = document.querySelector('.js-toggleMobileMenu');
	const menu = document.querySelector('.m-main');
	const header = document.querySelector('.header');

	btn.addEventListener('click', function() {
		menu.classList.toggle('is-opened');
		btn.classList.toggle('is-opened');
		header.classList.toggle('is-opened');
	});

	document.addEventListener('click', event => {
		if (!event.target.closest('.m-main') && !event.target.closest('.js-toggleMobileMenu')) {
			menu.classList.remove('is-opened');
			btn.classList.remove('is-opened');
			header.classList.remove('is-opened');
		}
	});
};
