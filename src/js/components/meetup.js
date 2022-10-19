import { injectInnerText, isLessThanFiveDaysOld, isTooOld, removeSkeleton, showElement, removeClass } from "../utils.js";

const elementsToReveal = [
	'[data-meetup-name]',
	'[data-meetup-label]',
	'[data-meetup-date]',
];

export const init = async () => {
	const element = document.querySelector('[data-meetup]');

	if (!element) return;

	try {
		const res = await fetch('/api/fetch-events');
		const eventData = await res.json();
		const [latestEvent, ...rest] = eventData;

		if (res.status !== 200 || !latestEvent || isTooOld(latestEvent?.time)) {
			return showFallbackMessage();
		}

		const eventOnSameDay = rest.find(ev => ev.local_date === latestEvent.local_date);
		const { name, time, local_date, local_time: meetupTime, link: meetupLink } = latestEvent;
		const isNewEnough = isLessThanFiveDaysOld(time);
		const rightAdjective = isNewEnough ? 'Poslední' : 'Nejbližší';
		const meetupDate = new Date(local_date)
			.toLocaleDateString('cs-CZ', {})
			.replace(/\//g, '.');

		elementsToReveal.forEach(tag => removeSkeleton(tag));
		showElement('[data-meetup-button]');
		injectInnerText('[data-meetup-label]', `${rightAdjective} meetup`);
		injectInnerText('[data-meetup-name]', name);
		injectInnerText('[data-meetup-date]', `${meetupDate} – ${meetupTime}`);
		document.querySelector('[data-meetup-link]').href = meetupLink;

		if (eventOnSameDay) {
			removeClass('u-hide', '[data-second-meetup]');
			const { name: secondMeetingName, local_time: secondMeetupTime, link: secondMeetupLink } = eventOnSameDay;
			showElement('[data-second-meetup-button]');
			injectInnerText('[data-second-meetup-name]', secondMeetingName);
			injectInnerText('[data-second-meetup-date]', `${meetupDate} – ${secondMeetupTime}`);
			document.querySelector('[data-second-meetup-link]').href = secondMeetupLink;
		} else {
			switchToOneRowGrid();
		}
	} catch (error) {
		switchToOneRowGrid();
		return showFallbackMessage();

	}
};


const showFallbackMessage = () => {
	elementsToReveal.forEach(tag => removeSkeleton(tag));
	injectInnerText('[data-meetup-label]', 'Podívejte se na naše akce!');
	showElement('[data-meetup-button]');
	document.querySelector('[data-meetup-link]').href = 'https://www.meetup.com/frontendisti/';
}

const switchToOneRowGrid = () => removeClass('size--6-12@md', '[data-meetup-gridcell]');
