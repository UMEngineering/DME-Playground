<?php
if (isset($_POST["submit"])) {
	$v1 = $_POST["text-1"];
	$v2 = $_POST["text-2"];
	$v3 = $_POST["text-3"];
	
	$respond = array();
	$respond["html"] = "hello world!";
	$respond["fragments"] = array("#result1" => $v1, "#result2" => $v2, "#result3" => $v3);
	echo json_encode($respond);
} else {
	$respond = array();
	$respond["html"] = "hello a!";
	$respond["fragments"] = array("#result1" => "a-tag-1", "#result2" => "a-tag-2", "#result3" => "a-tag-3");
	echo json_encode($respond);
}
?>