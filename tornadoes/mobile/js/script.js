/* Author:

*/

$(document).ready(function() {
    var width = $(window).width()-20;
	
	// Set the youtube frame size
	var iframe_height = 197 * (width) / 350;
	$("iframe").attr("width", width);
	$("iframe").attr("height", iframe_height);
	
	// Set the width of different elements of the page
	$("section").css("width", width);
	$("#footer").css("width", width);
	$(".sticky").css("width", width);
	$("#two img").css("width", width);
	$("#three img").css("width", width);
	$("#six img").css("width", width);
	
	if (width < 380){
		$("#nav img").css("width", width);
	}
});