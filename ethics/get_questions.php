<?php
require_once("../../db.php");
require_once("functions.php");
echo "test";
// Randomly choose one number set
$set_questions = array();
$not_include = array();
if (isset($_COOKIE["answered"])) {
	$not_include = unserialize($_COOKIE["answered"]);
}

// Decide the client ip address, and skip the questions that already answered.
/*$user_id = get_userid();
if ($user_id){
	$sql = "SELECT DISTINCT set_id FROM ethic_answers WHERE user_id={$user_id}";
	$result = mysql_query($sql);
	if (!$result) {
		die ("Cannot load answer history.");
	}
	while($row = mysql_fetch_row($result)){
		array_push($not_include, $row[0] + 0);
	}
	
	for ($i=1; $i<=6; $i++){
		if (!in_array($i, $not_include)){
			array_push($set_questions, $i);
		}
	}
} else {
	$set_questions = array(1, 2, 3, 4, 5, 6);
}*/
for ($i=1; $i<=6; $i++){
	if (!in_array($i, $not_include)){
		array_push($set_questions, $i);
	}
}

// Randomly choose one set of question not answered yet
if (count($set_questions) == 0) {
	echo json_encode(array());
} else {
	$set = rand(0, count($set_questions)-1);
	$set = $set_questions[$set];
	
	/*print_r($not_include);
	print_r($set_questions);
	print("<br />{$set}");*/
	
	$sql = "SELECT q_id, set_id, question, answer1, answer2 FROM ethic_questions WHERE set_id={$set};";
	$result = mysql_query($sql) or die;
	if (!$result) {
		die("ERROR cannot load questions, please contact web administrator.");
	}
	
	$json_data = array();
	while ($row = mysql_fetch_row($result)) {
		$one_data = array();
		$one_data["q_id"] = $row[0];
		$one_data["set_id"] = $row[1];
		$one_data["question"] = $row[2];
		$one_data["answer1"] = $row[3];
		$one_data["answer2"] = $row[4];
		array_push($json_data, $one_data);
	}
	echo json_encode($json_data);
}

?>