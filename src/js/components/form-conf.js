export const init = () => {
	const form = document.querySelector('[data-handle-conf-submit]');
	const submitBtn = document.querySelector('[data-submit-button]');

	if (!form) return;

	const handleSubmit = (event) => {
		event.preventDefault();

		submitBtn.classList.add('is-loading');

		const data = new FormData(event.target);

		fetch('/.netlify/functions/subscribe-from-conf', {
			method: 'POST',
			body: JSON.stringify({
				email: data.get('email'),
			}),
		}).then((res) => {
			if (res.status === 200) {
				submitBtn.classList.remove('is-loading');
				setTimeout(() => {
					event.target.classList.add('is-sent');
					event.target.reset();
				}, 100);
			}
		});
	};

	form.addEventListener('submit', handleSubmit);
};
