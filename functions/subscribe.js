const fetch = require('node-fetch');

exports.handler = async (event) => {
	const url = 'https://frontendisti.ecomailapp.cz/public/subscribe/13/fd74319c464c247b7c0305bfc329d4f0';
	const { email } = JSON.parse(event.body);

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json;charset:utf-8',
				'X-Requested-With': 'XMLHttpRequest',
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				email,
			}),
		}).then(rawRes => rawRes.json());

		if (!response.success && response.message !== 'Tento email je již registrován') {
			return {
				statusCode: 500,
				body: 'Something went wrong',
			};
		}

		return {
			statusCode: 301,
			headers: {
				Location: '/newsletter-potvrzeni/',
			},
			body: 'redirecting...',
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify(error.message),
		};
	}
};
