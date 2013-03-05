<?php
function get_userid(){
	$user_ip = $_SERVER["REMOTE_ADDR"];
	$sql = "SELECT user_id FROM ethic_users WHERE user_ip='{$user_ip}';";
	$result = mysql_query($sql);
	if (!$result) {
		die ("FAILED to load user information.");
	}
	if ($row = mysql_fetch_row($result)){
		$user_id = $row[0];
		return $user_id;
	} else {
		return false;
	}
}

function get_count($q_id, $choice=0){
	$sql = "SELECT count(q_id) FROM ethic_answers WHERE q_id={$q_id} AND user_answer={$choice};";
	$result = mysql_query($sql);
	if (!$result) {
		die ("FAILED to load question count");
	}
	
	if ($row = mysql_fetch_row($result)){
		return $row[0];
	} else {
		return 0;
	}
}
?>