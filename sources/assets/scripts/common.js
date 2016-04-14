$(document).ready(function (e) {
	Navigation.init();
	Scene.init();
	Brand.init();
	Launch.init();
	Path.init();
	Market.init();
});


var controller = new ScrollMagic.Controller();
var sceneData = [
	{
		id: '#home',
		title: 'Home',
		animation: null,
		scroll: 'direct'
	},
	{
		id: '#after-home',
		title: "After Home",
		animation: null,
		scroll: 'auto',
		timeAnimation: null
	},
	{
		id: '#arrived',
		title: "Arrvied Outlet",
		animation: null,
		scroll: 'auto',
		timeAnimation: null,
		timeLayer: {
			target: '.time02'
		}
	},
	{
		id: '#brand',
		title: "Outlet Brand",
		animation: null,
		scroll: 'auto',
		timeAnimation: null,
		timeLayer: {
			target: '.time03'
		}
	},
	{
		id: '#launch',
		title: "Launch",
		animation: null,
		scroll: 'auto',
		timeAnimation: null
	},
	{
		id: '#market',
		title: "Premium Market",
		animation: null,
		scroll: 'auto',
		timeAnimation: null,
		timeLayer: {
			target: '.time05'
		}
	},
	{
		id: '#garden',
		title: "Garden Terrace",
		animation: null,
		scroll: 'auto',
		timeAnimation: null,
		timeLayer: {
			target: '.time08'
		}
	},
	{
		id: '#ending',
		title: "Ending",
		animation: null,
		scroll: 'auto',
		timeAnimation: null
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
		_speed,
		_oldDelta,
		_viewHeight,

		_timeArrivedAnimation,
		init = function () {
			_currentScene = 0;
			_isAnimating = false;
			_speed = 100;
			_oldDelta = 0;

			_viewHeight = $(window).height();

			initMotion();
			initEvent();
		};//end init

	function initMotion() {
		/* scene : home */
		var homeAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["H"]})
			.fromTo('.scene.home .moon', 0.5, {delay: 5, opacity: 0, y: -30}, {opacity: 1, y: 0})
			.fromTo('.scene.home .title', 0.5, {opacity: 0, y: 30}, {opacity: 1, y: 0})
			.fromTo('.scene.home .description', 0.5, {opacity: 0, y: 30}, {opacity: 1, y: 0})
			.fromTo('.scene.home .wally', 0.5, {opacity: 0, y: 30}, {opacity: 1, y: 0})
			.add([
				TweenMax.fromTo('.scene.home .wally', 1, {y: 0}, {y: 10, ease: Quad.easeInOut, repeat: -1, yoyo: true}),
				TweenMax.fromTo('.scene.home .btn-start', 0.5, {opacity: 0, y: -30}, {opacity: 1, y: 0, onComplete:finishAnimation})
			]);
		sceneData[0].animation = homeAnimation;



		/* scene : after home */
		// TweenMax.set('.time-layer', {css: {zIndex:2000}});
		var afterHomeAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:["AH"], onComplete:finishAnimation, onCompleteParams:["AH"]})
			.set('.time-layer', {css: {zIndex:2000}})
			.to('.scene.home .btn-start', 0.5, {opacity: 0})
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
			])
			.to('.time-layer', 0.5, {delay: 1.5, opacity: 1})
			.add([
				TweenMax.fromTo('.time01 .now', 0.3, {y: 30}, {opacity: 1, y: 0}),
				TweenMax.fromTo('.time01 .now-txt', 0.3, {y: 30}, {delay: 0.2, opacity: 1, y:0})
			])
			.to('.time-layer', 0.5, {delay: 1.5, opacity: 0})
			.add([
				TweenMax.to('.time01 .now', 0.1, {opacity: 0}),
				TweenMax.to('.time01 .now-txt', 0.1, {opacity: 0})
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
		var arrivedAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["AO"], onComplete:finishAnimation, onCompleteParams:["AO"]})
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


		/* scene : outlet brand */
		var brandAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["B"], onComplete:finishAnimation, onCompleteParams:["B"]})
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




		/* scene : launch */
		var traceAnimation = new TimelineMax({delay:0})
			.to('#tracesvg path#p1', 20, {strokeDashoffset: 0, ease:Linear.easeNone});
		sceneLaunch = new ScrollMagic.Scene({
			triggerElement: ".scene.launch",
			duration: "3379px",
			offset: 870
		})
		.setTween(traceAnimation)
		.addTo(controller);




		/* scene : premium market */
		var marketAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["M"], onComplete:finishAnimation, onCompleteParams:["M"]})
			.add([
				TweenMax.from('.scene.market .title-time', 0.5, {delay: 0.5, opacity: 0}),
				TweenMax.from('.scene.market .btn-market', 0.5, {delay: 0.5, opacity: 0})
			])
			.from('.scene.market .wally', 0.5, {delay: 1, opacity: 0, x: 20})
			.from('.scene.market .odlaw', 0.5, {delay: 0.5, opacity: 0})
			.from('.scene.market .wizard', 0.5, {delay: 0.5, opacity: 0, x: -30});

		var sceneMarket = new ScrollMagic.Scene({
			triggerElement: ".scene.market",
			triggerHook: 'onLeave'
		})
		.setTween(marketAnimation)
		.addTo(controller);
		sceneData[5].animation = marketAnimation;




		/* scene : garden terrace */
		var parassolAnimation = new TimelineMax()
			.add([
				TweenMax.from('.scene.garden .parassol01', 1.3, {x:-470, y:576, rotation:-45, ease:Power1.easeInOut}),
				TweenMax.from('.scene.garden .parassol02', 1.3, {x:-470, y:433, rotation:-45, ease:Power1.easeInOut})
			]);
		var sceneParassol = new ScrollMagic.Scene({
			triggerElement: ".scene.garden",
			triggerHook: 'onEnter',
			duration: "200%"
		})
		.setTween(parassolAnimation)
		.addTo(controller);


		var gardenAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["GARDEN"], onComplete:finishAnimation, onCompleteParams:["GARDEN"]})
			.add([
				TweenMax.from('.scene.garden .title-time', 0.5, {delay: 0.5, opacity: 0}),
				TweenMax.from('.scene.garden .btn-pub', 0.5, {delay: 0.5, opacity: 0})
			])
			.from('.scene.garden .wilma', 0.5, {delay: 1, opacity: 0})
			.from('.scene.garden .wally', 0.5, {delay: 0.5, opacity: 0});
			
		var sceneGarden = new ScrollMagic.Scene({
			triggerElement: ".scene.garden",
			triggerHook: 'onLeave'
		})
		.setTween(gardenAnimation)
		.addTo(controller);
		sceneData[6].animation = gardenAnimation;



		/* scene : ending */
		var endingAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["END"], onComplete:finishAnimation, onCompleteParams:["END"]})
			.from('.scene.ending .title-time', 0.5, {opacity: 0})
			.from('.scene.ending .people', 0.5, {delay: 1, opacity: 0, x: -30})
			.from('.scene.ending .txt01', 0.5, {delay: 1, opacity: 0})
			.from('.scene.ending .txt02', 0.5, {delay: 1, opacity: 0})
			.from('.scene.ending .txt03', 1, {delay: 1, opacity: 0});

		var sceneEnding = new ScrollMagic.Scene({
			triggerElement: ".scene.garden",
			triggerHook: 'onLeave'
		})
		.setTween(endingAnimation)
		.addTo(controller);
		sceneData[7].animation = endingAnimation;




	}

	function showThis(div){
		$(document).find(div).css('visibility', 'visible');
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
			
			var scene = sceneData[_currentScene];

			var sceneTop = $('#launch').offset().top;
			var sceneHeight = $('#launch').height();
			var windowTop = $(window).scrollTop();

			if( sceneTop <= windowTop && windowTop < sceneTop+sceneHeight ) {

			} else {
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
			}
		});

		$(window).bind('resize', function(){
			_viewHeight = $(window).height();
			controller.update(true);
		});

	}


	// stopTween
	function stopTween(div){
		TweenMax.killTweensOf(div);
	}


	function startAnimation(fromValue) {
		_isAnimating = true;

		console.log("start animation from : " + fromValue);

		if( fromValue == "M" ) {
			_currentScene = 5;
		}
	}

	function finishAnimation(value) {
		_isAnimating = false;

		console.log("[finishAnimation] " + value);
		// scene - after motion
		if( value == "AH" ) {
			console.log("finishAnimation : AH stop");
			TweenMax.set('.time-layer', {css: {zIndex:-1}});
			next();
		}

		// scene - outlet
		if( value == "AO" ) {
			console.log("finishAnimation : AO stop");
			sceneData[1].animation.pause(0, true);
			sceneData[1].animation.remove();
		}

		// time layer
		if( value == "T" ) {
			console.log("finishAnimation : time layer stop");
			TweenMax.set('.time-layer', {css: {zIndex:-1}});
			next(true);
		}
	}

	/* animationScene */
	function animationScene(animation) {
		console.log(animation);
		animation.restart();
	}

	/* time layer */
	function timeLayerAnimation(scene) {
		if( _isAnimating ) {
			console.log("moving.... cancel timeLayerAnimation");
			return;
		}

		var now = scene.timeLayer.target + " .now";
		var nowTxt = scene.timeLayer.target + " .now-txt";

		/* scene : time layer */
		var timeAnimation = new TimelineMax({onStart:startAnimation, onComplete:finishAnimation, onCompleteParams:["T"]})
			.set('.time-layer', {css: {zIndex:2000}})
			.to('.time-layer', 0.5, {delay: 0, opacity: 1})
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
		console.log("has timeLayer : " + scene.hasOwnProperty('timeLayer'));

		if( !afterTimeLaer && scene.hasOwnProperty('timeLayer') ) {
			console.log("[next] if timeLayer - _isAnimating : " + _isAnimating);
			timeLayerAnimation(scene);
		} else {
			if( scene.scroll == "auto" ) {
				_isAnimating = true;


				var index = _currentScene-1 < 0 ? 1 : _currentScene;
				var fix01 = 0;
				if( _currentScene > 4 ) {
					index = _currentScene - 1;
					fix01 = 4230;
				}
				var calcposy = index * _viewHeight + fix01;
				TweenMax.to(window, 1.2, {scrollTo:{y:calcposy}, ease:Quad.easeInOut, onComplete: function() {
					_isAnimating = false;
					console.log("auto plus before " + _currentScene);
					_currentScene++;
					console.log("auto plus " + _currentScene);
				}});

/*
				TweenMax.to(window, 1.2, {scrollTo:{y:Math.round($(window).scrollTop() / _viewHeight)*_viewHeight+(_viewHeight)}, ease:Quad.easeInOut, onComplete: function() {
					_isAnimating = false;
					console.log("auto plus before " + _currentScene);
					_currentScene++;
					console.log("auto plus " + _currentScene);
				}});
*/
			} else if( scene.scroll == "direct" ) {
				_isAnimating = true;
				animationScene(nextScene.animation);
				console.log("direct plus before " + _currentScene);
				_currentScene++;
				console.log("direct plus " + _currentScene);
			}
		}
	}

	/* prev Scene */
	function prev() {
		if( _isAnimating ) {
			console.log("moving.... cancel prev()");
			return;
		}

		var scene = sceneData[_currentScene];
		
		var prevScene = sceneData[_currentScene-1];
		if( _currentScene === 2 ) {
			prevScene = sceneData[_currentScene-2];
		}
		if( prevScene === undefined ) return;


		var index = _currentScene < 3 ? 0 : _currentScene-1;
		var fix01 = 0;
		if( _currentScene > 4 ) {
			index = _currentScene - 1;
			fix01 = 4230;
		}
		var calcposy = index * _viewHeight + fix01;


		TweenMax.to(window, 1.2, {onStart: function() {
			_isAnimating = true;
		}, scrollTo:{y:calcposy}, ease:Quad.easeInOut, onComplete: function() {
			_isAnimating = false;
			if( _currentScene === 2 ) {
				_currentScene = _currentScene - 2;
			} else {
				console.log("prev complete minus before " + _currentScene);
				_currentScene = _currentScene - 1;
				console.log("prev complete minus " + _currentScene);
			}
			console.log("prev complete : " + _currentScene);
		}});
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





/* SCENE05 - Launch */
var Launch = (function ($) {
	var scope,
		$btnsMore,
		init = function () {
			$btnsMore = $(".scene.launch .btn-more");

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
	}

	function initEvent() {
		$btnsMore.on('mouseenter', function(e) {
			TweenMax.to($(this), 0.3, {scale: 1.3, ease: Back.easeInOut});
		});

		$btnsMore.on('mouseleave', function(e) {
			TweenMax.to($(this), 0.3, {scale: 1, ease: Back.easeInOut});
		});
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));




/* SCENE05 - Path animation */
var Path = (function ($) {
	var scope,
		$traceSVG,
		$restaurantSVG,
		init = function () {
			$traceSVG = $("#tracesvg");
			$restaurantSVG = $("#restaurantsvg");

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
		$traceSVG.find('path').each(function() {
			pathPrepare($(this));
		});
		$restaurantSVG.find('path').each(function() {
			pathPrepare($(this));
		});
	}

	function initEvent() {
	}

	function pathPrepare($el) {
		var lineLength = $el[0].getTotalLength();
		$el.css("stroke-dasharray", lineLength);
		$el.css("stroke-dashoffset", lineLength);
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));



/* SCENE06 - Market */
var Market = (function ($) {
	var scope,
		$marketContainer,
		$slider,
		_options,
		init = function () {
			$marketContainer = $('.scene.market');
			$slider = $marketContainer.find('.slick-slider');

			_options = {
				dots: false,
				arrows: false,
				infinite: true,
				draggable: false,
				speed: 1000,
				autoplay: true,
				autoplaySpeed: 3000,
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1
			};

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
	}

	function initEvent() {
	}

	function bgRolling() {
		$slider.slick(_options);
	}

	return {
		init: function () {
			scope = this;

			init();
		},
		rolling : function() {
			bgRolling();
		}
	};
}(jQuery));


