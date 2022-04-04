import {injectInnerText, isLessThanFiveDaysOld, isTooOld, removeSkeleton, showElement} from "../utils.js"

const elementsToReveal = [
	"[data-meetup-name]",
	"[data-meetup-label]",
	"[data-meetup-date]",
];

export const init = async () => {
	const el = document.querySelector('[data-meetup]');

	if (!el) return;

	try {
		const res = await fetch(
			"/api/fetch-events"
			// 'http://localhost:8888/.netlify/functions/fetch-events',
		);

		const eventData = await res.json();
            console.log("🚀 ~ file: meetup.js ~ line 15 ~ init ~ eventData", eventData)
		const [latestEvent] = eventData;

		if (res.status !== 200 || !latestEvent || isTooOld(latestEvent?.time)) {
			// TODO: HANDLE THIS CASE
			return;
		}

		const { name, time, local_date, local_time: meetupTime, link: meetupLink } = latestEvent;
		const isNewEnough = isLessThanFiveDaysOld(time);
		const rightAdjective = isNewEnough ? 'Poslední' : 'Nejbližší';
		const meetupDate = new Date(local_date)
			.toLocaleDateString("cs-CZ", {})
			.replace(/\//g, ".");

		elementsToReveal.forEach(tag => removeSkeleton(tag));
		showElement("[data-meetup-button]");

		injectInnerText("[data-meetup-name]", name);
		injectInnerText("[data-meetup-label]", `${rightAdjective} meetup`);
		injectInnerText("[data-meetup-date]", `${meetupDate} – ${meetupTime}`);
		document.querySelector('[data-meetup-link]').href = meetupLink;

	} catch (error) {
		console.error(error);
		elementsToReveal.forEach((tag) => removeSkeleton(tag));
		injectInnerText("[data-meetup-name]", "Nepodařilo se načíst data");

	}
};


