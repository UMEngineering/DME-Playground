// JavaScript Document
// Result page js

// Change the page content to the target page id
function displayPage(id){
	if ($(".bottom").html() == null) {
		$('head').append("<link rel=\"stylesheet\" href=\"css/pages.css\" type=\"text/css\" />");
		
		// Mobile version bottom
		$("#container").append("<div class=\"bottom display-when-mobile\"><div id=\"bottom-title\">RESULTS</div><div id=\"bottom-scrollbackground\"><div class=\"scrollview-right\" id=\"img-nav-div\">"+$("#result-div").html()+"</div></div></div>");
		
		// Desktop version bottom
		$("#container").append("<div class=\"bottom display-when-desktop\"><div id=\"bottom-title\">RESULTS</div><div class=\"scroll-background flexslider\">"+$("#result-div-detail").html()+"</div></div>");
	} else {
		
	}
	
	$(".imgs-nav").attr("id", "");
	//if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i))
		create_yui('#img-nav-div');
	//else
		//$("#img-nav-div").css("overflow-x", "scroll");
	$('.flexslider').flexslider({
		animation: "slide",
		slideshow: false
	});
	
	$("#nav").html("<li>"+$("#d"+id+" a img").attr("alt").toUpperCase()+"</li><span id=\"goback\"><a href=\"result.php\">Go Back</a></span>");
	$("#main").html($("#content"+id+" .description").html());
	$("#main").css("height", "auto");
	$("#main p a").attr("target", "_blank");
}