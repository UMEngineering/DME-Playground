<?php
	# Connect to database
	require_once("connect.php");
	
	# Set the question id
	$qid = 1;
	if (!empty($_REQUEST["qid"])){
		$qid = $_REQUEST["qid"];
	}
	
	# Fetch the questions
	$result = mysql_query("SELECT q_id, question, answer FROM questions WHERE q_id=\"{$qid}\";");
	if (!$result){
		print("Cannot load questions");
	}
	
	# Save questions to variable
	$question = "";
	$choices = Array();
	while ($row = mysql_fetch_row($result)){
		$question = $row[1];
		array_push($choices, $row[2]);
	}
	
	echo "<p>{$question}</p><form id=\"questions\">";
	for($i=0; $i<count($choices); $i++){
		echo("<div><input class=\"choices\" type=\"checkbox\" name=\"choice{$i}\" value=\"{$i}\" /><p>{$choices[$i]}</p></div>");
	}
	echo "</form>";
?>