/* Author: Ben Collins

*/
var first=0, tenon=0, tentwoon=0, tenthreeon=0, i=0;

function scroll() {
	
	
}

function flashOn (object) {
	object.stop().animate({"color":"white"},100,function() { 
											object.animate({"color":"#333333"}, 500);
											 });
}
function flashOff (object) {
	object.stop().animate({"color":"#D6D4BB"},600);
}

function parallax(object){
	
	$.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;
	
	$parallax_container = $('#parallax_container');
	var $window = $(window); 
	
	
	var scroll_ok = true;
	setInterval(function () {
		scroll_ok = true;
	}, 33);//33ms is 30fps, you can try changing this to something larger for better performance
	$(window).bind('scroll', function () {
		first++;
		if (scroll_ok === true) {
			
			//Fill first infographic
			if ($window.scrollTop() > 800) {
				$("div#percentofworld_inner").css("top","189px");	
				$("div.clicktoreveal a").html("");	
				$("div#percentofworld #text").show(900);
			}
			else {
				$("div#percentofworld_inner").css("top","283px");
				$("div.clicktoreveal a").html("Click here or scroll down to reveal answer");
				$("div#percentofworld #text").hide(900);
			}
			
			
			//Change first 10%
			var ten = $("div#tenpct .ten, div#tenpct .pct"), tentwo = $("div#tenpcttwo .ten, div#tenpcttwo .pct"), tenthree = $("div#tenpctthree .ten, div#tenpctthree .pct");
			
			if ($window.scrollTop() > 1200) {
				if (tenon == 0) {
					flashOn(ten);
					tenon = 1;
				}
			}
			else {
				if (tenon != 0) {
					flashOff(ten);
					tenon = 0;
				}
			}
			
			if ($window.scrollTop() > 1400) {
				if (tentwoon == 0) {
					flashOn(tentwo);
					tentwoon = 1;
				}
			}
			else {
				if (tentwoon != 0) {
					flashOff(tentwo);
					tentwoon = 0;
				}
			}
			
			if ($window.scrollTop() > 1600) {
				if (tenthreeon == 0) {
					flashOn(tenthree);
					tenthreeon = 1;
				}
			}
			else {
				if (tenthreeon != 0) {
					flashOff(tenthree);
					tenthreeon = 0;
				}
			}
			
			scroll_ok = false;			
			var l = object.length;
			var topOffset;
			for (i=0;i<l; i++) {  
				var self = object[i], newstyle;
				var yPos = -($window.scrollTop() / self.data('speed')); 
				if (self.data('offsetY')) {
					yPos += self.data('offsetY');
				}
				if (self.data('type') == "background") {
					var offsetCoords = self.offset(),
						coords = '50% '+ yPos + 'px';
						topOffset = offsetCoords.top;
						newstyle = { backgroundPosition: coords };	
				}
				
				if (self.data('type') == "cloud" ) {
					if (self.data('offsetY') > 0) topOffset = self.data('offsetY'); 
					else if (self.data('fromTop') > 0) topOffset = self.data('fromTop');
					else topOffset = 0;
					coords = yPos + 'px';
					newstyle = { "top": coords };
				}
				var negAdjust = 0;
				if (self.data('speed') < 0 ) {
					negAdjust = $window.scrollTop()/self.data('speed');	
				}
				if ( (($window.scrollTop() + $window.height()) > (topOffset) && ( ((topOffset + (self.height() - negAdjust))*self.data("speed")) > $window.scrollTop() ) ) || (self.attr("id") == "right") || (first==1) ) {
					self.css(newstyle);
				}
				console.log($window.scrollTop());
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
	
	if(isMobile.any()/*(navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))*/) {
		 //Using an iPhone
		 var iphonestuff = $("#right, header");
		 $(iphonestuff).css({'background-attachment': 'scroll', 'position': 'relative'});
		 $("header h2").css('display', 'none');
		 $("#right").css("top","10px");
	}
	else {
		parallax(parallax_array);
	}

	
	$(window).trigger("scroll");
	first++;
});