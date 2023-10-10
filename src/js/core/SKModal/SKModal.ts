import * as focusTrap from "focus-trap";
import {
	disableBodyScroll,
	enableBodyScroll,
	BodyScrollOptions,
} from "body-scroll-lock";
import { on, delegate } from "@superkoders/sk-tools/src/event";
import { create } from "@superkoders/sk-tools/src/emmiter";
import loadYoutube from "@superkoders/sk-tools/src/loadYoutube";
import loadVimeoAPI from "@superkoders/sk-tools/src/loadVimeo";
import {
	buildStructure,
	ModalClasses,
	modalSelector,
	ModalMedium,
	mediaRegex,
	KeyCodes,
} from "./constants.ts";
import { iconSvg } from "../../tools/iconSvg";

export interface ISKModalOptions {
	context?: Document | Element;
	parentElement?: Element;
	closeSelector?: string;
	customWrapperClass?: string;
	infinite?: boolean;
	closeOnBgClick?: boolean;
	plugins?: ISKModalPlugin[];
	hideNav?: boolean;
	customData?: any;
	buildStructure?: (modal: Element, fragments: IModalFragments) => void;
	headerTpl?: (options?: ISKModalOptions) => string;
	titleTpl?: (text: string) => string;
	descTpl?: (text: string) => string;
	prevTpl?: (options?: ISKModalOptions) => string;
	nextTpl?: (options?: ISKModalOptions) => string;
	navTpl?: (items: ISKModalItem[]) => string;
	loaderTpl?: (options?: ISKModalOptions) => string;
	imageLoader?: (src: string) => Promise<Node>;
	fetchLoader?: (url: string) => Promise<string>;
	onModalOpen?: (context, type, data) => void;
	onModalClose?: (context, type, data) => void;
	onModalContentLoaded?: (context, type, data) => void;
	onModalSlideChanged?: (context, type, data) => void;
}

export interface ISKModalGallery {
	[key: string]: ISKModalItem[];
}

export interface ISKModalPlugin {
	init: (modal: ISKModal) => void;
	destroy?: (modal: ISKModal) => void;
	reInitOnRedraw?: boolean;
}

export interface ISKModalItem {
	element?: Element;
	url?: string | string[];
	medium?: string;
	title?: string;
	desc?: string;
	gallery?: string;
	player?: any;
	[key: string]: string | number | Element | string[];
}

export interface IModalFragments {
	header: Element;
	titleElem: Element;
	descElem: Element;
	content: Element;
	prevElem: Element;
	nextElem: Element;
	navElem: Element;
	loader: Element;
	bg: Element;
	slider: Element;
}

interface ISKModalPublicMethods {
	open: (ndex: number, event?: MouseEvent) => void;
	close: (event) => void;
	prev: () => void;
	next: () => void;
	goTo: (index: number) => void;
	redraw: (items: ISKModalItem[]) => void;
	getIndex: () => number;
}

interface ISKModal {
	options: ISKModalOptions;
	context: Document | Element;
	element: Element;
	items: ISKModalItem[];
	methods: ISKModalPublicMethods;
	emmiter: any;
}

let modals: ISKModal[] = [];

const loadContent = async (url: string): Promise<string> =>
	await fetch(url).then((response) => response.text());

const loadImage = (src: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.addEventListener("load", () => resolve(img));
		img.addEventListener("error", () => {
			reject(new Error(`Failed to load image with src: ${src}`));
		});
		img.draggable = false;
		img.src = src;
	});
};

const getIframe = (
	src: string,
	loadHandler: () => void,
	isVideo: boolean = false
): HTMLIFrameElement => {
	let iframe = document.createElement("iframe");
	iframe.addEventListener("load", () => loadHandler());
	iframe.addEventListener("error", () => {
		loadHandler();
		console.warn(`Failed to load iframe with src: ${src}`);
	});
	iframe.allowFullscreen = true;
	iframe.scrolling = isVideo ? "no" : "auto";
	iframe.allow = "autoplay; fullscreen";
	iframe.frameBorder = "0";
	iframe.src = src;

	return iframe;
};

