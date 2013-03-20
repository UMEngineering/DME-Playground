var viewable = 1;
var prev_viewable = 0;
$(document).ready(function(e) {
	var curr_y = $(document).scrollTop();
	var height = $(document).height();
	var $sticky_title = $(".sticky li.sticky-title");
	$sticky_title.text($("div#section-" + viewable + " h1").text());
	$(".stage-a").css({"background" : "none", "color" : "#b2b2b2"});
	$(".stage-" + viewable).css({"background" : "rgba(80,80,80,0.62)", "color" : "white"});
	
	// Scroll listener
    $(document).scroll(function(e) {
		// Calculate and change the current progress (max 100.0, min 0.00, for percentage in #progressBar)
		curr_y = $(document).scrollTop();
        var progress = 100.0 * curr_y / (height);
		$("div#progressBar").css({"width" : progress + "%"});
		
		// Check which section is viewable
		for (var i=1; i<=5; i++){
			if (checkView("section#section-" + i)) {
				prev_viewable = viewable;
				viewable = i;
				break;
			}
		}
		
		// Change varies values and style in sticky
		if (prev_viewable != viewable) {
			$sticky_title.text($("section#section-" + viewable + " h1").text());
			$(".stage-a").css({"background" : "none", "color" : "#b2b2b2"});
			$(".stage-" + viewable).css({"background" : "rgba(80,80,80,0.62)", "color" : "white"});
			window.location.hash = "#section-" + viewable;
		}
    });
	
	// Resize the youtube video
	/*$(function() {
		// Find all YouTube videos
		var $allVideos = $("iframe[src^='http://www.youtube.com']"),
			// The element that is fluid width
			$fluidEl = $("body");
	
		// Figure out and save aspect ratio for each video
		$allVideos.each(function() {
			$(this).data('aspectRatio', this.height / this.width)
				// and remove the hard coded width/height
				.removeAttr('height')
				.removeAttr('width');
		});
	
		// When the window is resized
		// (You'll probably want to debounce this)
		$(window).resize(function() {
			var newWidth = $fluidEl.width();
			// Resize all videos according to their own aspect ratio
			$allVideos.each(function() {
				var $el = $(this);
				var newHeight = newWidth * $el.data('aspectRatio');
				$el.width(newWidth).height(newWidth * $el.data('aspectRatio'));
				$("#top-video .video-cover").css({"height" : newHeight + "px"});
			});
		// Kick off one resize to fix all videos on page load
		}).resize();
	});*/
	
	
	
	
});

// Check if the element is fully visible
function checkView(elem) {
	var top = $(window).scrollTop();
	var bottom = top + $(window).height();
	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();
	/*console.log(top);
	console.log(elemTop);
	console.log(bottom);
	console.log(elemBottom);*/
	return ((top >= elemTop) && (bottom <= elemBottom));
}