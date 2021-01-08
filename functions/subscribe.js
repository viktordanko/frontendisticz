const fetch = require('node-fetch');

exports.handler = async (event) => {
	const formId = process.env.MK_API_KEY;
	const url = `https://api.mail-komplet.cz/api/${formId}/contacts`;
	const { email } = JSON.parse(event.body);


	try {
		await fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json;charset:utf-8',
				'X-Requested-With': 'XMLHttpRequest',
				'Authorization': `Basic ${process.env.MK_API_KEY}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				email,
				// dispatcherId: 1612, // TODO Find out real dispatcherId
			}),
		})
			.then((response) => response.text())
			.catch((error) => {
				throw new Error(error);
			});

		return {
			statusCode: 301,
			headers: {
				Location: '/newsletter-success/',
			},
			// body is unused in 3xx codes, but required in all function responses
			body: 'redirecting...',
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify(error.message),
		};
	}
};