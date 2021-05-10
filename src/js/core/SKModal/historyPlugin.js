import { query } from '@superkoders/sk-tools/src/selector';
import queryString from 'query-string';

export const historyPlugin = {
	init: (modal) => {
		const params = queryString.parse(location.search);
		const parsed = queryString.stringify(params);

		const cardsLinks = query('.b-card__link');
		const cardHandlers = cardsLinks.reduce((acc, node, index) => {
			return {
				...acc,
				[index]: node.href.split('.html').slice(0, -1).join('.').split('ajax/').slice(1, 2).join('.'),
			};
		}, {});

		// Open modal on load when there are some parameters
		for (const index in Object.entries(cardHandlers)) {
			if (Object.prototype.hasOwnProperty.call(cardHandlers, [index])) {
				if (cardHandlers[index] === parsed) {
					modal.methods.open(parseInt(index));
				}
			}
		}

		modal.emmiter.on('modalSlideChanged', (_event, data) => {
			const url = data.element.href;
			const urlWithoutExtension = url.split('.html').slice(0, -1).join('.');
			const urlHandler = urlWithoutExtension.split('ajax/').slice(1, 2).join('.');

			updateUrl(urlHandler);
		});

		modal.emmiter.on('modalClose', () => {
			// clear out any parameters TODO
			history.pushState({}, document.title, '/konference.html');
		});

		// When user hits back/forward button TODO
		window.addEventListener('popstate', (event) => {
			for (const index in Object.entries(cardHandlers)) {
				if (Object.prototype.hasOwnProperty.call(cardHandlers, [index])) {
					if (cardHandlers[index] === event.state) {
						modal.methods.open(parseInt(index));
					} else {
						modal.methods.close();
					}
				}
			}
		});

		history.replaceState(null, document.title, location);

	},
	destroy: (modal) => {
		modal.emmiter.off('modalSlideChanged');
		modal.emmiter.off('modalClose');
	},
};

const updateUrl = (handler) => {
	history.pushState(handler, document.title, `?${handler}`);
};