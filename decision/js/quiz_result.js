// JavaScript Document
// Result page js

// Change the page content to the target page id
function displayPage(id){
	if ($(".bottom").html() == null) {
		$('head').append("<link rel=\"stylesheet\" href=\"css/pages.css\" type=\"text/css\" />");
		$("#container").append("<div class=\"bottom\"><div id=\"bottom-title\">RESULTS</div><div class=\"scrollview-right\" id=\"img-nav-div\">"+$("#result-div").html()+"</div></div>");
		//create_yui('#img-nav-div');
	} else {
		
	}
	
	$("#nav").html("<li>"+$("#content"+id+" .title").text().toUpperCase()+"</li><span id=\"goback\"><a href=\"result.php\">Go Back</a></span>");
	$("#main").html($("#content"+id+" .description").html());
}