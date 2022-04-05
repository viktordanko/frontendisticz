const ONE_DAY = 3.6e6 * 24;
const FIVE_DAYS = ONE_DAY * 5;

const isUpcoming = (timestamp) => {
	const now = Date.now();
	return timestamp > now;
};

export const isLessThanFiveDaysOld = (timestamp) => {
	const now = Date.now();
	return !isUpcoming(timestamp) && now - timestamp <= FIVE_DAYS;
};


export const isTooOld = (timestamp) => {
	return !isUpcoming(timestamp) && !isLessThanFiveDaysOld(timestamp);
};

const removeClass = (className, selector) =>
	document.querySelector(selector).classList.remove(className);

export const removeSkeleton = (selector) => removeClass('inline-skeleton', selector);

export const injectInnerText = (selector, content) =>
	(document.querySelector(selector).innerText = content);

export const showElement = (selector) => {
	removeClass('u-hide', selector);
};

export const extractVideoThumbnailSrc = (video) => {
	return video.snippet.thumbnails.medium.url;
};

const extractDate = video => new Date(video.snippet.publishedAt).getTime();

export const sortVideosByDate = videos => {
	return [...videos.sort((a, b) => extractDate(b) - extractDate(a))];
};

export const createVideoWatchLink = (video) => {
	const videoId = video.contentDetails.videoId;
	return `https://www.youtube.com/watch?v=${videoId}`;
};
