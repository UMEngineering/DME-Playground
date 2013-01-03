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
    <title>eNews CMS</title>
</head>

<body>
	<div id="content">
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
        	<div class="nav"><a href="create.php" target=_blank>Create a new eNews</a></div>
        	<?php
			while($row = mysql_fetch_row($result)){
				?>
                <p>eNews <?= $row[0] ?>/<?= $row[1] ?>: <a href="edit.php?year=<?= $row[0] ?>&amp;month=<?= $row[1] ?>" target=_blank>Edit</a> | <a href="view.php?year=<?= $row[0] ?>&amp;month=<?= $row[1] ?>" target=_blank>View in HTML</a></p>
                <?php
			}
			?>
        </div>
    </div>
	
	
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery-1.8.2.min.js"><\/script>')</script>
</body>
</html>