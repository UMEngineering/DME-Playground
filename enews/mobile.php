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
?>
<h1>Michigan Engineering eNews&nbsp;</h1>
<p>Periodic news for engineering alumni and friends.<br />
<a href="<?= $row[4] ?>"><?= $row[0] ?></a><?= $row[3] ?><a href="<?= $row[4] ?>"> VIEW THIS DIGITAL MULTIMEDIA EXPERIENCE</a><br />
&nbsp;<br />
<?php
	while ($row = mysql_fetch_row($result)) {
		?>
        <a href="<?= $row[4] ?>"><?= $row[0] ?></a>&nbsp;<?= $row[3] ?><br /><br />
        <?php
	}
?>
To get all the latest Michigan Engineering news, subscribe to our <a href="http://www.engin.umich.edu/newscenter/rss/newscenter/feed.rss">RSS News Feed</a> or visit the <a href="http://www.engin.umich.edu/newscenter/">News Center</a>.                                     <a href="http://www.magnetmail.net/Actions/new_forward_message_UMI_COE.cfm?message_id=INCLUDEMESSAGEID&amp;FTFId=947&amp;user_id=INCLUDEUSERID&amp;recipient_id=999999999">Forward to a friend</a>                                     <br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br />
<a href="mailto:engcom@umich.edu">Contact Us</a> | <a href="http://www.magnetmail.net/Actions/new_forward_message_UMI_COE.cfm?message_id=INCLUDEMESSAGEID&amp;FTFId=947&amp;user_id=INCLUDEUSERID&amp;recipient_id=999999999">Forward</a> | <a href="http://www.giving.umich.edu/contacts/index.php?page=privacy">Privacy Policy</a> | <a href="http://www.magnetmail.net/Actions/unsubscribe.cfm?message_id=INCLUDEMESSAGEID&amp;user_id=INCLUDEUSERID&amp;recipient_id=999999999&amp;email=INCLUDEEMAILADDRESS&amp;group_id=INCLUDEGROUPID">Unsubscribe</a><br />
Copyright 2012 The Regents of the University of Michigan, Ann Arbor, MI 48109 <br />
&nbsp;                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
<?php
}
?>