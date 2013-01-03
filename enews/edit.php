<?php
require_once("../../db.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Edit eNews CMS</title>
</head>

<body>
	<div id="content">
    	<?php
		if (strlen($_GET["year"]) == 4 && strlen($_GET["month"]) == 2) {
			// Fetch the result from database
			$year = $_GET["year"];
			$month = $_GET["month"];
			$query = "SELECT title, img, type, description, href, id, orders FROM enews WHERE year={$_GET['year']} AND month={$_GET['month']};";
			$result = mysql_query($query);
			if (!$result){
				die("Cannot load questions");
			}
		?>
            <h1>eNews <?= $year ?>/<?= $month ?>
            </h1>
            <div class="nav"><a href="index.php">Home</a> | <a href="create.php">Create a new eNews</a></div>
            <p style="color: red;">
            <?php
            if ($_GET["err"] == '0'){
				echo "Edit success!";
			}
            ?>
            </p>
            <?php
            $counter = 1;
            while ($row = mysql_fetch_row($result)){
                if ($row[2] == '0'){
            ?>
            
            <form method="POST" action="process.php">
                <div class="big-entry">
                    <h2>The top entry (display at the top of enews with big image)</h2>
                    <p>There will be only one top entry</p>
                    <p><label>Title: </label><input type="text" name="title-big" id="title-big" size="80" value="<?=$row[0]?>"/></p>
                    <p><label>Image: </label><input type="text" name="image-big" id="image-big" size="80" value="<?=$row[1]?>"/></p>
                    <p><label>Upload image: </label><input type="file" name="file" /></p>
                    <p><label>Description: </label><textarea rows="10" cols="50" name="desc-big" id="desc-big"><?=$row[3]?></textarea></p>
                    <p><label>Link: </label><input type="text" name="href-big" id="href-big" size="80" value="<?=$row[4]?>"/></p>
                    <input type="hidden" name="order-big" value="0" />
                    <input type="hidden" name="type" value="big" />
                    <input type="hidden" name="id" value="<?= $row[5] ?>" />
                    <input type="hidden" name="year" id="year" value="<?= $year ?>" />
                    <input type="hidden" name="month" id="month" value="<?= $month ?>" />
                    <p><input type="submit" value="update" name="update" /></p>
                </div>
            </form>
            <?php
                } else {
            ?>
            <form method="POST" action="process.php">
            <?php
				if ($counter == 1){
			?>
                <div class="small-entries">
                    <h2>The small entries</h2>
                    <p>There can be multiple small entries</p>
            <?php
				}
			?>
                    <div class="small-entry" id="e<?=$counter?>">
                        <h3>eNews #<?=$counter?></h3>
                        <p><label>Title: </label><input type="text" name="title-small<?=$counter?>" id="title-small<?=$counter?>" size="80" value="<?=$row[0]?>"/></p>
                        <p><label>Image: </label><input type="text" name="image-small<?=$counter?>" id="image-small<?=$counter?>" size="80" value="<?=$row[1]?>"/></p>
                        <p><label>Description: </label><textarea rows="10" cols="50" name="desc-small<?=$counter?>" id="desc-small<?=$counter?>"><?=$row[3]?></textarea></p>
                        <p><label>Link: </label><input type="text" name="href-small<?=$counter?>" id="href-small<?=$counter?>" size="80" value="<?=$row[4]?>"/></p>
                    <p><label>Order: </label><input type="text" name="order-small<?=$counter?>" id="order-small<?=$counter?>" size="3" value="<?=$row[6]?>"/></p>
                    </div>
                    <input type="hidden" name="type" value="small<?= $counter ?>" />
                    <input type="hidden" name="id" value="<?= $row[5] ?>" />
                    <input type="hidden" name="year" value="<?= $year ?>" />
                    <input type="hidden" name="month" value="<?= $month ?>" />
                    <p><input type="submit" value="update" name="update" /> | <input type="submit" value="delete" name="delete" /></p>
                </div>
            </form>
            <?php
                	$counter++;
                }
            }
            ?>
            
            <p><a href="javascript:void(0);" onclick="addOne(2);">Add a new small eNew entry</a></p>
        
        <?php
		}
		?>
    </div>
	
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery-1.8.2.min.js"><\/script>')</script>
    <script src="js/main.js"></script>
</body>
</html>