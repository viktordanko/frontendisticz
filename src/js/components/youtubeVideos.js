//@ts-check
import {createVideoWatchLink, extractVideoThumbnailSrc, sortVideosByDate} from '../utils.js';
const VIDEOS_NUMBER = 8;



export const init = async () => {
	const el = document.querySelector('[data-ytVideos]');

	if (!el) return;

	try {
		const res = await fetch('/api/fetch-youtube-videos');
		if (res.status !== 200) {
			return;
		}

		const channelPlaylists = await res.json();
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
			const playlistVideosRes = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyD5dzE3b-xu_jIX_ILhMNPs9wKWPlKy44Q&playlistId=${playlistId}&part=snippet%2CcontentDetails&maxResults=25`);
			if (playlistVideosRes.status === 200) {
				const data = await playlistVideosRes.json();
				videos.push(...data.items);
			}
		});

		await Promise.all(promises);

		const videosToShow = sortVideosByDate(videos).slice(0, 8);

		videosToShow.map((video, index) => {
			document.getElementById(`videoImage${index}`).src = extractVideoThumbnailSrc(video);
			document.getElementById(`videoLink${index}`).href = createVideoWatchLink(video);
		});

	} catch (error) {
		return;
	}
};


