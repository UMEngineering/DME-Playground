var first=0;

function parallax(object){
		
	$.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;
	
	$parallax_container = $('#container');
	var $window = $(window); 
	
	var scroll_ok = true;
	setInterval(function () {
		scroll_ok = true;
	}, 33);//33ms is 30fps, you can try changing this to something larger for better performance
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
				// For SVG
				//change(self.data("id"), 0, self.data("offsetY"));
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


function change(id, x, y){
	document.getElementById(id).setAttribute("x", parseInt(document.getElementById(id).getAttribute("x"))+x);
	document.getElementById(id).setAttribute("y", parseInt(document.getElementById(id).getAttribute("y"))+y);
}

$(document).ready(function(){
	/*
	var container = document.getElementById("one");
	var mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	mySvg.setAttribute("version", "1.1");
	container.appendChild(mySvg);
	
	var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
	filter.setAttribute("id","f1");
	
	var feImg1 = document.createElementNS("http://www.w3.org/2000/svg", "feImage");
	feImg1.setAttribute("y",0);
	feImg1.setAttribute("x",0);
	feImg1.setAttribute("data-offsetY", 50);
	feImg1.setAttribute("result","raster1");
	feImg1.setAttribute("id", "feImg1");
	feImg1.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','img/one.png');
	
	var feImg2 = document.createElementNS("http://www.w3.org/2000/svg", "feImage");
	feImg2.setAttribute("y",0);
	feImg2.setAttribute("x",0);
	feImg2.setAttribute("data-offsetY", 1);
	feImg2.setAttribute("result","raster2");
	feImg2.setAttribute("id", "feImg2");
	feImg2.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','img/two.png');
	
	var feBlend = document.createElementNS("http://www.w3.org/2000/svg", "feBlend");
	feBlend.setAttribute("mode","screen");
	feBlend.setAttribute("in","raster1");
	feBlend.setAttribute("in2","raster2");
	
	var g = document.createElementNS("http://www.w3.org/2000/svg","g");
	var rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
	rect.setAttribute("x","0");
	rect.setAttribute("y","0");
	rect.setAttribute("width","100%");
	rect.setAttribute("height","100%");
	rect.setAttribute("filter","url(#f1)");
	
	
	g.appendChild(rect);
	filter.appendChild(feImg1); filter.appendChild(feImg2);  filter.appendChild(feBlend); 
	mySvg.appendChild(filter);  
	mySvg.appendChild(g);
*/

// =================================
	var parallax_array = Array();
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('x'));
		$(this).data('speed', $(this).attr('data-speed'));
		$(this).data('type', $(this).attr('data-type'));
		$(this).data('fromTop', $(this).attr('data-fromTop'));
		
		parallax_array.push($(this));
		
	});
	/*$('feImage').each(function() {	
		$(this).data('offsetY', parseInt(this.getAttribute("data-offsetY")));
		$(this).data('Xposition', this.getAttribute("x"));
		$(this).data('id', this.getAttribute("id"));
		$(this).data('speed', this.getAttribute('data-offsetY'));
		$(this).data('type', "cloud");
		$(this).data('fromTop', $(this).attr('data-fromTop'));
		
		parallax_array.push($(this));
		
	});*/
	console.log("Pararray:", parallax_array);
	parallax(parallax_array);
	$(window).trigger("scroll");
	first++;

});  
