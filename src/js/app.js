import './tools/svg4everybody';
import 'what-input';

// Components
import * as intro from './components/intro';
import * as header from './components/header';
import * as menu from './components/menu';
import * as form from './components/form';
import * as formConf from './components/form-conf';


// content load components
const componentsload = [
];

// once delegated components
const components = [
	intro,
	header,
	menu,
	form,
	formConf,
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

