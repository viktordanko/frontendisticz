export const init = async () => {
	const el = document.querySelector('[data-meetup]');

	if (!el) return;

	try {
		const response = await fetch('https://api.meetup.com/frontendisti/events', {
			mode: 'cors',
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});

		if (!response.ok) {
			console.error(response);
			return;
		}

		const data = await response.json();

		const meetupName = data[0].name;
		const meetupDate = new Date(data[0].local_date).toLocaleDateString('cs-CZ', {}).replace(/\//g, '.');
		const meetupTime = data[0].local_time;
		const meetupLink = data[0].link;

		document.querySelector('[data-meetup-name]').classList.remove('inline-skeleton');
		document.querySelector('[data-meetup-date]').classList.remove('inline-skeleton');
		document.querySelector('[data-meetup-name]').innerText = meetupName;
		document.querySelector('[data-meetup-date]').innerText = `${meetupDate} – ${meetupTime}`;
		document.querySelector('[data-meetup-link]').href = meetupLink;

	} catch (error) {
		console.error(error);

		document.querySelector('[data-meetup-name]').classList.remove('inline-skeleton');
		document.querySelector('[data-meetup-date]').classList.remove('inline-skeleton');
		document.querySelector('[data-meetup-name]').innerText = 'Nepodařilo se načíst data';
	}
};

