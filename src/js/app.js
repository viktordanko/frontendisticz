import $ from 'jquery';
// import './tools/svg4everybody';
// import { media } from './tools/MQ';

// Components
// import * as fontFaceObserver from './components/fontFaceObserver';
import * as toggleMobileMenu from './components/toggleMobileMenu';
import * as smoothScroll from './components/smoothScroll';


// content load components
const componentsload = [
];

// once delegated components
const components = [
	toggleMobileMenu,
	smoothScroll,

	// fontFaceObserver,
].concat( componentsload );

window.App = {
	run() {
		// console.log(media('lgDown'));
		// console.log(media('webkit'));


		var $target = $(document);
		components.forEach((component) => component.init( $target ));

		$(document)
			.on('contentload', function(event) {
				var $target = $(event.target);
				componentsload.forEach((component) => component.init( $target ));
			});
	},

	initComponent(component) {
		return component.init();
	},
};

