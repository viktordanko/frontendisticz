export const init = () => {
	const form = document.querySelector('[data-handle-submit]');
	const submitBtn = document.querySelector('[data-submit-button]');

	if (!form) return;

	const handleSubmit = (event) => {
		event.preventDefault();

		if (submitBtn) {
			submitBtn.classList.add('is-loading');
		}

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

