$(document).ready(function (e) {

	var viewSize = $('.scene.home').height();
	console.log('viewSize : ' + viewSize);

	Navigation.init();
});



var Navigation = (function ($) {
	var scope,
		$navigationContainer,
		$openMenus,
		$menusContainer,
		$btnToggleMenu,
		init = function () {
			$navigationContainer = $('.menus');
			$btnToggleMenu = $navigationContainer.find('.btn-toggle-menu');
			$openMenus = $navigationContainer.find('.open-menus');
			$menusContainer = $openMenus.find('.list-menus');

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
		TweenMax.set($openMenus.get(0), {autoAlpha:0});
	}

	function initEvent() {
		$btnToggleMenu.on('click', function(e) {
			var $this = $(this);
			$this.toggleClass("is-selected");

			if( $this.hasClass('is-selected') ) {
				TweenMax.to('.menus', 0.3, {width: 235} );
				TweenMax.to('.open-menus', 0.3, {autoAlpha: 1} );
				TweenMax.to('.list-indicators', 0.3, {autoAlpha: 0} );
			} else {
				TweenMax.to('.menus', 0.3, {width: 50} );
				TweenMax.to('.open-menus', 0.3, {autoAlpha: 0} );
				TweenMax.to('.list-indicators', 0.3, {autoAlpha: 1} );
			}

		});

		/* menus */
		$menusContainer.on('mouseenter', function(e) {
			$menusContainer.addClass('is-hover');
		});

		$menusContainer.on('mouseleave', function(e) {
			$menusContainer.removeClass('is-hover');
		});
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));
