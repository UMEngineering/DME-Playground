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

function get_count($q_id){
	$sql = "SELECT user_answer, count(q_id) FROM ethic_answers WHERE q_id={$q_id} GROUP BY user_answer;";
	$result = mysql_query($sql);
	if (!$result) {
		die ("FAILED to load question count");
	}
	
	$return = array(0, 0);
	while ($row = mysql_fetch_row($result)){
		$return[$row[0] + 0] = $row[1] + 0;
	}
	
	return $return;
}
?>