const defaultOpts: ISKModalOptions = {
	context: document,
	closeSelector: `.${ModalClasses.CLOSE}`,
	parentElement: document.body,
	infinite: false,
	buildStructure,
	headerTpl: () => `
		<button type="button" class="b-modal__close-btn btn ${
			ModalClasses.CLOSE
		}" aria-label="Zavřít" data-tooltip="Zavřít">
			${iconSvg("cross")}
		</button>
	`,
	titleTpl: (text: string) => `<h3>${text}</h3>`,
	descTpl: (text: string) => `<p>${text}<p>`,
	prevTpl: () =>
		`<button type="button" class="b-modal__prev-btn ${
			ModalClasses.PREV_TRIGGER
		}">${iconSvg("chevron-left")}</button>`,
	nextTpl: () =>
		`<button type="button" class="b-modal__next-btn ${
			ModalClasses.NEXT_TRIGGER
		}">${iconSvg("chevron-right")}</button>`,
	loaderTpl: () =>
		`<span class="spin-loader is-loading" aria-hidden="true"></span>`,
	navTpl: (items) =>
		items
			.map(
				(_item, index) =>
					`<button class="b-modal__nav-item btn ${ModalClasses.NAV_TRIGGER}" data-modal-index="${index}"></button>`
			)
			.join(""),
	imageLoader: loadImage,
	fetchLoader: loadContent,
};

