
/* - firstlast.js - */

//first_last aka first_fix v2.0
//Effects: removes classes 'first' and 'last' from all portlets and then reassigns them to the appropriate portlet(s)

window.onload = main;
function main()

{
	setTimeout(function() {
	
		var $promoCol = $("#col1").children().first();
		var $divFocus, $divsRest;
	
		$divFocus = $promoCol.children().first();
		$divsRest = $promoCol.children().slice(1);
	
		for(var i = 0; i < $promoCol.children().length; i++)
		//Removes first and last from all portlets
		{
			$divFocus.removeClass("first").removeClass("last");
			$divFocus = $divsRest.first();
			$divsRest = $divsRest.slice(1);
		}	
	
		$divFocus = $promoCol.children().first();
		$divsRest = $promoCol.children().slice(1);
	
		for(var i = 0; i < $promoCol.children().length; i++)
		//Adds 'first' to the first eligible portlet
		{
			if(!(($divFocus.children().hasClass("navPortlet")) || ($divFocus.children().hasClass("contactPortlet")) || ($divFocus.hasClass("managePortletsLink"))))
			{
				$divFocus.addClass("first");
				break;
			}
			$divFocus = $divsRest.first();
			$divsRest = $divsRest.slice(1);
		
		}
	
		$divFocus = $promoCol.children().last();
	$divsRest = $promoCol.children().slice(0, -1);	
	
		for(var i = 0; i < $promoCol.children().length; i++)
		//Adds 'last' to the first eligible portlet (really the last eligible portlet, but the first one it sees)
		{
			if(!(($divFocus.children().hasClass("navPortlet")) || ($divFocus.children().hasClass("contactPortlet")) || ($divFocus.hasClass("managePortletsLink"))))
			{
				$divFocus.addClass("last");
				break;
			}
			$divFocus = $divsRest.last();
			$divsRest = $divsRest.slice(0, -1);
		}
	}, 1000);
}



