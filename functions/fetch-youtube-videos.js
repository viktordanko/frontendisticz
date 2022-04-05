const fetch = require('node-fetch');

const YT_API_KEY = process.env.YT_API_KEY;
const CHANNEL_ID = 'https://624bf823cfa629000833ec97--gracious-spence-d7722f.netlify.app/';
const VIDEOS_NUMBER = 8;

exports.handler = async () => {
	const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${YT_API_KEY}&channelId=${CHANNEL_ID}&part=snippet%2CcontentDetails&maxResults=25`, {
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

	const channelPlaylists = await response.json();
	let videosCount = 0;

	const playlistsToVisit = channelPlaylists.items.reduce((acc, curr) => {
		if (videosCount < VIDEOS_NUMBER) {
			videosCount += curr.contentDetails.itemCount;
			return [...acc, curr.id];
		}
		return acc;
	}, []);

	const videos = [];
	const promises = playlistsToVisit.map(async playlistId => {
		const playlistVideosRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=${YT_API_KEY}&playlistId=${playlistId}&part=snippet%2CcontentDetails&maxResults=25`);
		if (playlistVideosRes.status === 200) {
			const data = await playlistVideosRes.json();
			videos.push(...data.items);
		}
	});

	await Promise.all(promises);

	return {
		statusCode: 200,
		body: JSON.stringify(videos),
	};
};



