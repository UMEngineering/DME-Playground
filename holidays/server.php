<?php
	//We are going to need a database connection:
	require_once("../../db.php");
	if (!extension_loaded('json')) {
			dl('json.so');  
	}
	
	
	$query = "SELECT * FROM holidays WHERE (lat != '' and lon != '') ORDER BY id";
	$result = mysql_query($query);
	$data = array(); //Initializing the results array
    
	while ($row = mysql_fetch_assoc($result)){
		array_push($data, $row);
	}
	$json = json_encode($data);
	print $json;
?>