// JavaScript Document
// Result page js
var originalBottom2 = new Array("", "");

// Change the page content to the target page id
function displayPage(id){
	if ($(".bottom").html() == null) {
		$('head').append("<link rel=\"stylesheet\" href=\"css/pages.css\" type=\"text/css\" />");
		
		if(originalBottom2[0] == "" && originalBottom2[1] == "") {
			originalBottom2[0] = "<div id=\"bottom-title\">RESULTS</div><div id=\"bottom-scrollbackground\"><div class=\"scrollview-right\" id=\"img-nav-div\">"+$("#result-div").html()+"</div></div></div>";
			originalBottom2[1] = "<div id=\"bottom-title\">RESULTS</div><div class=\"scroll-background flexslider\">"+$("#result-div-detail").html()+"</div></div>"
		}
		
		// Mobile version bottom
		$("#container").append("<div class=\"bottom display-when-mobile\">"+originalBottom2[0]);
		
		// Desktop version bottom
		$("#container").append("<div class=\"bottom display-when-desktop\">"+originalBottom2[1]);
	} else {
		$(".display-when-mobile").html(originalBottom2[0]);
		$(".display-when-desktop").html(originalBottom2[1]);
	}
	
	$(".imgs-nav").attr("id", "");
	if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)){
		create_yui('#img-nav-div');
	}else{
		$("#img-nav-div").css("overflow-x", "scroll");
	}
	$('.flexslider').flexslider({
		animation: "slide",
		slideshow: false
	});
	
	$("#nav").html("<li>"+$("#d"+id+" a img").attr("alt").toUpperCase()+"</li><span id=\"goback\"><a href=\"result.php\">Go Back</a></span>");
	$("#main").html("<div class=\"innerIMG\"><img src=\""+$("#d"+id+" a .scroll-img").attr("src")+"\" alt=\""+$("#d"+id+" a .scroll-img").attr("alt")+"\" /></div>"+$("#content"+id+" .description").html());
	$("#main").css("height", "auto");
	
	// Change the #main's height to screen's height if in mobile version
	var screenWidth = $(window).width();
		if (screenWidth <= 800 && $(document).height() - $(window).height() <= 20) {
			//alert($(window).height()+" "+$(document).height());
			$("#main").css("height", ($(window).height()-200)+"px");;
		}
	$("#main p a").attr("target", "_blank");
	
	// Remove the current nav from the bottom
	$("#d"+id).detach();
	$("#"+id).detach();
	
	var bottom_arr = new Array();
	$(".slides .result-nav-li").each(function(index, element) {
		bottom_arr.push($(this).detach());
	});
	
	if (bottom_arr.length != 5) {
		for (var i=0; i<6; i++){
			bottom_arr.pop();
		}
	}
	
	var current = ".imgs-nav-desktop0";
	for (var i=0; i<bottom_arr.length; i++){
		if (i == 4) current = ".imgs-nav-desktop1";
		$(current).append(bottom_arr[i]);
	}
}