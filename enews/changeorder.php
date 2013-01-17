<?php
require_once("../../db.php");

if ($_GET["order0"]) {
	$i=0;
	$ids = array();
	$orders = array();
	$success = true;
	while(!empty($_GET["order".$i])) {
		$e = explode("-", $_GET["order".$i]);
		$query = "UPDATE enews SET orders='{$i}' WHERE id='{$e[0]}';";
		$result = mysql_query($query);
		if (!$result){
			$success = false;
			print("<br />Cannot update".mysql_error());
			break;
		}
		$i++;
	}
	if ($success)
		print ("Change order success!");
}
?>