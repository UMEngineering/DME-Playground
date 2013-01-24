<?php
	$host = 'localhost:8889';
	$username = 'root';
	$password = 'root';
	$database = 'decision';
	$con = mysql_connect($host, $username, $password);
	
	if (!$con) {
		die("cannot connect to database");
	}
	if (!mysql_select_db($database)) {
		die("cannot select database");
	}
?>