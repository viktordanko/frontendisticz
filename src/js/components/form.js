export const init = () => {
	const form = document.querySelector('[data-handle-submit]');

	if (!form) return;

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = new FormData(event.target);

		fetch('/.netlify/functions/subscribe', {
			method: 'POST',
			body: JSON.stringify({
				email: data.get('email'),
			}),
		}).then((response) => {
			if (response.status === 200 && response.redirected === true) {
				window.location.href = response.url;
			}
		});
	};

	form.addEventListener('submit', handleSubmit);
};

