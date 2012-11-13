<?php

$host = "webapps-db.web.itd.umich.edu";
$username = "engcomm";
$pass = "l;'l;kljk90-908978";
$db = "engcomm";

    $link = mysql_connect($host ,$username , $pass)
        or die("Could not connect");
    mysql_select_db($db) or die("Could not select database");

?>
