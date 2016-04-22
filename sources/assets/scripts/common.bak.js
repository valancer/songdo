/* mobile check */
var isAndroid = (navigator.userAgent.indexOf("Android") > -1);
var isIOS = ((navigator.userAgent.indexOf("iPhone") > -1) || (navigator.userAgent.indexOf("iPad") > -1));

if (isAndroid || isIOS)	{
	location.href = '/songdo/m/';
}

// console 객체가 없을 경우
if (!window.console) {
	window.console = {
		log : function(){},
		dir : function(){}
	};
} else if (!window.console.dir){
	window.console.dir = function(){};
}

(function(){
	$(document).ready(function(){
		var agents = [/(opr|opera)/gim,/(chrome)/gim,/(firefox)/gim,/(safari)/gim,/(msie[\s]+[\d]+)/gim,/(trident).*rv:(\d+)/gim];
		var agent = navigator.userAgent.toLocaleLowerCase();
		for(var ag in agents){
			if(agent.match(agents[ag])){
				$(document.body).addClass(String(RegExp.$1+RegExp.$2).replace(/opr/,'opera').replace(/trident/,'msie').replace(/\s+/,''));
				break;
			}
		}
	});
})();



$(document).ready(function (e) {
	Navigation.init();
	Scene.init();
	Brand.init();
	ManualScroll.init();
	Path.init();
	RollingBG.init();
	Popup.init();
});


