/* Author:

*/

$(document).ready(function() {
    var width = $(window).width()-20;
	
	// Set the youtube frame size
	var iframe_height = 197 * (width) / 350;
	$("iframe").attr("width", width);
	$("iframe").attr("height", iframe_height);
	
	// Set the width of different elements of the page
	$("section").css("width", width + "px");
	$("#footer").css("width", width + "px");
	$(".sticky").css("width", width + "px");
	$("#two img").css("width", width + "px");
	$("#three img").css("width", width + "px");
	$("#six img").css("width", width + "px");
	
	if (width < 380){
		$("#nav img").css("width", width + "px");
	}
});