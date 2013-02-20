/* Author: Ben Collins

*/
var first=0;

function scroll() {
	
	
}


function parallax(object){
	
	$.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;
	
	$parallax_container = $('#parallax_container');
	var $window = $(window); 
	
	
	var scroll_ok = true;
	setInterval(function () {
		scroll_ok = true;
	}, 15);//33ms is 30fps, you can try changing this to something larger for better performance
	$(window).bind('scroll', function () {
		first++;
		if (scroll_ok === true) {
			scroll_ok = false;
			if ($window.scrollTop() > 601) {
				$("#navContainer").addClass("fixed");	
			}
			else {
				$("#navContainer").removeClass("fixed");
			}
			
			
			var l = object.length;
			var topOffset;
			for (var i=0;i<l; i++) {  
				var self = object[i], newstyle;
				var yPos = -($window.scrollTop() / self.data('speed')); 
				
				if (self.data('offsetY')) {
					yPos += self.data('offsetY');
				}
				
				
				if (self.data('type') == "background") {
					var offsetCoords = self.offset(),
						topOffset = offsetCoords.top,
						coords = '50% '+ yPos + 'px';
						newstyle = { backgroundPosition: coords };	
				}
				
				if (self.data('type') == "cloud" ) {
					if (self.data('offsetY') > 0) var topOffset = self.data('offsetY'); 
					else if (self.data('fromTop') > 0) var topOffset = self.data('fromTop');
					else var topOffset = 0;
					var coords = yPos + 'px';
					

					newstyle = { "top": coords };
				}
				
				var negAdjust = 0;
				
				if (self.data('speed') < 0 ) {
					negAdjust = $window.scrollTop()/self.data('speed');	
				}
				if (self.attr("class")=="bldng") {
				//console.log("First:" , ($window.scrollTop() + $window.height()) > (topOffset));
				//console.log("Sec:" , ( (topOffset + (self.height() - negAdjust))));
				}
				if ( (($window.scrollTop() + $window.height()) > (topOffset) && ( ((topOffset + (self.height() - negAdjust))*self.data("speed")) > $window.scrollTop() ) ) || (self.attr("id") == "ground") || (first==1) ) {
					self.css(newstyle);
				}
			}  	
		}
	});
	
}



$(document).ready(function(){
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	
	if (!isMobile.any()){
		var width = $(window).width() - 20;
		$("body").toggleClass("mobile-browsing");
		$(".mobile-browsing footer").css({"position":"static"});
		$("body").css({"width": (width+20) + "px", "overflow-x":"hidden"});
		$(".bldng").toggleClass("bldng");
		$("#main-content").css({"width":(width) + "px", "margin":"0"});
		$("header").css({"width":(width) + "px", "margin":"0"});
		$("header h1").css({"width":width + "px", "height":(width / 10 - 2) + "px", "background-size":"100%", "margin-left":"10px"});
		$("header h2").css({"font-size":"20px", "text-align": "left", "padding-left":"20px"});
		$("header img").css({"width":(width) + "px"});
		
		$("p.intro").css({"width":(width) + "px", "padding-left": "10px"});
		$("div.box").css({"width":(width) + "px", "margin-left":"10px", "float":"none"});
		$("div.vidcontainer .vidfeature").css({"width":(width) + "px"});
		$("div.vidcontainer .vidfeature h2").css({"background-size":"100%"});
		$("#video1").css({"margin":"0", "padding":"150px 0"});
		$("#video1 iframe").attr({"width":width, "height":(315*width/560)});
		$("#video1 ").css({});
		$("#video1").css({});
		$("#video1").css({});
		$("#video1").css({});
		$("#video1").css({});
	} else {
		var parallax_array = Array();
		$('[data-type]').each(function() {	
			$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
			$(this).data('Xposition', $(this).attr('data-Xposition'));
			$(this).data('speed', $(this).attr('data-speed'));
			$(this).data('type', $(this).attr('data-type'));
			$(this).data('fromTop', $(this).attr('data-fromTop'));
			
			parallax_array.push($(this));
			
		});
		
		console.log("Pararray:", parallax_array);
		
		parallax(parallax_array);
		
		$(window).trigger("scroll");
		first++;
	}
});