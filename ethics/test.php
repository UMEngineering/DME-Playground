<?php
require_once("../../db.php");
require_once("functions.php");

$sql = "SELECT * FROM ethic_answers;";
$result = mysql_query($sql);
if (!$result) {
	die ("ERROR answer");
}

$count = mysql_num_fields($result);

echo "<table border=1>";
echo "<tr>";
for ($i=0; $i<$count; $i++){
	$field = mysql_fetch_field($result);
	echo "<th>{$field->name}</th>";
}
echo "</tr>";

while ($row = mysql_fetch_row($result)) {
	echo "<tr>";
	for ($i=0; $i<count($row); $i++) {
		echo "<td>{$row[$i]}</td>";
	}
	echo "</tr>";
}
echo "</table><br />";


$sql = "SELECT * FROM ethic_users;";
$result = mysql_query($sql);
if (!$result) {
	die ("ERROR answer");
}

echo "<table border=1>";

$count = mysql_num_fields($result);

echo "<table border=1>";
echo "<tr>";
for ($i=0; $i<$count; $i++){
	$field = mysql_fetch_field($result);
	echo "<th>{$field->name}</th>";
}
echo "</tr>";
while ($row = mysql_fetch_row($result)) {
	echo "<tr>";
	for ($i=0; $i<count($row); $i++) {
		echo "<td>{$row[$i]}</td>";
	}
	echo "</tr>";
}
echo "</table>";
?>