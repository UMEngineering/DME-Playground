var viewable = 1;
var prev_viewable = 0;

var num=new Array("zero","one","two","three","four","five");

$(document).ready(function(e) {

	//First letter style

	$("div.container p:eq(0)").each(function() {
        var text = $(this).html();
        var first = $('<span>'+text.charAt(0)+'</span>').addClass('dropcap');
        $(this).html(text.substring(1)).prepend(first);
    });

	var curr_y = $(document).scrollTop();
	var height = $(document).height();
	var $sticky_title = $(".sticky li.sticky-title");
	var $window = $(window);
	var firstelemheight;
	$sticky_title.text($("section." + num[viewable] + " h1").text());
	$(".stage-a").css({"background" : "none", "color" : "#b2b2b2"});
	$(".stage-" + viewable).css({"background" : "rgba(80,80,80,0.62)", "color" : "white"});
	
	$(".video-cover").mouseenter(function(){
		$this = $(this);
		$this.children("h1, .vid-play").addClass("active");
	});

	$(".video-cover").mouseleave(function(){
		$this = $(this);
		$this.children("h1, .vid-play").removeClass("active");
	});
	
	// Bound the click behavior for stage-1 top nav, so click on that will go to the top of the page
	$("a.stage-1").click(function(e) {
        window.scrollTo(0, 0);
		$sticky_title.text($("section.one h1").text());
		$(".stage-a").css({"background" : "none", "color" : "#b2b2b2"});
		$(".stage-1").css({"background" : "rgba(80,80,80,0.62)", "color" : "white"});
		window.location.hash = "#" + $("section." + num[1]).attr("id");
    });

	// Scroll listener
    $(document).scroll(function(e) {
		// Calculate and change the current progress (max 100.0, min 0.00, for percentage in #progressBar)
		curr_y = $(document).scrollTop();
        var progress = 100.0 * curr_y / (height);
		$("div#progressBar").css({"width" : progress + "%"});
		
		// Check which section is viewable
		for (var i=1; i<=5; i++){
			if ($(window).scrollTop() == 0) {
				prev_viewable = viewable;
				viewable = 1;
				break;
			}
			if (checkView("section." + num[i])) {
				prev_viewable = viewable;
				viewable = i;
				break;
			}
		}
		
		// Change varies values and style in sticky
		if (prev_viewable != viewable) {
			$sticky_title.text($("section." + num[viewable] + " h1").text());
			$(".stage-a").css({"background" : "none", "color" : "#b2b2b2"});
			$(".stage-" + viewable).css({"background" : "rgba(80,80,80,0.62)", "color" : "white"});
			window.location.hash = "#" + $("section." + num[viewable]).attr("id");
		}

		scrollTop = $window.scrollTop();
		if (scrollTop < 700) {

		    elementOffset = $('section.two').offset().top;
		    distance      = (elementOffset - scrollTop);
		    firstelemheight = $("section.one").height() + $(".sticky").height() + 70;
		    console.log("First: ", firstelemheight);

		    opacityOne = distance / firstelemheight;

			console.log(distance + " / " + firstelemheight);
			console.log("Opacity: ", opacityOne);

			$("section.one").css("opacity", opacityOne);
		}
		else {
			$("section.one").css({"opacity":"0","z-index":"-1"});
		}

    });
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