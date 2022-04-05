import { injectInnerText } from '../utils';

export const init = () => {
	const form = document.querySelector('[data-handle-submit]');
	const emailInput = document.querySelector('#email');
	const submitBtn = document.querySelector('[data-submit-button]');

	if (!form) return;

	emailInput.addEventListener('focus', () => injectInnerText('#error-message', ''));

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (submitBtn) {
			submitBtn.classList.add('is-loading');
		}

		const data = new FormData(event.target);

		const response = await fetch('/api/subscribe', {
			method: 'POST',
			body: JSON.stringify({
				email: data.get('email'),
			}),
		});

		if (response.status === 200 && response.redirected === true) {
			return window.location.href = response.url;
		}

		if (submitBtn) {
			submitBtn.classList.remove('is-loading');
		}

		const errorMessage ='Něco se pokazilo. Zkuste to později znovu.';
		injectInnerText('#error-message', errorMessage);
	};

	form.addEventListener('submit', handleSubmit);
};

