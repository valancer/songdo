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
	Popup.init();
	ManualScroll.init();
	RollingBG.init();
});





var isOpenPopup = false;
var isBeforeAnimating = false;
var smartscroll;
var controller = new ScrollMagic.Controller();
controller.scrollTo(function (newpos) {
	TweenMax.to(window, 1.2, {scrollTo: {y: newpos}});
});
var sceneData = [
	{
		id: '#home',
		title: 'Home',
		animation: null
	},
	{
		id: '#after-home',
		title: "After Home",
		animation: null,
		timeAnimation: null
	},
	{
		id: '#arrived',
		title: "Arrvied Outlet",
		timeAnimation: null,
		timeLayer: {
			target: '.time02',
			bgColor: 'rgba(14, 29, 55, 0.8)'
		}
	},
	{
		id: '#brand',
		title: "Outlet Brand",
		timeAnimation: null,
		timeLayer: {
			target: '.time03',
			bgColor: 'rgba(16, 34, 68, 0.8)'
		}
	},
	{
		id: '#launch',
		title: "Launch",
		timeAnimation: null,
		timeLayer: {
			target: '.time04',
			bgColor: 'rgba(33, 20, 15, 0.8)'
		}
	},
	{
		id: '#market',
		title: "Premium Market",
		timeAnimation: null,
		timeLayer: {
			target: '.time05',
			bgColor: 'rgba(42, 33, 21, 0.8)'
		}
	},
	{
		id: '#exzone',
		title: "Experience Zone",
		timeAnimation: null,
		timeLayer: {
			target: '.time06',
			bgColor: 'rgba(15, 33, 33, 0.8)'
		}
	},
	{
		id: '#garden',
		title: "Garden Terrace",
		timeAnimation: null,
		timeLayer: {
			target: '.time07',
			bgColor: 'rgba(45, 33, 28, 0.8)'
		}
	},
	{
		id: '#ending',
		title: "Ending",
		scroll: 'none',
		animation: null,
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
			smartscroll.scrollToTarget(target);
		});

		/* menu click */
		$anchors.on('click', function(e) {
			e.preventDefault();

			var target = $(this).attr('href');
			_updateAnchor(target);
			smartscroll.scrollToTarget(target);
		});
	}

	function _updateAnchor(target) {
		target = target.replace("!", "");
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
		Path.init();
	}



	function initMotion() {
		/* scene : home */
		var homeAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["home"]})
			.from('.scene.home .moon', 0.5, {delay: 1, opacity: 0, y: -30})
			.from('.scene.home .title', 0.5, {opacity: 0, y: 30})
			.from('.scene.home .description', 0.5, {opacity: 0, y: 30})
			.from('.scene.home .wally', 0.5, {opacity: 0, y: 30})
			.add([
				TweenMax.from('.scene.home .wally', 1, {y: 10, ease: Quad.easeInOut, repeat: -1, yoyo: true}),
				TweenMax.from('.scene.home .btn-start', 0.5, {opacity: 0, y: -30, onComplete:finishAnimation, onCompleteParams:["home"]})
			]);
		var sceneHome = new ScrollMagic.Scene({
			triggerElement: ".scene.home",
			triggerHook: 'onLeave'
		})
		.setTween(homeAnimation)
		.addTo(controller);
		sceneData[0].animation = homeAnimation;


		/* scene : arrived outlet */
		var arrivedAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["arrived"], onComplete:finishAnimation, onCompleteParams:["arrived"]})
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


		/* scene : outlet brand */
		var brandAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["brand"]})
			.set('.scene.brand .btn', {display: "none"})
			.from('.scene.brand .title-time', 0.5, {delay: 1.2, opacity: 0})
			.set('.scene.brand .btn.luxury', {display: "block"})
			.from('.scene.brand .btn.luxury', 0.3, {delay: 0, opacity: 0, y: -30})
			.set('.scene.brand .btn.sport-factory', {display: "block"})
			.from('.scene.brand .btn.sport-factory', 0.3, {delay: 0, opacity: 0, y: 30})
			.set('.scene.brand .btn.fashion', {display: "block"})
			.from('.scene.brand .btn.fashion', 0.3, {delay: 0, opacity: 0, y: -30})
			.set('.scene.brand .btn.handsome', {display: "block"})
			.from('.scene.brand .btn.handsome', 0.3, {delay: 0, opacity: 0, y: 30, onComplete:finishAnimation, onCompleteParams:["brand"]})
			.from('.scene.brand .wilma', 0.5, {delay: 1, opacity: 0})
			.from('.scene.brand .wally', 0.5, {delay: 1, opacity: 0});

		var sceneBrand = new ScrollMagic.Scene({
			triggerElement: ".scene.brand",
			triggerHook: 'onLeave'
		})
		.setTween(brandAnimation)
		.addTo(controller);
	

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
		var marketAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["market"], onComplete:finishAnimation, onCompleteParams:["market"]})
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


		/* scene : ex zone */
		var exAnimation = new TimelineMax({delay:0})
			.to('#dashsvg path#e1', 20, {strokeDashoffset: 0, ease:Linear.easeNone});
		sceneExzone = new ScrollMagic.Scene({
			triggerElement: ".scene.exzone",
			// duration: "3424px",
			duration: "3024px",
			offset: 800
		})
		.setTween(exAnimation)
		.addTo(controller);



		/* scene : garden terrace */
		var parassolAnimation = new TimelineMax({})
			.add([
				TweenMax.from('.scene.garden .parassol01', 1.3, {x:-470, y:326, rotation:-45, ease:Power1.easeInOut}),
				TweenMax.from('.scene.garden .parassol02', 1.3, {x:-470, y:153, rotation:-45, ease:Power1.easeInOut})
			]);
		var sceneParassol = new ScrollMagic.Scene({
			triggerElement: ".scene.garden",
			triggerHook: 'onEnter',
			duration: "100%"
		})
		.setTween(parassolAnimation)
		.addTo(controller);

		var gardenAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["garden"], onComplete:finishAnimation, onCompleteParams:["garden"]})
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


		/* scene : ending */
		var endingAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["ending"], onComplete:finishAnimation, onCompleteParams:["ending"]})
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
	}



	function initEvent() {
		var ee = new EventEmitter();
		var scrollOptions = {
			mode: "set",
			autoHash: true,
			sectionScroll: true,
			initialScroll: true,
			keepHistory: false,
			sectionWrapperSelector: ".section-wrapper",
			sectionClass: "scene",
			sectionSelector: '.scene',
			animationSpeed: 1200,
		    headerHash: "home",
			hashContinuousUpdate: false,
			breakpoint: null,
			eventEmitter: ee,
			dynamicHeight: false
		};

		ee.addListener('scrollDonwBefore', scrollDownBeforeListener);
		ee.addListener('scrollStart', scrollStartListener);
		ee.addListener('scrollEnd', scrollEndListener);

		smartscroll = $.smartscroll(scrollOptions);	
		
		if( window.location.hash.length > 0 ) {
			Navigation.updateAnchor(smartscroll.getHash());
		} else {
			Navigation.updateAnchor("#!home");
		}

		/* home - start */
		$('.scene.home .btn-start').on('click', function(e) {
			e.preventDefault();
			afterHomeAnimation(function() {
				controller.scrollTo("#arrived");
			});
		});


		$(window).bind('resize', function(){
			_viewHeight = $(window).height();
			controller.update(true);

			controller.scrollTo(smartscroll.getHash());
			Navigation.updateAnchor(smartscroll.getHash());
		});

		$(window).scroll($.debounce( 250, function(){
			var windowTop = smartscroll.getWindowTop();
			var slideIndex = smartscroll.getSectionIndexAt(windowTop+1);
			var target = '#!' + $('.scene:nth-of-type(' + (slideIndex) + ')').data('hash');
			Navigation.updateAnchor(target);
			smartscroll.autoHash();
		}));

	}



	function scrollDownBeforeListener(slideNumber, callback) {
		if( isBeforeAnimating ) return;
		var index = slideNumber - 1;
		var scene = sceneData[index];

		if( index == 1 ) {
			isBeforeAnimating = true;
			afterHomeAnimation(function() {
				callback();
				isBeforeAnimating = false;
			});
		}

		if( scene.hasOwnProperty('timeLayer') ) {
			isBeforeAnimating = true;
			timeLayerAnimation(scene, function() {
				callback();
				isBeforeAnimating = false;
			});
		}
	}

	function scrollStartListener(slideNumber) {
		if( smartscroll.getHash() != "#!ending" ) {
			sceneData[8].animation.pause(0, true);
		}
	}

	function scrollEndListener() {
		if( sceneData[1].animation ) {
			sceneData[1].animation.pause(0, true);
		}
		Navigation.updateAnchor(smartscroll.getHash());

		if( smartscroll.getHash() != "#!home" ) {
			sceneData[0].animation.pause(0, true);
		}

		if( smartscroll.getHash() == "#!home" ) {
			sceneData[0].animation.restart();
		}
		if( smartscroll.getHash() == "#!ending" ) {
			sceneData[8].animation.restart();
		}
	}


	/* after home animation */
	function afterHomeAnimation(callback) {
		var afterHomeAnimation = new TimelineMax({onStart:function() {
		}, onComplete:function() {
			callback();
		}})
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
	}

	/* time layer */
	function timeLayerAnimation(scene, callback) {
		var now = scene.timeLayer.target + " .now";
		var nowTxt = scene.timeLayer.target + " .now-txt";
		var bgc = scene.timeLayer.bgColor;

		/* scene : time layer */
		var timeAnimation = new TimelineMax({onStart:startAnimation, onStartParams:["T"], onComplete:function () {
			callback();
		}})
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
			])
			.set('.time-layer', {css: {zIndex:-1}});
	}


	function startAnimation(fromValue) {
		console.log("startAnimation");
		if( fromValue == "market" ) {
			RollingBG.stopMarket();
		}
		if( fromValue == "garden" ) {
			RollingBG.stopGarden();
		}
	}

	function finishAnimation(fromValue) {
		console.log("finishAnimation");

		if( fromValue == "brand" ) {
			Brand.init();
		}

		if( fromValue == "market" ) {
			RollingBG.rollingMarket();
		}
		if( fromValue == "garden" ) {
			RollingBG.rollingGarden();
		}
	}


	return {
		init: function () {
			scope = this;

			init();
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
			TweenMax.to('.scene.brand .btn > span', 0.5, {opacity: 0});
		});

		$brandContainer.on('mouseleave', function(e) {
			TweenMax.to('.scene.brand .btn > span', 0.5, {delay: 0.5, opacity: 1});
		});


		/* menus */
		$btns.on('mouseenter', function(e) {
			var $targetBG = $($(this).data('target'));
			TweenMax.to($targetBG, 0.5, {opacity: 1});
			TweenMax.to('.scene.brand .btn > span', 0.5, {opacity: 0});
		});

		$btns.on('mouseleave', function(e) {
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

				$popupContainer.attr('class', 'popup');
				$popupContent.html('');
				isOpenPopup = false;
				smartscroll.bindScroll();
				$('body').removeClass('o-hidden');
			});
		}


		$popups.on('click', function(e) {
			e.preventDefault();

			isOpenPopup = true;
			$('body').addClass('o-hidden');

			smartscroll.unbindScroll();

			var hash = $(this).data('hash');
			$popupContainer.addClass(hash);
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