const createModal = (
	id: number,
	items: ISKModalItem[],
	options: ISKModalOptions
): ISKModal => {
	let currentIndex = 0;
	let currentItems = [...items];
	let ytAPI = null;
	let vimeoAPI = null;
	let dragX = 0;
	const modal = document.createElement("div");
	const emmiter = create({});
	const modalFocusTrap = focusTrap.createFocusTrap(modal);
	const scrollLockOptions: BodyScrollOptions = {
		allowTouchMove: (el) => el.isSameNode(modal),
		reserveScrollBarGap: true,
	};
	modal.setAttribute("id", `modal-${id}`);
	modal.setAttribute("class", `b-modal ${options.customWrapperClass || ""}`);
	modal.setAttribute("tabindex", "0");
	options.parentElement.appendChild(modal);

	// fragments
	const header = document.createElement("div");
	const titleElem = document.createElement("div");
	const descElem = document.createElement("div");
	const content = document.createElement("div");
	const prevElem = document.createElement("div");
	const nextElem = document.createElement("div");
	const navElem = document.createElement("div");
	const loader = document.createElement("div");
	const bg = document.createElement("div");

	header.className = `b-modal__header ${ModalClasses.HEADER}`;
	titleElem.className = `b-modal__title ${ModalClasses.TITLE}`;
	descElem.className = `b-modal__description ${ModalClasses.DESC}`;
	content.className = `b-modal__content ${ModalClasses.CONTENT}`;
	prevElem.className = `b-modal__prev ${ModalClasses.PREV}`;
	nextElem.className = `b-modal__next ${ModalClasses.NEXT}`;
	navElem.className = `b-modal__nav ${ModalClasses.NAV}`;
	loader.className = `b-modal__loader ${ModalClasses.LOADER}`;
	bg.className = `b-modal__bg ${ModalClasses.BG}`;

	// create structure
	options.buildStructure(modal, {
		header,
		titleElem,
		descElem,
		content,
		prevElem,
		nextElem,
		navElem,
		loader,
		bg,
	});

	const getSlides = (items: ISKModalItem[]) => {
		content.innerHTML = "";

		return items.map(() => {
			const slide = document.createElement("div");
			slide.setAttribute("class", `b-modal__slide ${ModalClasses.SLIDE}`);
			content.appendChild(slide);

			return slide;
		});
	};

	let slides = getSlides(currentItems);

	header.innerHTML = options.headerTpl(options);
	if (!options.hideNav) {
		prevElem.innerHTML = options.prevTpl(options);
		nextElem.innerHTML = options.nextTpl(options);
		navElem.innerHTML =
			currentItems.length > 1 ? options.navTpl(currentItems) : "";
	}
	loader.innerHTML = options.loaderTpl(options);

	const enableScrollLock = () => {
		disableBodyScroll(document.body, scrollLockOptions);
		setTimeout(() => {
			const scrollWidth = document.body.style.paddingRight;
			modal.style.right = scrollWidth;
		}, 0);
	};

	const disableScrollLock = () => {
		enableBodyScroll(document.body);
		setTimeout(() => {
			modal.style.right = "0";
		}, 0);
	};

	const iframeLoadHandler = () => {
		emmiter.trigger("modalContentLoaded");
	};

	const resolveMedium = (
		item: ISKModalItem,
		src: string | string[]
	): ModalMedium => {
		let medium = item.medium as ModalMedium;

		if (!src) {
			return null;
		}

		if (medium) {
			return medium;
		}

		if (Array.isArray(src)) {
			return resolveMedium(item, src[0]);
		}

		if (mediaRegex.anchor.test(src)) {
			return ModalMedium.ELEMENT;
		}

		if (mediaRegex.image.test(src)) {
			return ModalMedium.IMAGE;
		}

		if (mediaRegex.video.test(src)) {
			return ModalMedium.VIDEO;
		}

		if (mediaRegex.youtube.test(src)) {
			return ModalMedium.YOUTUBE;
		}

		if (mediaRegex.vimeo.test(src)) {
			return ModalMedium.VIMEO;
		}

		if (src !== "") {
			return ModalMedium.IFRAME;
		}

		return null;
	};

	const getContent = async (item: ISKModalItem): Promise<Node> => {
		const { element, url, player } = item;
		const src = element
			? (element as HTMLAnchorElement).getAttribute("href")
			: url;
		const medium = resolveMedium(item, src);

		if (!medium) {
			console.warn(
				`SKModal: Modal medium type was not resolved. Check if the source is correct. Provided source was '${src}'.`
			);
			return null;
		}

		// image
		if (medium === ModalMedium.IMAGE) {
			const imageSources = Array.isArray(src) ? [...src] : [src];
			const wrapperElement = document.createElement("div");

			// for - of is resolving "await" in sequence - so we are sure with the order of images
			for (const source of imageSources) {
				const img = await options.imageLoader(source);
				wrapperElement.appendChild(img);
			}

			wrapperElement.classList.add("b-modal__image");

			if (imageSources.length > 1) {
				wrapperElement.classList.add("b-modal__image--multiple");
			}

			return wrapperElement;
		}

		if (Array.isArray(src)) {
			console.warn("SKModal: Multiple urls are allowed only for images!");
			return null;
		}

		// existing element in the DOM
		if (medium === ModalMedium.ELEMENT) {
			const contentElement = document.querySelector(src);
			const wrapElement = document.createElement("div");
			wrapElement.className = "b-modal__inner";

			if (contentElement) {
				wrapElement.innerHTML = contentElement.innerHTML;
			} else {
				console.warn(
					`SKModal: Content element not found. Check if the id is correct. Provided id was '${src}'.`
				);
			}

			return wrapElement;
		}

		// content from fetch resonse
		if (medium === ModalMedium.FETCH) {
			const contentFetch = await options.fetchLoader(src);
			const contentElement = document.createElement("div");
			contentElement.className = "b-modal__inner";
			contentElement.innerHTML = contentFetch;

			// Close btn is inside the content
			header.innerHTML = options.headerTpl(options);
			//contentElement.lastChild.insertAdjacentElement("beforeend", header);

			return contentElement;
		}

		// HTML5 video
		if (medium === ModalMedium.VIDEO) {
			const formatMatch = src.match(mediaRegex.video);
			const format = `video/${
				formatMatch[1] === "ogv" ? "ogg" : formatMatch[1]
			}`;
			const wrapperElement = document.createElement("div");
			const videoSrc = `<video controls autoplay><source src="${src}" type="${format}"></video>`;

			wrapperElement.classList.add("b-modal__video");
			wrapperElement.innerHTML = videoSrc;

			return wrapperElement;
		}

		// iframe
		if (medium === ModalMedium.IFRAME) {
			const iframe = getIframe(src, iframeLoadHandler);
			const wrapperElement = document.createElement("div");

			wrapperElement.classList.add("b-modal__iframe");
			wrapperElement.appendChild(iframe);

			return wrapperElement;
		}

		// youtube
		if (medium === ModalMedium.YOUTUBE) {
			const urlMatcher = src.match(mediaRegex.youtube);
			const iframeUrl = `https://www.youtube-nocookie.com/embed/${urlMatcher[4]}?autoplay=1&autohide=1&fs=1&rel=0&hd=1&wmode=transparent&enablejsapi=1&html5=1`;
			const iframe = getIframe(iframeUrl, iframeLoadHandler, true);
			const wrapperElement = document.createElement("div");

			wrapperElement.classList.add("b-modal__embed");
			wrapperElement.appendChild(iframe);

			if (!ytAPI) {
				ytAPI = await loadYoutube();
			}

			if (!player) {
				const player = new ytAPI.Player(iframe);
				item.player = player;
			}

			return wrapperElement;
		}

		// vimeo
		if (medium === ModalMedium.VIMEO) {
			const urlMatcher = src.match(mediaRegex.vimeo);
			const iframeUrl = `https://player.vimeo.com/video/${urlMatcher[2]}?autoplay=1&portrait=0`;
			const iframe = getIframe(iframeUrl, iframeLoadHandler, true);
			const wrapperElement = document.createElement("div");

			wrapperElement.classList.add("b-modal__embed");
			wrapperElement.appendChild(iframe);

			if (!vimeoAPI) {
				vimeoAPI = await loadVimeoAPI();
			}

			if (!player) {
				const player = new vimeoAPI.Player(iframe);
				item.player = player;
			}

			return wrapperElement;
		}
	};

	const goTo = async (index: number) => {
		currentIndex = index;
		const item = currentItems[index];
		const { title, desc, element, url } = item;

		// toggle nav arrows
		if (!options.infinite) {
			if (currentIndex === 0) {
				modal.classList.add("is-first");
			} else {
				modal.classList.remove("is-first");
			}

			if (currentIndex === currentItems.length - 1) {
				modal.classList.add("is-last");
			} else {
				modal.classList.remove("is-last");
			}
		}

		// render title and desc
		titleElem.innerHTML = title ? options.titleTpl(title) : "";
		descElem.innerHTML = desc ? options.descTpl(desc) : "";

		// render content
		if (!slides[index].classList.contains("is-loaded")) {
			modal.classList.add("is-loading");

			const content = await getContent(item);

			slides[index].appendChild(content);
			modal.classList.remove("is-loading");
			slides[index].classList.add("is-loaded");
		}

		// toggle active
		slides.forEach((slide: HTMLElement, i: number) => {
			slide.classList.remove("is-active");
			const video = slide.querySelector("video");
			const player = currentItems[i].player as any;

			if (player) {
				if (i === currentIndex) {
					player.playVideo ? player.playVideo() : player.play && player.play();
				} else {
					player.pauseVideo
						? player.pauseVideo()
						: player.pause && player.pause();
				}
			}

			if (i === currentIndex) {
				slide.classList.add("is-active");
				video && video.play();
			} else {
				video && video.pause();
			}
		});
		[].slice
			.call(modal.querySelectorAll(`.${ModalClasses.NAV_TRIGGER}`))
			.forEach((navItem, i) => {
				if (i === currentIndex) {
					navItem.classList.add("is-active");
				} else {
					navItem.classList.remove("is-active");
				}
			});

		// trigger content loaded
		const src = element
			? (element as HTMLAnchorElement).getAttribute("href")
			: url;
		const medium = resolveMedium(item, src);

		if (
			medium &&
			medium !== ModalMedium.IFRAME &&
			medium !== ModalMedium.VIMEO &&
			medium !== ModalMedium.YOUTUBE
		) {
			emmiter.trigger("modalContentLoaded");
		}

		emmiter.trigger("modalSlideChanged", { page: currentIndex + 1, element });
	};

	const prev = () => {
		if (options.hideNav) return;

		let prevIndex = currentIndex - 1;

		if (prevIndex < 0 && options.infinite) {
			prevIndex = currentItems.length - 1;
		} else if (prevIndex < 0) {
			return;
		}

		goTo(prevIndex);
	};

	const next = () => {
		if (options.hideNav) return;

		let nextIndex = currentIndex + 1;

		if (nextIndex > currentItems.length - 1 && options.infinite) {
			nextIndex = 0;
		} else if (nextIndex > currentItems.length - 1) {
			return;
		}

		goTo(nextIndex);
	};

	const nav = (event: MouseEvent) => {
		const index = (event.target as HTMLElement).dataset.modalIndex;
		if (index) {
			goTo(parseInt(index));
		}
	};

	const open = (index: number, event?: MouseEvent) => {
		if (event) {
			event.preventDefault();
		}

		modal.classList.add("is-opened");
		goTo(index);
		modalFocusTrap.activate();
		//enableScrollLock();
		emmiter.trigger("modalOpen");
	};

	const close = (event?) => {
		if (event) {
			event.preventDefault();
		}
		modal.classList.remove("is-opened");
		slides.forEach((slide: HTMLElement, i: number) => {
			const video = slide.querySelector("video");
			const player = currentItems[i].player as any;

			if (player) {
				player.pauseVideo
					? player.pauseVideo()
					: player.pause && player.pause();
			}

			if (video) {
				video.pause();
			}
		});
		modalFocusTrap.deactivate();
		//disableScrollLock();
		emmiter.trigger("modalClose");
	};

	const redraw = (newItems: ISKModalItem[], skipGoTo?: boolean) => {
		if (options.plugins && options.plugins.length) {
			options.plugins.forEach(
				(plugin) => plugin.reInitOnRedraw && plugin.destroy(modals[id])
			);
		}

		currentItems = [...newItems];
		modals[id].items = currentItems;
		slides = getSlides(newItems);
		navElem.innerHTML = newItems.length > 1 ? options.navTpl(newItems) : "";

		if (options.plugins && options.plugins.length) {
			options.plugins.forEach(
				(plugin) => plugin.reInitOnRedraw && plugin.init(modals[id])
			);
		}

		if (skipGoTo) return;

		goTo(newItems[currentIndex] ? currentIndex : 0);
	};

	const getIndex = () => currentIndex;

	const handleKeyDown = (event: KeyboardEvent): void => {
		switch (event.keyCode) {
			// navigate
			case KeyCodes.ARR_LEFT:
			case KeyCodes.ARR_UP:
				prev();
				break;
			case KeyCodes.ARR_RIGHT:
			case KeyCodes.ARR_DOWN:
				next();
				break;

			// close
			case KeyCodes.ESC:
				close(event);
				break;
			default:
				return;
		}
	};

	const onTouchStart = (event: TouchEvent): void => {
		dragX = event.changedTouches[0].clientX;
	};

	const onTouchEnd = (event: TouchEvent): void => {
		if (!dragX) return;

		const dx = event.changedTouches[0].clientX - dragX;

		if (Math.abs(dx) >= 20) {
			dx < 0 ? next() : prev();
		}
	};

	// bind events
	on(modal, "click", delegate(options.closeSelector, close));
	on(modal, "click", delegate(`.${ModalClasses.PREV_TRIGGER}`, prev));
	on(modal, "click", delegate(`.${ModalClasses.NEXT_TRIGGER}`, next));
	on(modal, "click", delegate(`.${ModalClasses.NAV_TRIGGER}`, nav));
	on(modal, "keydown", handleKeyDown);
	on(content, "touchstart", onTouchStart);
	on(content, "touchend", onTouchEnd);
	items.forEach((item, index) => {
		const { element } = item;
		if (element) {
			on(item.element, "click", (event: MouseEvent) => open(index, event));
		}
	});
	if (options.onModalOpen) {
		emmiter.on("modalOpen", options.onModalOpen);
	}
	if (options.onModalClose) {
		emmiter.on("modalClose", options.onModalClose);
	}
	if (options.onModalContentLoaded) {
		emmiter.on("modalContentLoaded", options.onModalContentLoaded);
	}
	if (options.onModalSlideChanged) {
		emmiter.on("modalSlideChanged", options.onModalSlideChanged);
	}
	if (options.closeOnBgClick) {
		on(bg, "click", close);
	}

	const modalInstance: ISKModal = {
		options,
		emmiter,
		context: options.context,
		element: modal,
		items,
		methods: {
			open,
			close,
			prev,
			next,
			goTo,
			redraw,
			getIndex,
		},
	};

	modals.push(modalInstance);

	// init plugins
	if (options.plugins && options.plugins.length) {
		options.plugins.forEach((plugin) => plugin.init(modalInstance));
	}

	return modalInstance;
};

export const initModal = (
	opts: ISKModalOptions,
	modalItems?: ISKModalItem[]
): void => {
	const options: ISKModalOptions = { ...defaultOpts, ...opts };
	const { context } = options;
	let items: ISKModalItem[] = [];

	if (context) {
		const elements = [].slice.call(context.querySelectorAll(modalSelector));
		items = elements.map((element) => ({
			element,
			...JSON.parse((element as HTMLElement).dataset.modal || "{}"),
		}));
	}

	if (modalItems) {
		items = modalItems;
	}

	const galleries: ISKModalGallery = items.reduce((acc, item) => {
		const { gallery = "default" } = item;
		if (acc[gallery]) {
			acc[gallery].push(item);
		} else {
			acc[gallery] = [item];
		}

		return acc;
	}, {} as ISKModalGallery);

	Object.keys(galleries).forEach((gallery) => {
		const modalOptions = { ...options };
		if (gallery === "default") {
			modalOptions.hideNav = true;
		}

		createModal(modals.length, galleries[gallery], modalOptions);
	});
};
