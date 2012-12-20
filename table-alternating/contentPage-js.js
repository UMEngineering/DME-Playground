// JavaScript Document
$(document).ready(function() {
	// Alternate background on rows if the browser doesn't support CSS3
	if (!$("html.rgba").html()) {
		var countRow = 1;
		$(".altByRow tr").each(function(index, element) {
			if (countRow % 2 == 0) {
				$(this).children("td").css("background", "#95B7D9");
			}
			countRow++;
		});
		countRow = 0;
		
		// Alternate background on columns
		$(".altByCol tr").each(function(index, element) {
			var countCol = 1;
			if ($(this).children("th").html()){
				$(this).children("th").each(function(index, element) {
					if (countCol % 2 == 0) {
						$(this).css("background", "#0B5595");
					}
					countCol++;
				});
			} else {
				$(this).children("td").each(function(index, element) {
					if (countCol % 2 == 0) {
						$(this).css("background", "#95B7D9");
					}
					countCol++;
				});
			}
		});
		countCol = 0;
		$(".data tbody td:not(:first-child)").css("text-align","right");

	}
});