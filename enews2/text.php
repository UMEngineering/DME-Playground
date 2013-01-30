<?php
require_once("../../db.php");
if (strlen($_GET["year"]) == 4 && strlen($_GET["month"]) == 2) {
	$year = $_GET["year"];
	$month = $_GET["month"];
	
	// Get the info from database
	$query = "SELECT title, img, type, description, href, orders FROM enews WHERE year='{$year}' AND month='{$month}' ORDER BY orders;";
	$result = mysql_query($query);
	if (!$result){
		die("Cannot load results");
	}
	
	$row = mysql_fetch_row($result);
	if ($row[2] != "0") {
		die ("error processing data: data type not correct.");
	}
	
	// Start create a new text file
	$file_path = "text/enews_".$year.$month.".txt";
	$file = fopen($file_path, "wt");
	$string = "Michigan Engineering eNews
Periodic news for engineering alumni and friends.

LEAD STORY
-------------------
";
	
	// Read the lead story
	$string .= $row[0]."\n".$row[4]."\n".$row[3]."\n\n\n";
	
	// Read the rest of stories
	while($row = mysql_fetch_row($result)){
		$string .= $row[0]."\n".$row[4]."\n".$row[3]."\n\n";
	}
	
	// Write the rest of text, including links and other
	$string .= "FOLLOW MICHIGAN ENGINEERING
http://www.facebook.com/michigan.engineering
http://www.twitter.com/UMengineering

SUPPORT ENGINEERING
http://www.engin.umich.edu/giving/wheretogive/index.html

To get all the latest Michigan Engineering news, subscribe to our RSS News Feed
http://www.engin.umich.edu/newscenter/rss/newscenter/feed.rss
Or, visit the News Center
http://www.engin.umich.edu/newscenter/

Forward eNews to a friend
http://www.magnetmail.net/Actions/new_forward_message_UMI_COE.cfm?message_id=INCLUDEMESSAGEID&FTFId=947&user_id=INCLUDEUSERID&recipient_id=999999999

Contact Us
engcom@umich.edu

Privacy Policy
http://www.giving.umich.edu/contacts/index.php?page=privacy

Unsubscribe
http://www.magnetmail.net/Actions/unsubscribe.cfm?message_id=INCLUDEMESSAGEID&user_id=INCLUDEUSERID&recipient_id=999999999&email=INCLUDEEMAILADDRESS&group_id=INCLUDEGROUPID";
	
	// Write the string to the file
	fwrite($file, $string);
	fclose($file);
	Header("Location:".$file_path);
}
?>