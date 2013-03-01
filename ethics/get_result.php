<?php
require_once("../../db.php");
require_once("functions.php");

if (isset($_GET["count"]) && isset($_GET["answer"])) {
	$total = $_GET["count"];
	$result = array();
	for ($i=0; $i<$total; $i++) {
		$one_result = array();
		$one_result["q_id"] = $_GET["q_id-{$i}"] + 0;
		$one_result["count"] = get_count($_GET["q_id-{$i}"], $_GET["answer"]) + 0;
		array_push($result, $one_result);
	}
	
	echo json_encode($result);
}
?>