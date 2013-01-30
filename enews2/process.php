<?php
require_once("../../db.php");

if ($_POST["create"]) {
	// Create a new eNews monthly letter
	$month = $_POST["month"];
	$year = $_POST["year"];
	
	// Process the big image
	$fuploaded = uploadFile($year, $month, 0);
	if ($fuploaded == "") {
		$fuploaded = checkString($_POST['image-big']);
	}
	
	$big_entry = array(checkString($_POST["title-big"]), $fuploaded, checkString($_POST["desc-big"]), checkString($_POST["href-big"]));
	$small_entry = array();
	
	$counter = 1;
	while (true){
		if ($_POST["title-small".$counter]){
			// Process the images for small entries
			$fuploadedsmall = uploadFile($year, $month, $counter);
			if ($fuploadedsmall == "") {
				$fuploadedsmall = checkString($_POST["image-small".$counter]);
			}
			
			array_push($small_entry, checkString($_POST["title-small".$counter]), $fuploadedsmall, checkString($_POST["desc-small".$counter]), checkString($_POST["href-small".$counter]));
		} else {
			break;
		}
		$counter++;
	}
	
	// Check if there are any existing eNews for this month and year
	$check = mysql_query("SELECT id FROM enews WHERE year={$year} AND month={$month};");
	if (!$check || $month == '' || $year == ''){
		Header("Location:create.php?err=1");
	} else {
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
			//Header("Location:index.php");
		}
	}
	
} else if ($_POST["update"]){
	
	$month = $_POST["month"];
	$year = $_POST["year"];
	$type = $_POST["type"];
	$this_id = $_POST["id"];
	
	// Delete the current image
	$check = mysql_query("SELECT img FROM enews WHERE id={$this_id};");
	if (!$check){
		print("Cannot load result");
	}
	
	$fuploaded = uploadFile($year, $month, "file");
	if ($fuploaded == "" && $row = mysql_fetch_row($check)) {
		$fuploaded = $row[0];
		if ($fuploaded != checkString($_POST['image-'.$type])){
			$fuploaded = checkString($_POST['image-'.$type]);
		}
	} else {
		if ($row != "") {
			unlink("{$row[0]}");
		}
	}
	
	$vars = array(checkString($_POST['title-'.$type]), checkString($_POST['image-'.$type]), checkString($_POST['desc-'.$type]), checkString($_POST['href-'.$type]), checkString($_POST['order-'.$type]));
	
	// Edit the content in the database
	$query = "UPDATE enews SET title='{$vars[0]}', img='{$fuploaded}', description='{$vars[2]}', href='{$vars[3]}', orders='{$vars[4]}' WHERE id={$_POST['id']};";
	
	$result = mysql_query($query);
	if (!$result){
		die("<br />Cannot update $query. ".mysql_error());
	}
	Header("Location:edit.php?year={$year}&month={$month}&err=0");
	
} else if ($_POST["createone"]){
	
	$month = $_POST["month"];
	$year = $_POST["year"];
	$order = $_POST["order"];
	$vars = array(checkString($_POST['title-small'.$order]), checkString($_POST['image-small'.$order]), checkString($_POST['desc-small'.$order]), checkString($_POST['href-small'.$order]));
	
	// Upload the photo
	$fuploaded = uploadFile($year, $month, "file");
	if ($fuploaded == '' && checkString($_POST['image-small'.$order]) != ""){
		$fuploaded = checkString($_POST['image-small'.$order]);
	}
	
	// Edit the content in the database
	$query = "INSERT INTO enews (title, img, type, description, href, year, month, orders) VALUES ('{$vars[0]}', '{$fuploaded}', '1', '{$vars[2]}', '{$vars[3]}', '{$year}', '{$month}', '{$order}');";
	
	$result = mysql_query($query);
	if (!$result){
		die("<br />Cannot update 1 $query. ".mysql_error());
	}
	
	if ($_POST["editinfull"] == 'true') {
		Header("Location:editfull.php?year={$year}&month={$month}&err=0");
	} else {
		Header("Location:edit.php?year={$year}&month={$month}&err=0");
	}
	
} else if ($_POST["delete"]){
	
	$month = $_POST["month"];
	$year = $_POST["year"];
	$id = $_POST["id"];
	
	// Delete the current image
	$check = mysql_query("SELECT img FROM enews WHERE id={$id};");
	if (!$check){
		die("Cannot load result");
	}
	
	if ($row = mysql_fetch_row($check)) {
		unlink("{$row[0]}");
	}
	
	// Edit the content in the database
	$query = "DELETE FROM enews WHERE id={$id};";
	
	$result = mysql_query($query);
	if (!$result){
		die("<br />Cannot update 2 $query. ".mysql_error());
	}
	Header("Location:edit.php?year={$year}&month={$month}&err=0");
	
} else if ($_POST["editinfull"]){
	
	$month = $_POST["month"];
	$year = $_POST["year"];
	$this_id = $_POST["id"];
	
	// Delete the current image
	$check = mysql_query("SELECT img FROM enews WHERE id={$this_id};");
	if (!$check){
		print("Cannot load result");
	}
	
	$fuploaded = uploadFile($year, $month, "file");
	if ($fuploaded == "" && $row = mysql_fetch_row($check)) {
		$fuploaded = $row[0];
	} else {
		if ($row != "") {
			unlink("{$row[0]}");
		}
	}
	
	$vars = array(checkString($_POST['title-'.$this_id]), checkString($_POST['image-'.$this_id]), checkString($_POST['desc-'.$this_id]), checkString($_POST['href-'.$this_id]), checkString($_POST['order-'.$this_id]));
	
	// Edit the content in the database
	$query = "UPDATE enews SET title='{$vars[0]}', img='{$fuploaded}', description='{$vars[2]}', href='{$vars[3]}' WHERE id={$this_id};";
	
	$result = mysql_query($query);
	if (!$result){
		die("<br />Cannot update 3 $query. ".mysql_error());
	}
	Header("Location:editfull.php?year={$year}&month={$month}&err=0");
	
}

