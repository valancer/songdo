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
	$('.step01 input[type=radio]').iCheck();

    var clipboard = new Clipboard('.btn-copy');
    clipboard.on('success', function(e) {
        console.log(e);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });
});
