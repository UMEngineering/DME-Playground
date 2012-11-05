<?php
	//We are going to need a database connection:
	require_once("../../db.php");
	if (!extension_loaded('json')) {
			dl('json.so');  
	}	
	$query = "SELECT * FROM campus WHERE (lat != '' and lon != '' and online LIKE '1') ORDER BY id DESC";
	$result = mysql_query($query);
	$data = array(); //Initializing the results array   
	while ($row = mysql_fetch_assoc($result)){
		array_push($data, $row);
	}
	$json = json_encode($data);
	print $json;
?>