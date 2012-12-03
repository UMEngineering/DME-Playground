<h3 id="facebookHead" title="Michigan Engineering on Facebook"><span>Michigan Engineering on Facebook</span></h3>

			<iframe src="http://www.facebook.com/plugins/likebox.php?id=51664048323&amp;width=272&amp;connections=8&amp;stream=true&amp;header=false&amp;height=555" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:272px; height:555px;" allowTransparency="true"></iframe>


<?php
//Get the contents of the Facebook page
$FBpage = file_get_contents('https://graph.facebook.com/51664048323/feed?access_token=562007713813256|gpyrHAWEfiT3pQdMKdR2ZmJnbO0');
//Interpret data with JSON
$FBdata = json_decode($FBpage);
//Loop through data for each news item
$i = 0;

function makeClickableLinks($s) {
  return preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@', '<a href="$1" target="_blank">$1</a>', $s);
}

foreach ($FBdata->data as $news ) {
	$i++;
	//Explode News and Page ID's into 2 values
	$StatusID = explode("_", $news->id);
	//Check for empty status (for example on shared link only)
	if (!empty($news->message) && ($news->from->id == 51664048323) && $i <= 6) { 
		echo "<li>";
		$linktext = makeClickableLinks($news->message);
		echo $linktext;
		echo "";
		echo "</li>";
	}
}
?>