var first=0;

function parallax(object){
		
	$.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;
	
	$parallax_container = $('#container');
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

});  
