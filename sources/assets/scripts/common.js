$(document).ready(function (e) {
	Navigation.init();
	Scene.init();
});


var _controller = new ScrollMagic.Controller();

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
			$anchors = $listIndicators.find('a');

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

		/* menu click */
		$anchors.on('click', function(e) {
			e.preventDefault();

			var target = $(this).attr('href');
			_controller.scrollTo(target);
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
		_currentScene,
		_viewHeight,
		_showTimes,
		_homeAnimation,
		_afterHomeAnimation,
		_arrivedAnimation,
		_timeArrivedAnimation,
		init = function () {
			_currentScene = 0;
			_readyShowTime = false;

			_viewHeight = $(window).height();
			_showTimes = [1, 2];

			initMotion();
			initEvent();
		};//end init


	// stopTween
	function stopTween(div){
		console.log("stopTween");
		TweenMax.killTweensOf(div);
	}


	function viewWillScene(index) {
		if( index === 1 ) {
			_afterHomeAnimation.restart();
		} else if( index === 2 ) {
			arrivedAnimation.resume();
		}
	}

	function initMotion() {
		/* scene : home */
		_homeAnimation = new TimelineMax({paused: true})
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



		/* scene : after home */
		_afterHomeAnimation = new TimelineMax({paused: true, onComplete: function(){
				_currentScene = 1;
			}})
			.add([
				TweenMax.to('.scene.home .btn-start', 0.5, {opacity: 0})
			])
			.add([
				TweenMax.to('.scene.home .moon, .scene.home .wally, .scene.home .title, .scene.home .description', 0.5, {opacity: 0, y: -60}),
				TweenMax.to('.scene.home .inner', 1, {css: {backgroundPosition: "0px -30px", opacity: 0}}),
				TweenMax.to('.scene.home .dark-city', 4, {y: "-200%"}),
				TweenMax.to('.scene.home .empirebuilding', 3.5, {delay: 0.3, y: "-200%"}),
				TweenMax.to('.scene.home .cloud-big', 4, {delay: 1.3, y: "-200%"}),
				TweenMax.to('.scene.home .mountain', 4 , {delay: 1.8, y: "-170%"}),
				TweenMax.to('.scene.home .sea', 2, {delay: 2.1, y: "-100%"}),
				TweenMax.to('.scene.home .day-building', 2, {delay: 2, y: "-100%"}),
				TweenMax.to('.scene.home .day-building', 1, {delay: 5, y: "-115%"}),
				TweenMax.to('.scene.home .outlet', 3, {delay: 3, y: "-100%"}),
				TweenMax.to('.scene.home', 6, {})
			]);
		new ScrollMagic.Scene({
			triggerElement: ".scene.arrived",
			triggerHook: "onEnter",
			duration: 0,
			offset: 1
		})
		.setTween(_afterHomeAnimation.restart())
		.addTo(_controller);


		/* scene : arrived outlet */
		_timeArrivedAnimation = new TimelineMax({paused: true, onComplete: function(){
				viewWillScene(_currentScene++);
			}})
			.fromTo('.time-layer', 0.5, {delay: 1.5, opacity: 0}, {opacity: 1, display: 'block'});


		/* scene : arrived outlet */
		var arrivedAnimation = new TimelineMax({onComplete: function(){
				_currentScene = 2;
			}})
			.from('.scene.arrived .title-time', 0.5, {delay: 1.2, opacity: 0})
			.from('.scene.arrived .wally', 0.5, {delay: 1, opacity: 0, x: -30})
			.from('.scene.arrived .txt01', 0.5, {opacity: 0});

		var sceneArrived = new ScrollMagic.Scene({
			triggerElement: ".scene.arrived",
			triggerHook: 'onLeave'
		})
		.setTween(arrivedAnimation)
		.addTo(_controller);
	}


	function initEvent() {
		_homeAnimation.restart();


		/* home - start */
		$('.scene.home .btn-start').on('click', function(e) {
			e.preventDefault();
			// _afterHomeAnimation.restart();
			_controller.scrollTo(1);
		});

		/* wheel event */
		var lethargy = new Lethargy();
		$(window).bind('mousewheel DOMMouseScroll wheel MozMousePixelScroll',function(e){
			e.preventDefault();
			e.stopPropagation();

/*
			var results = lethargy.check(e);
			if( results !== false ) {
				console.log("results : " + results);

				if( results < 0 ) {
					// next
					if( _currentScene === 0 ) {
						viewWillScene(1);
						return;
					}

					for(var scene in _showTimes) {
						if( scene === _currentScene ) {
							console.log("_timeArrivedAnimation.restart()");
							_timeArrivedAnimation.restart();
							return;
						}
					}
				}

				// TweenMax.to(window, 1.2, {scrollTo:{y:Math.round($(window).scrollTop() / _viewHeight)*_viewHeight+(_viewHeight*results*-1)}, ease:Quad.easeInOut});
			}
*/
		});

	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));
