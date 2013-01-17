<?php
// Clean the img folder, delete the images that are not currently in use
require_once("../../db.php");

$arr = glob("img/*.jpg");

for ($i=0; $i<count($arr); $i++){
	$check = mysql_query("SELECT img FROM enews WHERE img='{$arr[$i]}';");
	if (!$check){
		die("Cannot load result");
	}
	
	if (!$row = mysql_fetch_row($check)) {
		unlink($arr[$i]);
	}
}
?>