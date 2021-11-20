export const init = async () => {
	const el = document.querySelector('[data-meetup]');

	if (!el) return;

	const response = await fetch('https://api.meetup.com/frontendisti/events?page=2', {
		headers: {
			'Access-Control-Allow-Origin': 'https://secure.meetup.com',
		},
	});

	if (!response.ok) {
		console.error(response);
		return;
	}

	const data = await response.json();

	const name = document.createElement('p');
	name.innerText = data[0].name;
	el.appendChild(name);


};

