<?php
require_once("../../db.php");
$query = "SELECT DISTINCT year, month FROM enews;";
$result = mysql_query($query);
if (!$result){
	die("Cannot load questions");
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" href="css/main.css">
    <title>eNews CMS</title>
</head>

<body>
	<div id="content">
        <h1 class="title">Engineering eNews Editor</h1>
    	<div>
        	<p style="color: red;">
            <?php
            if ($_GET["err"]=="0"){
				//echo "Create the eNews success!";
			}
			?>
            </p>
        </div>
    	<div>
        	<div class="new"><a href="create.php" target=_blank>Create new eNews</a></div>

            <ul id="results">
        	<?php
			while($row = mysql_fetch_row($result)){
				if (strlen($row[1]) == 1) $zero = "0";
				?>
                <li>eNews <?= $row[0] ?>/<?= $zero ?><?= $row[1] ?>: <a href="edit.php?year=<?= $row[0] ?>&amp;month=<?= $zero ?><?= $row[1] ?>" target=_blank>Edit</a> | <a href="view.php?year=<?= $row[0] ?>&amp;month=<?= $zero ?><?= $row[1] ?>" target=_blank>View in HTML</a> | <a href="text.php?year=<?= $row[0] ?>&amp;month=<?= $zero ?><?= $row[1] ?>" target=_blank>View in TEXT</a> | <a href="mobile.php?year=<?= $row[0] ?>&amp;month=<?= $zero ?><?= $row[1] ?>" target=_blank>View in mobile HTML</a></li>
                <?php
			}
			?>
        </ul>
        </div>
    </div>
	
	
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery-1.8.2.min.js"><\/script>')</script>
</body>
</html>