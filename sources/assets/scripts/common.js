$(document).ready(function (e) {

	viewSize = $('.scene.home').height();
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
		_contoller,
		init = function () {
			_controller = new ScrollMagic.Controller();

			initLayout();
			initEvent();
		};//end init


	// scene : home
	function sceneHome() {
		var homeAnimation = new TimelineMax()
			.add([
				TweenMax.fromTo('.scene.home .moon', 0.5, {delay: 5, opacity: 0, y: -30}, {opacity: 1, y: 0}),
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

	// scene : home after motion
	function afterSceneHome() {
		var homeAfterAnimation = new TimelineMax()
			.add([
				TweenMax.fromTo('.scene.home .btn-start', 0.5, {opacity: 1}, {opacity: 0})
			])
			.add([
				TweenMax.to('.scene.home .btn-start, .scene.home .moon, .scene.home .wally, .scene.home .title, .scene.home .description', 0.5, {opacity: 0, y: -60}),
				TweenMax.to('.scene.home .inner', 1, {css: {backgroundPosition: "0px -100px"}}),
				TweenMax.to('.scene.home .inner', 1, {opacity: 0}),

				TweenMax.to('.scene.home .dark-city', 4, {css: {top: "-120%"}}),
				TweenMax.to('.scene.home .empirebuilding', 3.5, {delay: 0.3, css: {top: "-110%"}}),
				TweenMax.to('.scene.home .cloud-big', 4, {delay: 1.3, css: {top: "-100%"}}),
				TweenMax.to('.scene.home .mountain', 3, {delay: 1.8, css: {top: "-100%"}}),
				TweenMax.to('.scene.home .sea', 1.5, {delay: 2, css: {top: "0%"}}),
				TweenMax.to('.scene.home .day-building', 2.2, {delay: 2.3, css: {bottom: "0%"}}),
				TweenMax.to('.scene.home .outlet', 2.2, {delay: 2.8, css: {bottom: "0%"}}),
			]);

		new ScrollMagic.Scene({
			triggerElement: ".scene.home",
			triggerHook: "onLeave",
			duration: "100%"
		})
		.setPin('.scene.home')
		.setTween(homeAfterAnimation)
		.addTo(_controller);
	}


	function initLayout() {
		sceneHome();
		afterSceneHome();
	}

	function initEvent() {
		$('.scene.home .btn-start').on('click', function(e) {
			e.preventDefault();
			afterSceneHome();
		});
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));
