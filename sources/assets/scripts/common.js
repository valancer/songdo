$(document).ready(function (e) {

	var viewSize = $('.scene.home').height();
	console.log('viewSize : ' + viewSize);

	Navigation.init();
	Scene.init();
});


var Navigation = (function ($) {
	var scope,
		$dimmed,
		$navigationContainer,
		$openMenus,
		$menusContainer,
		$btnToggleMenu,
		$listIndicators,
		init = function () {
			$dimmed = $('.dimmed');
			$navigationContainer = $('.menus');
			$btnToggleMenu = $navigationContainer.find('.btn-toggle-menu');
			$openMenus = $navigationContainer.find('.open-menus');
			$menusContainer = $openMenus.find('.list-menus');
			$listIndicators = $navigationContainer.find('.list-indicators');

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
		TweenMax.set($openMenus, {autoAlpha:0});
		TweenMax.set($dimmed, {autoAlpha:0});
	}

	function initEvent() {
		$btnToggleMenu.on('click', function(e) {
			var $this = $(this);
			$this.toggleClass("is-selected");

			if( $this.hasClass('is-selected') ) {
				TweenMax.to($navigationContainer, 0.3, {width: 235} );
				TweenMax.to($openMenus, 0.3, {autoAlpha: 1} );
				TweenMax.to($listIndicators, 0.3, {autoAlpha: 0} );
				TweenMax.to($dimmed, 0.3, {autoAlpha: 1} );
			} else {
				TweenMax.to($navigationContainer, 0.3, {width: 50} );
				TweenMax.to($openMenus, 0.3, {autoAlpha: 0} );
				TweenMax.to($listIndicators, 0.3, {autoAlpha: 1} );
				TweenMax.to($dimmed, 0.3, {autoAlpha: 0} );
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



var Scene = (function ($) {
	var scope,
		contoller,
		init = function () {
			controller = new ScrollMagic.Controller();

			initLayout();
			initEvent();
		};//end init

	function sceneHome() {
		// scene : home
/*
		var homeAnimation = new TimelineMax()
			.add([
				TweenMax.fromTo('.scene.home .btn-start', 0.5, {opacity:0.1}, {opacity:1}),
			]);

		new ScrollMagic.Scene({
			triggerElement: ".scene.home",
			triggerHook: "onLeave",
			duration: "100%"
		})
		.setPin('.scene.home')
		.setTween(homeAnimation)
		.addTo(controller);
*/
		var homeAnimation = new TimelineMax()
			.add([
				TweenMax.fromTo('.scene.home .moon', 0.5, {opacity: 0, y: -30}, {opacity: 1, y: 0}),
			])
			.add([
				TweenMax.fromTo('.scene.home .title', 0.5, {opacity: 0, y: 30}, {opacity: 1, y: 0}),
			])
			.add([
				TweenMax.fromTo('.scene.home .description', 0.5, {opacity: 0, y: 30}, {opacity: 1, y: 0}),
			])
			.add([
				TweenMax.fromTo('.scene.home .wally', 0.5, {opacity: 0, y: 30}, {opacity: 1, y: 0}),
			])
			.add([
				TweenMax.fromTo('.scene.home .wally', 1, {y: 0}, {y: 10, ease: Quad.easeInOut, repeat: -1, yoyo: true}),
				TweenMax.fromTo('.scene.home .btn-start', 0.5, {opacity: 0, y: -30}, {opacity: 1, y: 0})
			]);

	}

	function initLayout() {
		sceneHome();
	}

	function initEvent() {
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));
