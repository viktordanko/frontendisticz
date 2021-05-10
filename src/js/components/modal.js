import { initModal } from '../core/SKModal/SKModal.ts';
import { historyPlugin } from '../core/SKModal/historyPlugin';

export const init = () => {
	const options = {
		closeOnBgClick: true,
	};
	initModal({ plugins: [historyPlugin], ...options });
};