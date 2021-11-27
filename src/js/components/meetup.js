export const init = async () => {
	const el = document.querySelector('[data-meetup]');

	if (!el) return;

	try {
		const response = await fetch('https://api.meetup.com/frontendisti/', {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});

		if (!response.ok) {
			console.error(response);
			return;
		}

		const data = await response.json();

		console.log(data);

		const name = document.createElement('p');
		name.innerText = data[0].name;
		el.appendChild(name);

	} catch (error) {
		console.error(error);
	}
};

