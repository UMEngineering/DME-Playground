<?php
require_once("file:///Macintosh HD/Users/marketing/Documents/db.php");

if ($_POST["create"]) {
	// Create a new eNews monthly letter
	$month = $_POST["month"];
	$year = $_POST["year"];
	$big_entry = array(checkString($_POST["title-big"]), checkString($_POST["image-big"]), checkString($_POST["desc-big"]), checkString($_POST["href-big"]));
	$small_entry = array();
	
	$counter = 1;
	while (true){
		if ($_POST["title-small".$counter] && $_POST["image-small".$counter] && $_POST["desc-small".$counter] && $_POST["href-small".$counter]){
			array_push($small_entry, checkString($_POST["title-small".$counter]), checkString($_POST["image-small".$counter]), checkString($_POST["desc-small".$counter]), checkString($_POST["href-small".$counter]));
		} else {
			break;
		}
		$counter++;
	}
	
	// Check if there are any existing eNews for this month and year
	$check = mysql_query("SELECT id FROM enews WHERE year={$year} AND month={$month};");
	if (!$check){
		print("Cannot load result");
	}
	
	if ($row = mysql_fetch_row($check)) {
		Header("Location:create.php?err=1");
	} else {
		// Add the content into the database
		$query = "INSERT INTO enews (title, img, type, description, href, year, month, orders) VALUES ('{$big_entry[0]}', '{$big_entry[1]}', '0', '{$big_entry[2]}', '{$big_entry[3]}', '{$year}', '{$month}', '0')";
		$count = 1;
		for ($i=0; $i<count($small_entry); $i++){
			$query = $query.", ('{$small_entry[$i]}', '{$small_entry[$i+1]}', '1', '{$small_entry[$i+2]}', '{$small_entry[$i+3]}', '{$year}', '{$month}', '{$count}')";
			$i = $i+3;
			$count++;
		}
		$query = $query.";";
		
		$result = mysql_query($query);
		if (!$result){
			die("<br />Cannot insert: ".mysql_error());
		}
		Header("Location:index.php");
	}
	
} else if ($_POST["update"]){
	$month = $_POST["month"];
	$year = $_POST["year"];
	$type = $_POST["type"];
	$vars = array(checkString($_POST['title-'.$type]), checkString($_POST['image-'.$type]), checkString($_POST['desc-'.$type]), checkString($_POST['href-'.$type]), checkString($_POST['order-'.$type]));
	
	// Edit the content in the database
	$query = "UPDATE enews SET title='{$vars[0]}', img='{$vars[1]}', description='{$vars[2]}', href='{$vars[3]}', orders='{$vars[4]}' WHERE id={$_POST['id']};";
	
	$result = mysql_query($query);
	if (!$result){
		die("<br />Cannot update".mysql_error());
	}
	Header("Location:edit.php?year={$year}&month={$month}&err=0");
	
} else if ($_POST["createone"]){
	$month = $_POST["month"];
	$year = $_POST["year"];
	$order = $_POST["order"];
	$vars = array(checkString($_POST['title-small'.$order]), checkString($_POST['image-small'.$order]), checkString($_POST['desc-small'.$order]), checkString($_POST['href-small'.$order]));
	
	// Edit the content in the database
	$query = "INSERT INTO enews (title, img, type, description, href, year, month, orders) VALUES ('{$vars[0]}', '{$vars[1]}', '1', '{$vars[2]}', '{$vars[3]}', '{$year}', '{$month}', '{$order}');";
	
	$result = mysql_query($query);
	if (!$result){
		die("<br />Cannot update".mysql_error());
	}
	Header("Location:edit.php?year={$year}&month={$month}&err=0");
} else if ($_POST["delete"]){
	$month = $_POST["month"];
	$year = $_POST["year"];
	$id = $_POST["id"];
	
	// Edit the content in the database
	$query = "DELETE FROM enews WHERE id={$id};";
	
	$result = mysql_query($query);
	if (!$result){
		die("<br />Cannot update".mysql_error());
	}
	Header("Location:edit.php?year={$year}&month={$month}&err=0");
}

function checkString($str){
	$str = mysql_real_escape_string($str);
	$str = stripslashes($str);
	$str = htmlentities($str);
	$str = strip_tags($str);
	return str_replace("'", "\'", $str);
}
?>