import './tools/svg4everybody';
import './tools/whatInput';
// import { media } from './tools/MQ';

// Components
// import * as fontFaceObserver from './components/fontFaceObserver';
import * as toggleMobileMenu from './components/toggleMobileMenu';


// content load components
const componentsload = [
];

// once delegated components
const components = [
	toggleMobileMenu,

	// fontFaceObserver,
].concat( componentsload );

window.App = {
	run() {

		let target = document;
		components.forEach((component) => component.init( target ));

		document.addEventListener('contentload', function(event) {
			let target = event.target;
			componentsload.forEach((component) => component.init( target ));
		});
	},

	initComponent(component) {
		return component.init();
	},
};

