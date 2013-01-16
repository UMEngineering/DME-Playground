// JavaScript Document
$(document).ready(function() {
	$(".youtubeColorbox").each(function(index, element) {
		var temp = $(this).children("div").detach();
		$(this).append("<div class=\"youtube-div\" id=\"div-"+$(this).attr("id")+"\"> </div>");
		$("#div-"+$(this).attr("id")).css("background", "url(http://i2.ytimg.com/vi/"+$(this).attr("id")+"/0.jpg) center no-repeat");
		$("#div-"+$(this).attr("id")).append("<div class='play-button'><div class=\"youtube-title\"></div></div>");
		$("#div-"+$(this).attr("id")+" .youtube-title").html(temp);
		
		// Cut the string
		var spaceAt = -1;
		for (var i=0; i<$("p.youtube-description").text().length && i <= 60; i++){
			if ($("p.youtube-description").text().charAt(i) == " ") {
				spaceAt = i;
			}
		}
		$("p.youtube-description").text($("p.youtube-description").text().substr(0, spaceAt)+" ...");
    });
	$(".play-button").css({"width" : "200px", "height" : "200px", "background" : "url(img/map-play-arrow.png) center no-repeat"});
	$(".youtubeColorbox").colorbox({inline: true, innerWidth: 748, innerHeight: 661});
});