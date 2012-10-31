<?php
// Return a shorter string that can fit into the transparent div if a string is too long
// The return string will have a "..." at the end if this returning string is shorten
function limit_size($str, $class){
	$width = 285;
	$height = 133;
	$max_length = 200;
	if ($class == " sm"){
		$width = 135;
		$height = 52;
		$max_length = 30;
	}
	
	# Start generate shorter string
	$result = "";
	$last_white_space = 0;
	for ($i=0; $i<strlen($str) && $i <= $max_length; $i++){
		if ($str[$i] == " ") {
			$last_white_space = $i;
		}
	}
	
	$result = $str;
	if ($i < strlen($str)) {
		$result = substr($str, 0, $last_white_space);
		return "{$result} ...";
	}
	return $result;
}
?>