function checkString($str){
	$str = mysql_real_escape_string($str);
	$str = stripslashes($str);
	$str = htmlentities($str, ENT_QUOTES);
	$str = strip_tags($str);
	return $str;
}

function uploadFile($year, $month, $fileid) {
	// Process upload image
	$fuploaded == "";
	$fname = $_FILES["file"]["name"];
	if (is_numeric($fileid)) {
		$fname = $_FILES["file"]["name"][$fileid];
	}
	if (!empty($fname)){
		$path = "img/";
		
		// Check if the image format is gif, jpeg or png
		$img_type = array("image/gif", "image/jpeg", "image/pjpeg", "image/png");
		
		$ftype = $_FILES["file"]["type"];
		if (is_numeric($fileid)) {
			$ftype = $_FILES["file"]["type"][$fileid];
		}
		
		if (!in_array($ftype, $img_type)) {
			echo "<script>alert('The image format is not allowed'); history.go(-1);</script>";
			exit;
		}
		
		$file_type = $ftype;
		if ($file_type == "image/gif") $ftype = ".gif";
		else if ($file_type == "image/png") $ftype = ".png";
		else if ($file_type == "image/jpeg" || $file_type == "image/pjpeg") $ftype = ".jpg";
		
		$date_time = date(YmdHis);
		$fuploaded = $path."enews_".$year.$month."_".$date_time.$fileid.$ftype;
		$img = "enews_".$year.$month."_".$date_time.$fileid.$file_type;
		$success = 1;
	}
	
	// If the file process is successful, then move the file to the folder
	$ftemp = $_FILES["file"]["tmp_name"];
	if (is_numeric($fileid)) {
		$ftemp = $_FILES["file"]["tmp_name"][$fileid];
	}
	if ($success == 1) $file_upload = move_uploaded_file($ftemp, $fuploaded);
	
	return $fuploaded;
}
?>