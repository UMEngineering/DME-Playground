<?php
require_once("../../db.php");
require_once("functions.php");

if (isset($_POST["submit-answer"]) && !empty($_POST["count"])) {
	//$answers = array();
	// Get the user_id
	$user_id = get_userid();
	$answered = array();
	if (isset($_COOKIE["answered"])) {
		$answered = unserialize($_COOKIE["answered"]);
	}
	
	// Insert user ip information if this user has not answered any question
	/*if (!$user_id) {
		$user_ip = $_SERVER["REMOTE_ADDR"];
		$sql = "INSERT INTO ethic_users (user_ip) VALUES ('{$user_ip}');";
		$result = mysql_query($sql);
		if (!$result) {
			die ("FAILED to insert user information.");
		}
		
		
		$user_id = get_userid();
		if (!$user_id) {
			die("FAILED to fetch user information.");
		}
	}*/
	
	for ($i=0; $i<$_POST["count"]; $i++){
		$sql = "INSERT INTO ethic_answers (q_id, set_id, user_answer) VALUES (";
		$sql .= $_POST["q_id-{$i}"] . ", " . $_POST["set_id"] . ", " . $_POST["answer_{$i}"] . ");";
		//echo $sql . "<br />";
		$result = mysql_query($sql);
		if (!$result) {
			die ("Cannot insert result to the database, please contact web administrator!");
		}
	}
	array_push($answered, $_POST["set_id"]);
	setcookie("answered", serialize($answered), time()+3600*24*180);
	
	header("Location: index.php");
	return;
}
?>