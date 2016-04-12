$(document).ready(function (e) {
	Navigation.init();
	Scene.init();
	Brand.init();
});


var controller = new ScrollMagic.Controller();
var sceneData = [
	{
		title: 'Home',
		animation: null,
		scroll: 'none'
	},
	{
		title: "After Home",
		animation: null,
		scroll: 'direct',
		timeAnimation: null,
		timeLayer: {
			target: '.time01'
		}
	},
	{
		title: "Arrvied Outlet",
		animation: null,
		scroll: 'auto',
		timeAnimation: null,
		timeLayer: {
			target: '.time02'
		}
	},
	{
		title: "Outlet Brand",
		animation: null,
		scroll: 'auto',
		timeAnimation: null,
		timeLayer: {
			target: '.time02'
		}
	}
];



/* 우측 메뉴 및 네비게이션 */
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
			controller.scrollTo(target);
		});
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));




/* 전체 SCENE 애니메이션 고나련 */
var Scene = (function ($) {
	var scope,
		_currentScene,
		_isAnimating,
		_viewHeight,

		_timeArrivedAnimation,
		init = function () {
			_currentScene = 0;
			_isAnimating = false;

			_viewHeight = $(window).height();

			initMotion();
			initEvent();
		};//end init

	function initMotion() {
		/* scene : home */
		var homeAnimation = new TimelineMax({paused: true, onStart:startAnimation})
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
				TweenMax.fromTo('.scene.home .btn-start', 0.5, {opacity: 0, y: -30}, {opacity: 1, y: 0, onComplete:finishAnimation})
			]);
		sceneData[0].animation = homeAnimation;



		/* scene : after home */
		var afterHomeAnimation = new TimelineMax({paused: true, onStart:startAnimation, onComplete:finishAnimation})
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
/*
		new ScrollMagic.Scene({
			triggerElement: ".scene.arrived",
			triggerHook: "onEnter",
			duration: 0
		})
		.setTween(_afterHomeAnimation.restart())
		.addTo(controller);
*/
		sceneData[1].animation = afterHomeAnimation;


		/* scene : arrived outlet */
		var arrivedAnimation = new TimelineMax({onStart:startAnimation, onComplete:finishAnimation})
			.from('.scene.arrived .title-time', 0.5, {delay: 1.2, opacity: 0})
			.from('.scene.arrived .wally', 0.5, {delay: 1, opacity: 0, x: -30})
			.from('.scene.arrived .txt01', 0.5, {opacity: 0});
		var sceneArrived = new ScrollMagic.Scene({
			triggerElement: ".scene.arrived",
			triggerHook: 'onLeave'
		})
		.setTween(arrivedAnimation)
		.addTo(controller);
		sceneData[2].animation = arrivedAnimation;


		/* scene : arrived outlet */
		var brandAnimation = new TimelineMax({onStart:startAnimation, onComplete:finishAnimation})
			.from('.scene.brand .title-time', 0.5, {delay: 1.2, opacity: 0})
			.from('.scene.brand .btn.luxury', 0.3, {delay: 0, opacity: 0, y: -30})
			.from('.scene.brand .btn.sport-factory', 0.3, {delay: 0, opacity: 0, y: 30})
			.from('.scene.brand .btn.fashion', 0.3, {delay: 0, opacity: 0, y: -30})
			.from('.scene.brand .btn.handsome', 0.3, {delay: 0, opacity: 0, y: 30})
			.from('.scene.brand .wilma', 0.5, {delay: 1, opacity: 0})
			.from('.scene.brand .wally', 0.5, {delay: 1, opacity: 0});
		var sceneBrand = new ScrollMagic.Scene({
			triggerElement: ".scene.brand",
			triggerHook: 'onLeave'
		})
		.setTween(brandAnimation)
		.addTo(controller);
		sceneData[3].animation = brandAnimation;



		startScene();
	}



	function initEvent() {
		/* home - start */
		$('.scene.home .btn-start').on('click', function(e) {
			e.preventDefault();
			next();
		});

		/* wheel event */
		var lethargy = new Lethargy();
		$(window).bind('mousewheel DOMMouseScroll wheel MozMousePixelScroll',function(e){
			e.preventDefault();
			e.stopPropagation();

			var results = lethargy.check(e);
			if( results !== false ) {
				if( results < 0 ) {
					next();
				} else {
					prev();
				}
			}
		});

	}


	// stopTween
	function stopTween(div){
		TweenMax.killTweensOf(div);
	}


	function startAnimation() {
		_isAnimating = true;
		console.log("startAnimation : " + _isAnimating);
	}

	function finishAnimation(isTimeLayer) {
		_isAnimating = false;
		console.log("finishAnimation : " + _isAnimating);
		if( isTimeLayer ) {
			TweenMax.set('.time-layer', {css: {zIndex:-1}});
			next(true);
		}
	}

	/* start Scene */
	function startScene() {
		animationScene(sceneData[0].animation);
	}

	/* animationScene */
	function animationScene(animation) {
		animation.restart();
	}

	/* time layer */
	function timeLayerAnimation(scene) {
		if( _isAnimating ) {
			console.log("moving.... cancel next()");
			return;
		}

		var now = scene.timeLayer.target + " .now";
		var nowTxt = scene.timeLayer.target + " .now-txt";

		/* scene : time layer */
		startAnimation();
		TweenMax.set('.time-layer', {css: {zIndex:2000}});
		var timeAnimation = new TimelineMax({onStart:startAnimation, onComplete:finishAnimation, onCompleteParams:[true]})
			.to('.time-layer', 0.5, {delay: 1.5, opacity: 1})
			.add([
				TweenMax.fromTo(now, 0.3, {y: 30}, {opacity: 1, y: 0}),
				TweenMax.fromTo(nowTxt, 0.3, {y: 30}, {delay: 0.2, opacity: 1, y:0})
			])
			.to('.time-layer', 0.5, {delay: 1.5, opacity: 0})
			.add([
				TweenMax.to(now, 0.1, {opacity: 0}),
				TweenMax.to(nowTxt, 0.1, {opacity: 0})
			]);
	}

	/* next Scene */
	function next(afterTimeLaer) {
		if( _isAnimating ) {
			console.log("moving.... cancel next()");
			return;
		}

		var scene = sceneData[_currentScene];
		var nextScene = sceneData[_currentScene+1];
		if( nextScene === undefined ) return;

		console.log("_currentScene : " + _currentScene);
		console.log(scene);
		console.log(nextScene);
		console.log("timeLayer : " + scene.hasOwnProperty('timeLayer'));

		// Time Layer 표시 이후
		// if( afterTimeLaer !== undefined && afterTimeLaer ) {

		// }

		if( !afterTimeLaer && scene.hasOwnProperty('timeLayer') ) {
			timeLayerAnimation(scene);
		} else {
			if( nextScene.scroll == "auto" ) {
				TweenMax.to(window, 1.2, {scrollTo:{y:Math.round($(window).scrollTop() / _viewHeight)*_viewHeight+(_viewHeight)}, ease:Quad.easeInOut});
			} else if( nextScene.scroll == "direct" ) {
				animationScene(nextScene.animation);
			}
			_currentScene++;
		}
	}

	/* prev Scene */
	function prev() {
		if( _isAnimating ) {
			console.log("moving.... cancel prev()");
			return;
		}

	}


	return {
		init: function () {
			scope = this;

			init();
		},
		getIsAnimating: function() {
			return _isAnimating;
		}
	};
}(jQuery));




/* SCENE04 - Brand 메뉴 */
var Brand = (function ($) {
	var scope,
		$brandContainer,
		$btns,
		init = function () {
			$brandContainer = $('.scene.brand .outlet-brand');
			$btns = $brandContainer.find('.btn');

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
	}

	function initEvent() {
		$brandContainer.on('mouseenter', function(e) {
			if( Scene.getIsAnimating() ) return;
			TweenMax.to('.scene.brand .btn > span', 0.5, {opacity: 0});
		});

		$brandContainer.on('mouseleave', function(e) {
			TweenMax.to('.scene.brand .btn > span', 0.5, {delay: 0.3, opacity: 1});
		});
		/* menus */
		$btns.on('mouseenter', function(e) {
			if( Scene.getIsAnimating() ) return;

			var $targetBG = $($(this).data('target'));
			TweenMax.to($targetBG, 0.5, {opacity: 1});
		});

		$btns.on('mouseleave', function(e) {
			var $targetBG = $($(this).data('target'));
			TweenMax.to($targetBG, 0.5, {delay: 0.3, opacity: 0});
		});
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));
