import { IModalFragments } from './SKModal';

export enum ModalClasses {
	HEADER = 'js-modal-header',
	TITLE = 'js-modal-title',
	TITLE_TEXT = 'js-modal-title-text',
	DESC = 'js-modal-desc',
	DESC_TEXT = 'js-modal-desc-text',
	CONTENT = 'js-modal-content',
	PREV = 'js-modal-prev',
	NEXT = 'js-modal-next',
	NAV = 'js-modal-nav',
	LOADER = 'js-modal-loader',
	BG = 'js-modal-bg',
	CLOSE = 'js-modal-close',
	SLIDE = 'js-modal-slide',
	PREV_TRIGGER = 'js-modal-prev-trigger',
	NEXT_TRIGGER = 'js-modal-next-trigger',
	NAV_TRIGGER = 'js-modal-nav-trigger',
	IFRAME = 'js-modal-iframe',
}

export enum ModalMedium {
	IMAGE = 'image',
	VIDEO = 'video',
	YOUTUBE = 'youtube',
	VIMEO = 'vimeo',
	ELEMENT = 'element',
	FETCH = 'fetch',
	IFRAME = 'iframe',
}

export const modalSelector: string = '[data-modal]';

export const mediaRegex = {
	anchor: /^\#(.+)/,
	image: /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i,
	video: /\.(mp4|mov|ogv|webm)((\?|#).*)?$/i,
	youtube: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
	vimeo: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/i,
};

export const buildStructure: (modal: Element, fragments: IModalFragments) => void = (
	modal,
	{ header, titleElem, descElem, content, prevElem, nextElem, navElem, loader, bg },
) => {
	modal.appendChild(header);
	modal.appendChild(titleElem);
	modal.appendChild(descElem);
	modal.appendChild(content);
	modal.appendChild(prevElem);
	modal.appendChild(nextElem);
	modal.appendChild(navElem);
	modal.appendChild(loader);
	modal.appendChild(bg);
};

export enum KeyCodes {
	ARR_LEFT = 37,
	ARR_RIGHT = 39,
	ARR_UP = 38,
	ARR_DOWN = 40,
	ESC = 27,
}
