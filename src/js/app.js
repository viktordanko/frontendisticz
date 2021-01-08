import './tools/svg4everybody';
import 'what-input';

// Components
import * as toggleMobileMenu from './components/toggleMobileMenu';
import * as lazyload from './components/lazyload';
import * as form from './components/form';


// content load components
const componentsload = [
];

// once delegated components
const components = [
	toggleMobileMenu,
	lazyload,
	form,

	// fontFaceObserver,
].concat(componentsload);

window.App = {
	run() {

		let target = document;
		components.forEach(component => component.init(target));

		document.addEventListener('contentload', event => {
			let target = event.target;
			componentsload.forEach(component => component.init(target));
		});
	},

	initComponent(component) {
		return component.init();
	},
};