var isOpenPopup = false;
var controller = new ScrollMagic.Controller();
controller.scrollTo(function (newpos) {
	TweenMax.to(window, 1.2, {scrollTo: {y: newpos}});
});
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
			target: '.time02',
			bgColor: 'rgba(14, 29, 55, 0.8)'
		}
	},
	{
		id: '#brand',
		title: "Outlet Brand",
		animation: null,
		scroll: 'auto',
		timeAnimation: null,
		timeLayer: {
			target: '.time03',
			bgColor: 'rgba(16, 34, 68, 0.8)'
		}
	},
	{
		id: '#launch',
		title: "Launch",
		animation: null,
		scroll: 'launch',
		timeAnimation: null,
		timeLayer: {
			target: '.time04',
			bgColor: 'rgba(33, 20, 15, 0.8)'
		}
	},
	{
		id: '#market',
		title: "Premium Market",
		animation: null,
		scroll: 'auto',
		upScroll: 'launch',
		timeAnimation: null,
		timeLayer: {
			target: '.time05',
			bgColor: 'rgba(42, 33, 21, 0.8)'
		}
	},
	{
		id: '#exzone',
		title: "Experience Zone",
		animation: null,
		scroll: 'exzone',
		timeAnimation: null,
		timeLayer: {
			target: '.time06',
			bgColor: 'rgba(15, 33, 33, 0.8)'
		}
	},
	{
		id: '#garden',
		title: "Garden Terrace",
		animation: null,
		scroll: 'auto',
		upScroll: 'exzone',
		timeAnimation: null,
		timeLayer: {
			target: '.time07',
			bgColor: 'rgba(45, 33, 28, 0.8)'
		}
	},
	{
		id: '#ending',
		title: "Ending",
		animation: null,
		scroll: 'none',
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
		$txtMenu,
		$listIndicators,
		$btnHome,
		_lastSelected,
		init = function () {
			$dimmed = $('.dimmed');
			$navigationContainer = $('.menus');
			$btnToggleMenu = $navigationContainer.find('.btn-toggle-menu');
			$txtMenu = $navigationContainer.find('.txt-menu');
			$openMenus = $navigationContainer.find('.open-menus');
			$menusContainer = $openMenus.find('.list-menus');
			$listIndicators = $navigationContainer.find('.list-indicators');
			$anchors = $listIndicators.find('a');
			$btnHome = $menusContainer.find('.btn-home');

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
		TweenMax.set($openMenus, {autoAlpha:0});
		TweenMax.set($dimmed, {autoAlpha:0});

		_lastSelected = '';
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
				TweenMax.to($dimmed, 0.3, {autoAlpha: 1} );
				TweenMax.to($txtMenu, 0.3, {autoAlpha: 0} );
				TweenMax.set($navigationContainer, {css: {zIndex:3000}});
			} else {
				TweenMax.to($navigationContainer, 0.3, {width: 50} );
				TweenMax.to($openMenus, 0.3, {autoAlpha: 0} );
				TweenMax.to($listIndicators, 0.3, {autoAlpha: 1} );
				TweenMax.to($dimmed, 0.3, {autoAlpha: 0} );
				TweenMax.to($txtMenu, 0.3, {autoAlpha: 1} );
				TweenMax.set($navigationContainer, {css: {zIndex:900}});
			}

		});

		/* */
		$menusContainer.on('click', function(e) {
			$btnToggleMenu.trigger('click');
		});

		/* home click */
		$btnHome.on('click', function(e) {
			e.preventDefault();

			var target = $(this).attr('href');
			_updateAnchor(target);
			Scene.updateCurrentScene(target);
			controller.scrollTo(target);
		});

		/* menu click */
		$anchors.on('click', function(e) {
			e.preventDefault();

			var target = $(this).attr('href');
			_updateAnchor(target);
			Scene.updateCurrentScene(target);
			controller.scrollTo(target);
		});
	}

	function _updateAnchor(target) {
		$('.list-indicators [href="' + _lastSelected + '"]').closest('li').removeClass('is-selected');

		$selected = $('.list-indicators [href="' + target + '"]');
		$selected.closest('li').addClass("is-selected");

		_lastSelected = target;
	}

	return {
		init: function () {
			scope = this;

			init();
		},
		updateAnchor: function(target) {
			_updateAnchor(target);
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
		var homeAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[0]})
			.from('.scene.home .moon', 0.5, {delay: 1, opacity: 0, y: -30})
			.from('.scene.home .title', 0.5, {opacity: 0, y: 30})
			.from('.scene.home .description', 0.5, {opacity: 0, y: 30})
			.from('.scene.home .wally', 0.5, {opacity: 0, y: 30})
			.add([
				TweenMax.from('.scene.home .wally', 1, {y: 10, ease: Quad.easeInOut, repeat: -1, yoyo: true}),
				TweenMax.from('.scene.home .btn-start', 0.5, {opacity: 0, y: -30, onComplete:finishAnimation, onCompleteParams:[0]})
			]);
		sceneData[0].animation = homeAnimation;



		/* scene : after home */
		var afterHomeAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[1], onComplete:finishAnimation, onCompleteParams:[1]})
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
				TweenMax.to('.scene.home .day-building', 2, {delay: 4, y: "-115%"}),
				TweenMax.to('.scene.home .outlet', 3, {delay: 3, y: "-100%"}),
				TweenMax.to('.scene.home', 6, {})
			])
			.set('.time-layer', {css: {zIndex:2000}})
			.set('.time-layer', {backgroundColor: 'rgba(43, 49, 110, 0.8)'})
			.to('.time-layer', 0.5, {delay: 1.5, opacity: 1})
			.add([
				TweenMax.fromTo('.time01 .now', 0.3, {y: 30}, {opacity: 1, y: 0}),
				TweenMax.fromTo('.time01 .now-txt', 0.3, {y: 30}, {delay: 0.2, opacity: 1, y:0})
			])
			.to('.time-layer', 0.5, {delay: 1.5, opacity: 0})
			.add([
				TweenMax.to('.time01 .now', 0.1, {opacity: 0}),
				TweenMax.to('.time01 .now-txt', 0.1, {opacity: 0})
			])
			.set('.time-layer', {css: {zIndex:-1}});
		sceneData[1].animation = afterHomeAnimation;



		/* scene : arrived outlet */
		var arrivedAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[2], onComplete:finishAnimation, onCompleteParams:[2]})
			.add([
				TweenMax.from('.scene.arrived .title-time', 0.5, {delay: 0.5, opacity: 0}),
				TweenMax.from('.scene.arrived .btn-location', 0.5, {delay: 0.5, opacity: 0})
			])
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
		var brandAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[3]})
			.set('.scene.brand .btn', {display: "none"})
			.from('.scene.brand .title-time', 0.5, {delay: 1.2, opacity: 0})
			.set('.scene.brand .btn.luxury', {display: "block"})
			.from('.scene.brand .btn.luxury', 0.3, {delay: 0, opacity: 0, y: -30})
			.set('.scene.brand .btn.sport-factory', {display: "block"})
			.from('.scene.brand .btn.sport-factory', 0.3, {delay: 0, opacity: 0, y: 30})
			.set('.scene.brand .btn.fashion', {display: "block"})
			.from('.scene.brand .btn.fashion', 0.3, {delay: 0, opacity: 0, y: -30})
			.set('.scene.brand .btn.handsome', {display: "block"})
			.from('.scene.brand .btn.handsome', 0.3, {delay: 0, opacity: 0, y: 30, onComplete:finishAnimation, onCompleteParams:[3]})
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




		/* scene : ex zone */
		var exAnimation = new TimelineMax({delay:0})
			.to('#dashsvg path#e1', 20, {strokeDashoffset: 0, ease:Linear.easeNone});
		sceneExzone = new ScrollMagic.Scene({
			triggerElement: ".scene.exzone",
			duration: "3424px",
			offset: 800
		})
		.setTween(exAnimation)
		.addTo(controller);



		/* scene : garden terrace */
		var parassolAnimation = new TimelineMax({})
			.add([
				TweenMax.from('.scene.garden .parassol01', 1.3, {x:-470, y:576, rotation:-45, ease:Power1.easeInOut}),
				TweenMax.from('.scene.garden .parassol02', 1.3, {x:-470, y:433, rotation:-45, ease:Power1.easeInOut})
			]);
		var sceneParassol = new ScrollMagic.Scene({
			triggerElement: ".scene.garden",
			triggerHook: 'onEnter',
			duration: "100%"
		})
		.setTween(parassolAnimation)
		.addTo(controller);

		var gardenAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[7], onComplete:finishAnimation, onCompleteParams:[7]})
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
		sceneData[7].animation = gardenAnimation;



		/* scene : ending */
		var endingAnimation = new TimelineMax({paused: true, onStart:startAnimation, onStartParams:[8], onComplete:finishAnimation, onCompleteParams:[8]})
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
		sceneData[8].animation = endingAnimation;


		// start
		sceneData[_currentScene].animation.restart();
		Navigation.updateAnchor(sceneData[_currentScene].id);
	}






	function initEvent() {
		/* home - start */
		$('.scene.home .btn-start').on('click', function(e) {
			e.preventDefault();
			next();
		});


		/* wheel event */
		var lethargy = new Lethargy();
		$(window).bind('mousewheel DOMMouseScroll wheel MozMousePixelScroll',function(e, delta){
			if( !isOpenPopup ) {
				var scene = sceneData[_currentScene];

				var launchTop = $('#launch').offset().top;
				var launchHeight = $('#launch').height();

				var exzoneTop = $('#exzone').offset().top;
				var exzoneHeight = $('#exzone').height();

				var windowTop = $(window).scrollTop();


				results = lethargy.check(e);
				if( launchTop <= windowTop && windowTop < launchTop+launchHeight ) {
					// 런치
					if( windowTop < launchTop+(_viewHeight*0.9) ) {
						// console.log("런치 top");
						if( delta !== undefined ) {
							if( delta > 0 ) {
								prev();
							}
						}
					} else if( windowTop > launchTop+launchHeight-(_viewHeight*0.95) ) {
						// console.log("런치 bottom");
						if( delta !== undefined ) {
							e.preventDefault();
							e.stopPropagation();
							if( delta < 0 ) {
								next();
							}
						}
					}

				
				} else if( exzoneTop <= windowTop && windowTop < exzoneTop+exzoneHeight ) {
					// 체험존
					if( windowTop < exzoneTop+(_viewHeight*0.9) ) {
						// console.log("체험존 top");
						if( delta !== undefined ) {
							if( delta > 0 ) {
								prev();
							}
						}
					} else if( windowTop > exzoneTop+exzoneHeight-(_viewHeight*0.95) ) {
						// console.log("체험존 bottom");
						if( delta !== undefined ) {
							e.preventDefault();
							e.stopPropagation();
							if( delta < 0 ) {
								next();
							}
						}
					}
				} else {
					e.preventDefault();
					e.stopPropagation();
/*
					if( delta !== undefined ) {
						if( delta > 0 ) {
							prev();
						} else {
							next();
						}
					}
*/
					if( results !== false ) {
						if( results < 0 ) {
							next();
						} else {
							prev();
						}
					}

				}

			}
		});


		$(window).bind('resize', function(){
			_viewHeight = $(window).height();
			controller.update(true);

			controller.scrollTo(sceneData[_currentScene].id);
		});


		$(window).on('beforeunload', function() {
			$(window).scrollTop(0);

		});

	}





	/* time layer */
	function timeLayerAnimation(scene) {
		var now = scene.timeLayer.target + " .now";
		var nowTxt = scene.timeLayer.target + " .now-txt";
		var bgc = scene.timeLayer.bgColor;

		/* scene : time layer */
		var timeAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["T"], onComplete:finishAnimation, onCompleteParams:["T"]})
			.set('.time-layer', {css: {zIndex:2000}})
			.set('.time-layer', {backgroundColor: bgc})
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


		if( fromValue != 5 ) {
			RollingBG.stopMarket();
		}

		if( fromValue != 7 ) {
			RollingBG.stopGarden();
		}

		// scene - home
		if( fromValue === 0 ) {
			Navigation.updateAnchor(sceneData[0].id);
		}

		// scene - arrived outlet
		if( fromValue == 2 ) {
			sceneData[1].animation.pause(0, true);
			Navigation.updateAnchor(sceneData[2].id);
		}

		// scene - brand
		if( fromValue == 3 ) {
			sceneData[2].animation.pause(0, true);
			Navigation.updateAnchor(sceneData[3].id);
		}

		// scene - launch
		if( fromValue == 4 ) {
			sceneData[3].animation.pause(0, true);
			Navigation.updateAnchor(sceneData[4].id);
		}

		// scene - market rolling bg
		if( fromValue == 5 ) {
			Navigation.updateAnchor(sceneData[5].id);
		}

		// scene - ex zone
		if( fromValue == 6 ) {
			sceneData[5].animation.pause(0, true);
			Navigation.updateAnchor(sceneData[6].id);
		}

		// scene - garden rolling bg
		if( fromValue == 7 ) {
			Navigation.updateAnchor(sceneData[7].id);
		}

		// scene - end
		if( fromValue == 8 ) {
			sceneData[7].animation.pause(0, true);
			Navigation.updateAnchor(sceneData[8].id);
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
		if( fromValue == 2 ) {
			sceneData[1].animation.pause(0, true);
			TweenMax.set('.scene.home .moon', {opacity: 0, y: -99999});
			TweenMax.set('.scene.home .title', {opacity: 0, y: -99999});
			TweenMax.set('.scene.home .description', {opacity: 0, y: -99999});
			TweenMax.set('.scene.home .wally', {opacity: 0, y: -99999});
			TweenMax.set('.scene.home .btn-start', {opacity: 0, y: -99999});
		}

		// scene - brand
		if( fromValue == 3 ) {
			sceneData[2].animation.pause(0, true);
		}

		// scene - ex zone
		if( fromValue == 4 ) {
			sceneData[3].animation.pause(0, true);
		}

		// scene - market rolling bg
		if( fromValue == 5 ) {
			RollingBG.rollingMarket();
		}

		// scene - ex zone
		if( fromValue == 6 ) {
			sceneData[5].animation.pause(0, true);
		}

		// scene - garden rolling bg
		if( fromValue == 7 ) {
			RollingBG.rollingGarden();
		}

		// scene - end
		if( fromValue == 8 ) {
			sceneData[7].animation.pause(0, true);
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
				var fix02 = 0;
				if( _currentScene > 4 ) {
					index = index - 1;
					fix01 = 4230;
				}
				if( _currentScene > 6 ) {
					index = index - 1;
					fix02 = 4230;
				}
				var calcposy = index * _viewHeight + fix01 + fix02;


				TweenMax.to(window, 1.2, {onStart: function() {
					console.log("[" + index + "] scroll position top : " + calcposy);
					_isAnimating = true;
					console.log("start Auto Scroll : " + _currentScene);
				}, scrollTo:{y:calcposy}, ease:Quad.easeInOut, onComplete: function() {

					console.log('finish Auto Scroll : ' + _currentScene);

					if( nextScene.animation === null ) {
						sceneData[_currentScene].animation.pause(0, true);
						Navigation.updateAnchor(sceneData[_currentScene+1].id);
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
				// launch
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


			} else if( scene.scroll == "exzone" ) {
				// exzone
				console.log("scene.scroll : exzone");

				var calcposy_exzone = 4 * _viewHeight + (4230*2);

				console.log("scroll position top : " + calcposy_exzone);

				_isAnimating = true;
				console.log("start exzone Scroll : " + _currentScene);
				TweenMax.to(window, 1.2, {scrollTo:{y:calcposy_exzone}, ease:Quad.easeInOut, onComplete: function() {

					console.log('finish exzone Scroll : ' + _currentScene);
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
		var fix02 = 0;
		if( _currentScene >= 6 ) {
			index--;
			fix01 = 4230;
		}
		if( _currentScene >= 8 ) {
			index--;
			fix02 = 4230;
		}
		var calcposy = index * _viewHeight + fix01 + fix02;


		if( scene.upScroll == "launch" ) {
			console.log("scene.upScroll : launch");
			calcposy = parseInt(2*_viewHeight) + 4230 - 100;
		}
			
		if( scene.upScroll == "exzone" ) {
			console.log("scene.upScroll : exzone");
			calcposy = parseInt(3*_viewHeight) + (4230*2) - 100;
		}
			
		TweenMax.to(window, 1.2, {onStart: function() {
			console.log('index : ' + index + ", calcposy : " + calcposy);
			// _isAnimating = true;
		}, scrollTo:{y:calcposy}, ease:Quad.easeInOut, onComplete: function() {
			if( scene.upScroll == "launch" ) {
				Navigation.updateAnchor(sceneData[4].id);
			}

			if( scene.upScroll == "exzone" ) {
				Navigation.updateAnchor(sceneData[6].id);
			}

			if( prevScene.animation === null ) {
				// _isAnimating = false;
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


	function _updateCurrentScene(uid) {
		var current = null;

		if( sceneData[_currentScene] !== null && sceneData[_currentScene].hasOwnProperty("animation") && sceneData[_currentScene].animation !== null ) {
			sceneData[_currentScene].animation.pause(0, true);
		}

		for( var i=0; i<sceneData.length; i++ ) {
			var scene = sceneData[i];
			if( scene.id == uid ) {
				current = scene;
				_currentScene = i;
			}
		}

		console.log("[_updateCurrentScene] : " + current);
		if( current !== null && current.hasOwnProperty("animation") && current.animation !== null ) {
			animationScene(current.animation);
		}
	}

	function _moveCurrentScene() {
		controller.scrollTo(sceneData[_currentScene].id);
	}

	return {
		init: function () {
			scope = this;

			init();
		},
		getIsAnimating: function() {
			return _isAnimating;
		},
		updateCurrentScene: function(uid) {
			_updateCurrentScene(uid);
		},
		moveCurrentScene: function() {
			_moveCurrentScene();
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
			if( Scene.getIsAnimating() ) return;
			TweenMax.to('.scene.brand .btn > span', 0.5, {delay: 0.5, opacity: 1});
		});


		/* menus */
		$btns.on('mouseenter', function(e) {
			if( Scene.getIsAnimating() ) return;

			var $targetBG = $($(this).data('target'));
			TweenMax.to($targetBG, 0.5, {opacity: 1});
			TweenMax.to('.scene.brand .btn > span', 0.5, {opacity: 0});
		});

		$btns.on('mouseleave', function(e) {
			if( Scene.getIsAnimating() ) return;

			var $targetBG = $($(this).data('target'));
			TweenMax.to($targetBG, 0.5, {delay: 0.5, opacity: 0});
		});
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));





/* SCENE05,06 - Launch, ExZone */
var ManualScroll = (function ($) {
	var scope,
		$btnsMore,
		init = function () {
			$btnsLaunch = $(".scene.launch .btn-more");
			$btnsExZone = $(".scene.exzone .btn-more");

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
	}

	function initEvent() {
		$btnsLaunch.on('mouseenter', function(e) {
			TweenMax.to($(this), 0.3, {scale: 1.3, ease: Back.easeInOut});
		});

		$btnsLaunch.on('mouseleave', function(e) {
			TweenMax.to($(this), 0.3, {scale: 1, ease: Back.easeInOut});
		});

		$btnsExZone.on('mouseenter', function(e) {
			TweenMax.to($(this), 0.3, {scale: 1.3, ease: Back.easeInOut});
		});

		$btnsExZone.on('mouseleave', function(e) {
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
			$exzoneSVG = $("#dashsvg");

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
		$traceSVG.find('path').each(function() {
			pathPrepare($(this));
		});
		$exzoneSVG.find('path').each(function() {
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
var RollingBG = (function ($) {
	var scope,
		$marketContainer,
		$marketSlider,
		$gardenContainer,
		$gardenSlider,
		_options,
		init = function () {
			$marketContainer = $('.scene.market');
			$marketSlider = $marketContainer.find('.slick-slider');
			$gardenContainer = $('.scene.garden');
			$gardenSlider = $gardenContainer.find('.slick-slider');

			_options = {
				dots: false,
				arrows: false,
				infinite: true,
				draggable: false,
				speed: 1000,
				autoplay: false,
				autoplaySpeed: 3000,
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				cssEase: 'linear'
			};

			initLayout();
			initEvent();
		};//end init

	function initLayout() {
		$marketSlider.slick(_options);
		$gardenSlider.slick(_options);
	}

	function initEvent() {
	}

	// market
	function rollingMarket() {
		$marketSlider.slick("slickPlay");
	}

	function stopMarket() {
		$marketSlider.slick("slickPause");
	}

	// garder
	function rollingGarden() {
		$gardenSlider.slick("slickPlay");
	}

	function stopGarden() {
		$gardenSlider.slick("slickPause");
	}

	return {
		init: function () {
			scope = this;

			init();
		},
		rollingMarket : function() {
			rollingMarket();
		},
		stopMarket : function() {
			stopMarket();
		},
		rollingGarden : function() {
			rollingGarden();
		},
		stopGarden : function() {
			stopGarden();
		}
	};
}(jQuery));






/* Popup */
var Popup = (function ($) {
	var scope,
		$popupContainer,
		$popupContent,
		$popups,
		$btnClose,
		init = function () {
			$popups = $('a.va-btn-popup');
			$btnClose = $('.popup .btn-close');
			$popupContainer = $('#popup');
			$popupContent = $popupContainer.find('.popup-contents');

			initLayout();
			initEvent();
		};//end init

	function initLayout() {

	}

	function initEvent() {
		if( $btnClose.length > 0 ) {
			$btnClose.on('click', function(e) {
				var target = $(this).data('target');
				$(target).hide();

				$popupContent.html('');
				isOpenPopup = false;
				$('body').removeClass('o-hidden');
			});
		}


		$popups.on('click', function(e) {
			e.preventDefault();

			isOpenPopup = true;
			$('body').addClass('o-hidden');

			$popupContent.html('<img src="' + $(this).attr('href') + '" alit=""/>');
			$popupContainer.toggle();
		});
	}

	return {
		init: function () {
			scope = this;

			init();
		}
	};
}(jQuery));

