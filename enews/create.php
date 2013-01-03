<?php
require_once("file:///Macintosh HD/Users/marketing/Documents/db.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Create eNews CMS</title>
</head>

<body>
	<div id="content">
    	<div>
        	<p style="color: red;">
            <?php
			if ($_GET["err"]=="1"){
				echo "Cannot create this eNews: the eNews for this month and year already exists";
			} else if ($_GET["err"]=="0"){
				echo "Create the eNews success!";
			}
			?>
            </p>
        </div>
        <div class="nav"><a href="index.php">Home</a> | <a href="create.php">Create a new eNews</a></div>
        <form method="POST" action="process.php">
        	<p><label>eNews year and month (e.g. year:2012 month:12):</label>
                <input type="text" size="5" placeholder="year" maxlength="4" name="year" id="year" onchange="changeURL(1);" />
                <input type="text" size="5" placeholder="month" maxlength="2" name="month" id="month" onchange="changeURL(2);"/>
            </p><br />
            
            <div class="big-entry">
            	<h2>The top entry (display at the top of enews with big image)</h2>
                <p>There will be only one top entry</p>
                <p><label>Title: </label><input type="text" name="title-big" id="title-big" size="80"/></p>
                <p><label>Image: </label><input type="text" name="image-big" id="image-big" class="imageinput" size="80" value="http://engcomm.engin.umich.edu/mon_enews_13/img/1.jpg" /></p>
                <p><label>Description: </label><textarea rows="10" cols="50" name="desc-big" id="desc-big"></textarea></p>
                <p><label>Link: </label><input type="text" name="href-big" id="href-big" size="80" /></p>
            </div>
            
            <div class="small-entries">
            	<h2>The small entries</h2>
                <p>There can be multiple small entries</p>
                <div class="small-entry" id="e1">
                	<h3>eNews #1</h3>
                    <p><label>Title: </label><input type="text" name="title-small1" id="title-small1" size="80"/></p>
                    <p><label>Image: </label><input type="text" name="image-small1" id="image-small1" class="imageinput" size="80" value="http://engcomm.engin.umich.edu/mon_enews_13/img/2.jpg" /></p>
                    <p><label>Description: </label><textarea rows="10" cols="50" name="desc-small1" id="desc-small1"></textarea></p>
                    <p><label>Link: </label><input type="text" name="href-small1" id="href-small1" size="80" /></p>
                </div>
            </div>
            
            <p><a href="javascript:void(0);" onclick="addOne(1);">Add a new small eNew entry</a></p>
            <input type="submit" value="create" name="create" />
        </form>
    </div>
	
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery-1.8.2.min.js"><\/script>')</script>
    <script src="js/main.js"></script>
</body>
</html>