<?php
function load_page($id){
	$result = mysql_query("SELECT * FROM pages WHERE id={$id};");
	if (!$result){
		print("Cannot load info from PAGE");
	}
	
	if ($row = mysql_fetch_row($result)) {
		if ($row[3] != "") {
			echo "<div class=\"innerIMG\">{$row[3]}</div>";
		}
		echo $row[6];
		echo "<div id=\"title-none-display\" style=\"display: none;\">{$row[1]}</div>";
	} else {
		echo "<p>ERROR: no record for this page id :(</p>";
	}
}
?>