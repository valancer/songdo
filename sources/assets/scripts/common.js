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
		scroll: 'launch',
		timeAnimation: null
	},
	{
		id: '#market',
		title: "Premium Market",
		animation: null,
		scroll: 'auto',
		upScroll: 'launch',
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

		_viewHeight,
		_sectionHeights,
		_sectionScrollTop,

		_timeArrivedAnimation,
		init = function () {
			_currentScene = 0;
			_isAnimating = false;


			initLayout();
			initMotion();
			initEvent();
		};//end init


	function initLayout() {
		_viewHeight = $(window).height();
	}



	function initMotion() {
		/* scene : home */
		var homeAnimation = new TimelineMax({onStart:startAnimation, onStartParams:[0]})
			.fromTo('.scene.home .moon', 0.5, {delay: 5, opacity: 0, y: -30}, {opacity: 1, y: 0})
			.fromTo('.scene.home .title', 0.5, {opacity: 0, y: 30}, {opacity: 1, y: 0})
			.fromTo('.scene.home .description', 0.5, {opacity: 0, y: 30}, {opacity: 1, y: 0})
			.fromTo('.scene.home .wally', 0.5, {opacity: 0, y: 30}, {opacity: 1, y: 0})
			.add([
				TweenMax.fromTo('.scene.home .wally', 1, {y: 0}, {y: 10, ease: Quad.easeInOut, repeat: -1, yoyo: true}),
				TweenMax.fromTo('.scene.home .btn-start', 0.5, {opacity: 0, y: -30}, {opacity: 1, y: 0, onComplete:finishAnimation, onCompleteParams:[0]})
			]);
		sceneData[0].animation = homeAnimation;



		/* scene : after home */
		var afterHomeAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[1], onComplete:finishAnimation, onCompleteParams:[1]})
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
		sceneData[1].animation = afterHomeAnimation;



		/* scene : arrived outlet */
		var arrivedAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[2], onComplete:finishAnimation, onCompleteParams:[2]})
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
		var brandAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[3], onComplete:finishAnimation, onCompleteParams:[3]})
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
			offset: 800
		})
		.setTween(traceAnimation)
		.addTo(controller);



		/* scene : premium market */
		var marketAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[5], onComplete:finishAnimation, onCompleteParams:[5]})
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
		var parassolAnimation = new TimelineMax({})
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

		var gardenAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[6], onComplete:finishAnimation, onCompleteParams:[6]})
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
		var endingAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[7], onComplete:finishAnimation, onCompleteParams:[7]})
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


		sceneData[0].animation.restart();
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

			var launchTop = $('#launch').offset().top;
			var launchHeight = $('#launch').height();
			var windowTop = $(window).scrollTop();


			if( launchTop-10 <= windowTop && windowTop < launchTop+launchHeight-_viewHeight ) {
				// 런치
			} else {
				e.preventDefault();
				e.stopPropagation();

				results = lethargy.check(e);
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



		$(window).bind('scroll', function(e) {
		});

	}





	/* time layer */
	function timeLayerAnimation(scene) {
		var now = scene.timeLayer.target + " .now";
		var nowTxt = scene.timeLayer.target + " .now-txt";

		/* scene : time layer */
		var timeAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["T"], onComplete:finishAnimation, onCompleteParams:["T"]})
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




	function startAnimation(fromValue) {
		console.log("fromValue : " + fromValue + ", _currentScene : " + _currentScene);
		if( fromValue == "T" ) {
			console.log('[start TimeLayer] : ' + _currentScene);
			_isAnimating = true;
		} else if( fromValue != _currentScene ) {
			console.log("not this screen");
			return;
		}

		_isAnimating = true;
		console.log('[startAnimation] : ' + _currentScene);


		if( fromValue == "M" ) {
			_currentScene = 5;
		}
	}

	function finishAnimation(fromValue) {
		console.log("fromValue : " + fromValue + ", _currentScene : " + _currentScene);

		if( fromValue == "T" ) {
			_isAnimating = false;

			TweenMax.set('.time-layer', {css: {zIndex:-1}});
			next(true);
			console.log('[finish Timelayer] : ' + _currentScene);
			return;
		} else if( fromValue != _currentScene ) {
			console.log("not this screen");
			return;
		}

		_isAnimating = false;
		console.log('[finishAnimation] : ' + _currentScene);

		// scene - after motion
		if( _currentScene == 1 ) {
			TweenMax.set('.time-layer', {css: {zIndex:-1}});
			next();
		}


		// scene - outlet
		if( fromValue == "AO" ) {
			sceneData[1].animation.pause(0, true);
			sceneData[1].animation.remove();
		}
	}

	/* animationScene */
	function animationScene(animation) {
		animation.restart();
	}




	/* next Scene */
	function next(afterTimeLayer) {
		if( _isAnimating ) {
			console.log("======== Cancel NEXT");
			return;
		}

		var scene = sceneData[_currentScene];
		var nextScene = sceneData[_currentScene+1];
		if( nextScene === undefined ) return;

		console.log('[next] currentScene [' + _currentScene + ']');
		console.log(scene);


		if( !afterTimeLayer && scene.hasOwnProperty('timeLayer') ) {
			console.log("afterTimeLayer : " + afterTimeLayer);
			timeLayerAnimation(scene);
		} else {
			if( scene.scroll == "auto" ) {
				console.log("scene.scroll : auto");


				var index = _currentScene-1 < 0 ? 1 : _currentScene;
				var fix01 = 0;
				if( _currentScene > 4 ) {
					index = _currentScene - 1;
					fix01 = 4230;
				}
				var calcposy = index * _viewHeight + fix01;

				console.log("scroll position top : " + calcposy);

				_isAnimating = true;
				console.log("start Auto Scroll : " + _currentScene);
				TweenMax.to(window, 1.2, {scrollTo:{y:calcposy}, ease:Quad.easeInOut, onComplete: function() {

					console.log('finish Auto Scroll : ' + _currentScene);

					if( nextScene.animation === null ) {
						_isAnimating = false;
					} else {
						animationScene(nextScene.animation);
					}
					_currentScene++;
				}});
			} else if( scene.scroll == "direct" ) {
				console.log("scene.scroll : direct");

				_isAnimating = true;
				animationScene(nextScene.animation);
				_currentScene++;

			} else if( scene.scroll == "launch" ) {
				console.log("scene.scroll : launch");

				var calcposy_launch = 3 * _viewHeight + 4230;

				console.log("scroll position top : " + calcposy_launch);

				_isAnimating = true;
				console.log("start Launch Scroll : " + _currentScene);
				TweenMax.to(window, 1.2, {scrollTo:{y:calcposy_launch}, ease:Quad.easeInOut, onComplete: function() {

					console.log('finish Launch Scroll : ' + _currentScene);

					if( nextScene.animation === null ) {
						_isAnimating = false;
					} else {
						animationScene(nextScene.animation);
					}
					_currentScene++;
				}});
			}
		}


	}

	/* prev Scene */
	function prev() {
		if( _isAnimating ) {
			console.log("======== Cancel PREV");
			return;
		}


		var scene = sceneData[_currentScene];
		
		var prevScene = sceneData[_currentScene-1];
		if( _currentScene === 2 ) {
			prevScene = sceneData[_currentScene-2];
		}
		if( prevScene === undefined ) return;


		var index = _currentScene <= 2 ? 0 : _currentScene-2;
		var fix01 = 0;
		if( _currentScene >= 6 ) {
			index--;
			fix01 = 4230;
		}
		var calcposy = index * _viewHeight + fix01;


		if( scene.upScroll == "launch" ) {
			console.log("scene.upScroll : launch");
			calcposy = parseInt(2*_viewHeight) + 4230 - 100;
		}
			
		console.log('index : ' + index + ", calcposy : " + calcposy);
		TweenMax.to(window, 1.2, {onStart: function() {
			_isAnimating = true;
		}, scrollTo:{y:calcposy}, ease:Quad.easeInOut, onComplete: function() {

			if( prevScene.animation === null ) {
				_isAnimating = false;
			} else {
				animationScene(prevScene.animation);
			}
			if( _currentScene === 2 ) {
				_currentScene = _currentScene - 2;
			} else {
				_currentScene = _currentScene - 1;
			}
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


