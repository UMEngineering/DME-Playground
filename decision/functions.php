<?php
function load_page($id, $type_page){
	if ($type_page == "explore") {
		$result = mysql_query("SELECT title, img_src, description FROM results WHERE id={$id};");
	} else {
		$result = mysql_query("SELECT title, imgsrc, paragraph FROM pages WHERE id={$id};");
	}
	if (!$result){
		print("Cannot load info from {$type_page}");
	}
	
	if ($row = mysql_fetch_row($result)) {
		if ($row[1] != "") {
			echo "<div class=\"innerIMG\">{$row[1]}</div>";
		}
		echo "<div class=\"page_detail\">{$row[2]}</div>";
		echo "<div id=\"title-none-display\" style=\"display: none;\">{$row[0]}</div>";
	} else {
		echo "<p>ERROR: no record for this page id :(</p>";
	}
}
?>