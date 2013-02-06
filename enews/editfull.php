<?php
require_once("../../db.php");
if (strlen($_GET["year"]) == 4 && strlen($_GET["month"]) == 2) {
	$year = $_GET["year"];
	$month = $_GET["month"];
	
	// Get the info from database
	$query = "SELECT title, img, type, description, href, orders, id, alt FROM enews WHERE year='{$year}' AND month='{$month}' ORDER BY orders;";
	$result = mysql_query($query);
	if (!$result){
		die("Cannot load results");
	}
	
	$row = mysql_fetch_row($result);
	if ($row[2] != "0") {
		die ("error processing data: data type not correct.");
	}
	$counter = 1;
?>

<h1></h1><blockquote>&nbsp;</blockquote>
<table width="680" cellspacing="1" cellpadding="0" bgcolor="#ffffff" align="center" style="font-size: 14px; color: #666666; font-family: Arial,Helvetica,sans-serif">
    <tbody>
        <tr>
            <td colspan="7"><img width="680" height="80" title="enews banner" alt="enews banner" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/templateimages/enewsbanner.jpg" /></td>
        </tr>
        <tr>
            <td width="680" height="15" bgcolor="#0064A4" colspan="7" style="border-bottom: 1; border-bottom-style: solid; border-bottom-color: #ffc425;">&nbsp;</td>
        </tr>
        <tr>
            <td width="20" bgcolor="#ffffff"><img width="20" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/2spacer.gif" alt="" /></td>
            <td valign="top" colspan="6">
            <p style="font-size: 20px; color: #3B5998; margin: 2pt 0pt; letter-spacing: 1pt; font-family: Palatino, 'Palatino Linotype', 'Book Antiqua', serif">&nbsp;<br />
            <strong>Michigan Engineering eNews</strong></p>
            </td>
        </tr>
        <tr>
            <td width="20" bgcolor="#ffffff"><img width="20" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/2spacer.gif" alt="" /></td>
            <td valign="top" colspan="6">
            <p style="line-height: 20px; font-size: 12px; margin: 4pt 0pt; font-family: Palatino, 'Palatino Linotype', 'Book Antiqua', serif; ">Periodic news for engineering alumni and friends.<br />
            &nbsp;</p>
            </td>
        </tr>
        <tr>
            <td width="20" bgcolor="#ffffff"><img width="20" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/2spacer.gif" alt="" /></td>
            <td width="506" valign="top" bgcolor="#ffffff"><!--main content wrapper -->
            <table width="480" cellspacing="0" cellpadding="0" border="0">
                <tbody>
                    <tr>
                        <td width="500" valign="top" colspan="3">
                        <p><a href="<?= $row[4] ?>" style="color: #003366"><img width="480" border="0" title="Gaming image" src="<?= $row[1] ?>" alt="<?= $row[7] ?>" /></a></p>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="3" id="td<?= $row[6] ?>">
                        <form id="form<?= $row[6] ?>" method="POST" action="process.php" enctype="multipart/form-data">
                        <div id="div<?= $row[6] ?>">
                        <p style="font-size: 18px; color:#6B4E01; font-family: Palatino, 'Palatino Linotype', 'Book Antiqua', serif; line-height: 20px; "><img width="480" height="1" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/blue2.gif" alt="" /> <br />
                        &nbsp;<br />
                        <strong id="title<?= $row[6] ?>"><a href="<?= $row[4] ?>" style="color: #6B4E01; text-decoration:none"><?= $row[0] ?></a></strong></p>
                        <p style="font-size: 14px; margin: 0pt 0pt 0pt 0pt; color: #003366; line-height: 20px; " id="desc<?= $row[6] ?>"><?= $row[3] ?></p>
                        <p id="upload<?= $row[6] ?>"></p>
                        <p id="submit<?= $row[6] ?>"></p>
                        <a style="text-decoration: none;font-size: 10px; letter-spacing: 1pt; color:#9DACCE; font-family: Palatino, 'Palatino Linotype', 'Book Antiqua', serif; line-height: 20px; display: block; margin-top: 8px;" href="<?= $row[4] ?>">VIEW THIS DIGITAL MULTIMEDIA EXPERIENCE</a>
                        <p id="responsetext" style="color: red;"></p>
                        <input type="hidden" value="<?= $year ?>" name="year" id="year" />
                        <input type="hidden" value="<?= $month ?>" name="month" id="month"/>
                        <input type="hidden" value="<?= $row[7] ?>" name="alt-text<?= $row[6] ?>" id="alt-img<?= $row[6] ?>" />
                        <p><a href="javascript: void(0);" style="color: red; font-size: 10pt;" onclick="editInFull(<?= $row[6] ?>, 0);" id="a<?= $row[6] ?>">Edit the top story</a></p>
                        </div>
                    	</form>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top">
                            <ul id="sortable" style="list-style: none; margin: 0; padding: 0;">
                            <?php
                            while($row = mysql_fetch_row($result)){
								$counter++;
                            ?>
                            <li class="ui-state-default" id="<?= $row[6] ?>-<?= $row[5] ?>">
                                <div>
                                    <p style="margin: 0; padding: 0;">
                                    <img width="465" height="1" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/blue2.gif" alt="" />&nbsp;</p>
                                </div>
                                <div style="overflow: hidden;">
                                    <div style="width: 100px; float: left;" id="td<?= $row[6] ?>">
                                        <p><a href="<?= $row[4] ?>" style="color: #003366"><img width="100" height="100" border="0" src="<?= $row[1] ?>" title="<?= $row[0] ?>" alt="<?= $row[7] ?>" /></a></p>
                                    </div>
                                    <div style="width: 15px; float: left;">
                                        <img width="15" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/2spacer.gif" alt="" />
                                    </div>
                                    <div style="width: 357px; float: left; padding-top: 10px;" id="appendsubmit<?= $row[6] ?>">
                                        <div id="div<?= $row[6] ?>">
                                            <form id="form<?= $row[6] ?>" name="form<?= $row[6] ?>" method="POST" action="process.php" enctype="multipart/form-data">
                                                <p style="line-height: 22px; font-size: 14px; margin: 0pt 0pt; color:#6B4E01; font-family: Palatino, 'Palatino Linotype', 'Book Antiqua', serif" id="title<?= $row[6] ?>"><a href="<?= $row[4] ?>" style="color: #6B4E01; text-decoration:none"><strong><?= $row[0] ?></strong></a></p>
                                                <p style="margin: 0pt 0pt 0pt 0pt; line-height: 20px; color: #003366;  font-size: 10pt;" id="desc<?= $row[6] ?>"><?= $row[3] ?></p>
                                                <p id="upload<?= $row[6] ?>"></p>
                                                <p id="submit<?= $row[6] ?>"></p>
                                                <input type="hidden" value="<?= $year ?>" name="year" />
                                                <input type="hidden" value="<?= $month ?>" name="month" />
                                                <input type="hidden" value="<?= $row[5] ?>" name="order" />
                        						<input type="hidden" value="<?= $row[7] ?>" name="alt-text<?= $row[6] ?>" id="alt-img<?= $row[6] ?>" />
                                            </form>
                                        	<p><a href="javascript: void(0);" style="color: red; font-size: 10pt;" onclick="editInFull(<?= $row[6] ?>, 1);" id="a<?= $row[6] ?>">Edit this story</a></p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <?php
                            }
                            ?>
                            <p><a href="javascript:void(0);" onclick="addOne(3);" style="color: red;">New small entry</a></p>
                            <div class="small-entries"></div>
                            </ul>  
                        </td>
                    </tr>
                </tbody>
            </table>
            </td>
            <td width="180" valign="top" bgcolor="#D8DFEA" bordercolor="#FFFFFF" border="1"><!--sidebar content wrapper -->
            <table width="180" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td width="180" valign="top" height="200" colspan="3"><img width="180" height="200" title="" alt="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/templateimages/gradient.jpg" /></td>
                    </tr>
                    <tr>
                        <td width="17"><img width="12" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/2spacer.gif" alt="" /></td>
                        <td><!-- sidebar -->
                        <table width="134" cellspacing="0" cellpadding="0" style="padding-right: 0pt; padding-left: 0pt; font-size: 12px; padding-bottom: 0pt; padding-top: 10px; font-family: Arial,Helvetica,sans-serif">
                            <tbody>
                                <tr>
                                    <td>
                                    <p style="font-weight: bold; font-size: 12px; color: #003366"><img width="134" height="2" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/blue2.gif" alt="" /></p>
                                    <p style="line-height:0px"><a href="http://www.engin.umich.edu/newscenter/pubs/engineer"><img title="link to the Michigan Engineer magazine" longdesc="image link to the Michigan Engineer magazine" alt="link to the Michigan Engineer magazine" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/templateimages/mich-engineer.jpg" style="border-right: none; border-top: none; border-left: none; border-bottom: none" /></a> <br />
                                    <a href="http://www.facebook.com/michigan.engineering"><img title="link to Facebook" longdesc="image link to Facebook fan page" alt="link to Facebook" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/templateimages/micheng-fb.jpg" style="border-right: none; border-top: none; border-left: none; border-bottom: none" /></a> <br />
                                    <a href="http://www.twitter.com/UMengineering"><img title="link to Twitter" longdesc="image link to Twitter page" alt="link to Twitter" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/templateimages/micheng-tw.jpg" style="border-right: none; border-top: none; border-left: none; border-bottom:thin; border-bottom-color:#D8DFEA  " /></a><br />
                                    <a href="http://www.engin.umich.edu/info/alumni/giving-a-gift/"><img title="link to Michigan Engineering Fund" longdesc="image link to Michigan Engineering Fund page" alt="link to Michigan Engineering Fund" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/templateimages/micheng-giving.jpg" style="border-right: none; border-top: none; border-left: none; border-bottom:thin; border-bottom-color:#D8DFEA  " /></a><br />
                                    <a href="http://mconnex.engin.umich.edu/"><img title="link to MconneX" longdesc="image link to MconneX page" alt="Link to MconneX" src="http://engcomm.engin.umich.edu/august_enews/img/mconnexbadge.jpg" style="border-right: none; border-top: none; border-left: none; border-bottom:thin; border-bottom-color:#D8DFEA  " /></a><br />
                                    <a href="http://alumni.umich.edu/"><img title="link to Michigan Engineering Fund" longdesc="image link to Michigan Alumni Association" alt="link to Michigan Alumni Association" src="http://engcomm.engin.umich.edu/august_enews/img/alumniassoc.jpg" style="border-right: none; border-top: none; border-left: none; border-bottom:thin; border-bottom-color:#D8DFEA  " /></a><br />
                                    &nbsp;<br />
                                    <img width="134" height="2" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/blue2.gif" alt="" /></p>
                                    <p style="font-size: 12px; color: #111111; margin-left:10px;">To get all the latest Michigan Engineering news, subscribe to our <a href="http://www.engin.umich.edu/newscenter/rss/newscenter/feed.rss" style="color: #336699">RSS News Feed</a> or visit the <a href="http://www.engin.umich.edu/newscenter/" style="color: #336699">News Center</a>.</p>
                                    <p style="margin-left:10px;"><a href="http://www.magnetmail.net/Actions/new_forward_message_UMI_COE.cfm?message_id=INCLUDEMESSAGEID&amp;FTFId=947&amp;user_id=INCLUDEUSERID&amp;recipient_id=999999999" style="font-weight: bold; color: #336699">Forward to a friend</a></p>
                                    <br />
                                    &nbsp;<br />
                                    <img width="134" height="2" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/blue2.gif" alt="" />
                                    <p>&nbsp;</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </td>
                        <td width="17"><img width="17" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/2spacer.gif" alt="" /></td>
                    </tr>
                </tbody>
            </table>
            </td>
            <td width="3" bgcolor="#ffffff"><img width="3" title="" src="http://www.engin.umich.edu/newscenter/pubs/enews/images/2spacer.gif" alt="" /></td>
        </tr>
        <tr>
            <td height="15" bgcolor="#0064A4" colspan="4" style="border-top: 1; border-top-style: solid; border-top-color: #ffc425;">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="4">
            <p style="margin-top: 10px; margin-left: 20px; font-size: 12px; line-height: 130%"><a href="mailto:engcom@umich.edu" style="color: #336699">Contact Us</a> | <a href="http://www.magnetmail.net/Actions/new_forward_message_UMI_COE.cfm?message_id=INCLUDEMESSAGEID&amp;FTFId=947&amp;user_id=INCLUDEUSERID&amp;recipient_id=999999999" style="color: #336699">Forward</a> | <a href="http://www.giving.umich.edu/contacts/index.php?page=privacy" style="color: #336699">Privacy Policy</a> | <a href="http://www.magnetmail.net/Actions/unsubscribe.cfm?message_id=INCLUDEMESSAGEID&amp;user_id=INCLUDEUSERID&amp;recipient_id=999999999&amp;email=INCLUDEEMAILADDRESS&amp;group_id=INCLUDEGROUPID" style="color: #336699">Unsubscribe</a><br />
            Copyright 2012 The Regents of the University of Michigan, Ann Arbor, MI 48109 <br />
            &nbsp;</p>
            </td>
        </tr>
    </tbody>
</table>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

<?php
}
?>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/jquery-1.8.2.min.js"><\/script>')</script>
<script src="js/main.js"></script>
<script src="js/jquery-ui-1.9.2.custom.min.js"></script>
<script>
$(function() {
	$( "#sortable" ).sortable({
		update: changed
	});
	$( "#sortable" ).disableSelection();
});
</script>
<script>totalSmallEntries = <?php
		echo $counter-1;
	?>;</script>