import $ from 'jquery';

export const init = () => {

	var $btn = $('.js-toggleMobileMenu');
	var $menu = $('.m-main');
	var $header = $('.header');

	$(document)
		.on('click', '.js-toggleMobileMenu', function() {
			$menu.toggleClass('is-opened');
			$btn.toggleClass('is-opened');
			$header.toggleClass('is-opened');
		})
		// outclick
		.on('click', event => {
			if (!$(event.target).closest($menu).length && !$(event.target).closest($btn).length) {
				$menu.removeClass('is-opened');
				$btn.removeClass('is-opened');
				$header.removeClass('is-opened');
			}
		});
};
