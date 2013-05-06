
/* - ++resource++umich_js/headerlist.js - */
/* - headerlist.js - */

//headers.js
//Effects: finds all headers (h1, h2, h3) in the page content, IDs them for anchors, 
//and then makes a list of links at the top of the page (below the header) that all link to the appropriate header in the content

$(document).ready(setTimeout(main, 500));

function main()
{

	var $headers = $("#contentHolder").find("h1,h2,h3");
	var $contentHeader = $("#content").find(".pageHeader").first();
	
	$("<ul class='pageSubHeading'/>").appendTo($contentHeader);
	$headers.each(
		function () 
		{
			if (!$(this).hasClass("videoHeader")){
				var lower = $(this).html().replace(/\s+/g, '').toLowerCase();
				$("<li><a class='linkArrow' href='#" + lower + "'>" + $(this).html() + "</a></li>").appendTo($contentHeader.children(".pageSubHeading").first());
				$(this).attr({'id': lower});
	
			}
		}
	);
	

}


