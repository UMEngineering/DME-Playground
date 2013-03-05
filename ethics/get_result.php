<?php
require_once("../../db.php");
require_once("functions.php");

$result = array();
$one_result = array();
$one_result["q_id"] = $_GET["q_id"] + 0;
$count = get_count($_GET["q_id"]);
$one_result["count"] = $count[0];
array_push($result, $one_result);

$one_result = array();
$one_result["q_id"] = $_GET["q_id"] + 0;
$one_result["count"] = $count[1];
array_push($result, $one_result);

echo json_encode($result);
?>