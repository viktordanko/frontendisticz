//@ts-check
import {createVideoWatchLink, extractVideoThumbnailSrc, sortVideosByDate} from '../utils.js';

export const init = async () => {
	const el = document.querySelector('[data-ytVideos]');

	if (!el) return;

	try {
		const res = await fetch('/api/fetch-youtube-videos');
		if (res.status !== 200) {
			return;
		}

		const videos = await res.json();
		const videosToShow = sortVideosByDate(videos).slice(0, 8);

		videosToShow.map((video, index) => {
			document.getElementById(`videoImage${index}`).src = extractVideoThumbnailSrc(video);
			document.getElementById(`videoLink${index}`).href = createVideoWatchLink(video);
		});

	} catch (error) {
		return;
	}
};


