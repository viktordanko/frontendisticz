const fetch = require('node-fetch');

exports.handler = async () => {
	const response = await fetch('https://api.meetup.com/frontendisti/events', {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	});

	if (!response.ok) {
		return {
			statusCode: response.status,
			body: JSON.stringify([]),
		};
	}

	const data = await response.json();

	return {
		statusCode: 200,
		body: JSON.stringify(data),
	};
};
