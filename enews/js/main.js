// JavaScript Document
var totalSmallEntries = 1;
function addOne(type){
	totalSmallEntries++;
	var appendString = "";
	if (type == 2) {
		appendString += '<form method="POST" action="../../enews_CMS/js/process.php">';
	}
	appendString += '<div class="small-entry" id="e'+totalSmallEntries+'"><h3>eNews #'+totalSmallEntries+'</h3><p><label>Title: </label><input type="text" name="title-small'+totalSmallEntries+'" id="title-small'+totalSmallEntries+'" size="80"/></p><p><label>Image: </label><input type="text" name="image-small'+totalSmallEntries+'" id="image-small'+totalSmallEntries+'" size="80" class="imageinput" value="http://engcomm.engin.umich.edu/mon_enews_13/img/'+(totalSmallEntries+1)+'.jpg" /></p><p><label>Description: </label><textarea rows="10" cols="50" name="desc-small'+totalSmallEntries+'" id="desc-small'+totalSmallEntries+'"></textarea></p><p><label>Link: </label><input type="text" name="href-small'+totalSmallEntries+'" id="href-small'+totalSmallEntries+'" size="80" /></p></div>';
	
	if (type == 2) {
		appendString += '<input type="hidden" name="year" value='+$("#year").attr("value")+' /><input type="hidden" name="month" value='+$("#month").attr("value")+' /><input type="hidden" name="order" value="'+totalSmallEntries+'" /><input type="submit" value="create" name="createone" /></form>';
	}
	
	$("div.small-entries").append(appendString);
	changeURL(1);
	changeURL(2);
}

function changeURL(type){
	if (type == 1){
		var year = $("#year").attr("value").substr(2);
		$(".imageinput").each(function(index, element) {
			$(this).attr("value", $(this).attr("value").substr(0, 41)+year+$(this).attr("value").substr(43));
		});
	} else if (type == 2){
		var month = $("#month").attr("value");
		var month_str = new Array("jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec");
		$(".imageinput").each(function(index, element) {
			$(this).attr("value", $(this).attr("value").substr(0, 31)+month_str[month-1]+$(this).attr("value").substr(34));
		});
	}
}