const fetch = require('node-fetch');

exports.handler = async () => {
	const response = await fetch('https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyD5dzE3b-xu_jIX_ILhMNPs9wKWPlKy44Q&channelId=UCxs7KDC0LFOezVujLG_leRw&part=snippet%2CcontentDetails&maxResults=25', {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
	});

	if (!response.ok) {
		return {
			statusCode: response.status,
		};
	}

	const data = await response.json();

	return {
		statusCode: 200,
		body: JSON.stringify(data),
	};
};
