$(document).ready(function(){
	//$(".transparent").hide();
	$("#li1").mouseenter(function(){mouseHover("#a1", "in")});
	$("#li2").mouseenter(function(){mouseHover("#a2", "in")});
	$("#li3").mouseenter(function(){mouseHover("#a3", "in")});
	$("#li4").mouseenter(function(){mouseHover("#a4", "in")});
	$("#li5").mouseenter(function(){mouseHover("#a5", "in")});
	$("#li1").mouseleave(function(){mouseHover("#a1", "out")});
	$("#li2").mouseleave(function(){mouseHover("#a2", "out")});
	$("#li3").mouseleave(function(){mouseHover("#a3", "out")});
	$("#li4").mouseleave(function(){mouseHover("#a4", "out")});
	$("#li5").mouseleave(function(){mouseHover("#a5", "out")});
});

// Display the target when mouse hover
// type: "in" or "out"
function mouseHover(target, type){
	if (type == 'in' && $(target).css("display") == "none") {
		$(target).slideDown();
	} else if (type == 'out' && $(target).css("display") == "block") {
		$(target).slideUp();
	}
}

