<?php
$host = "localhost";
$username = "root";
$pass = "";
$db = "engcomm";
    $link = mysql_connect($host ,$username , $pass)
        or die("Could not connect");
    mysql_select_db($db) or die("Could not select database");
?>