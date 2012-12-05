<?php
//Get the contents of the Facebook page
$FBpage = file_get_contents('https://graph.facebook.com/51664048323/feed?access_token=562007713813256|gpyrHAWEfiT3pQdMKdR2ZmJnbO0');
//Interpret data with JSON
$FBdata = json_decode($FBpage);
//Loop through data for each news item
$i = 0;
foreach ($FBdata->data as $news ) {
	$i++;
	//Explode News and Page ID's into 2 values
	$StatusID = explode("_", $news->id);
	//Check for empty status (for example on shared link only)
	if (!empty($news->message) && ($news->from->id == 51664048323) && $i < 5) { 
		echo "<li>";
		echo $news->message; print_r($news->from->id); 
		echo "</li>";
	}
}
?>