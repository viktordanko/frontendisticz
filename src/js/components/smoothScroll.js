export const init = () => {

	document.querySelectorAll('.js-smooth-scroll').forEach(link =>  {
		link.addEventListener('click', function(event) {
			event.preventDefault();

			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth',
			});
		});
	});

};