<?php
require_once("../../db.php");
require_once("functions.php");

// Some global variables
$count_result = array();
$numbers_str = array("one", "two", "three");

// Randomly choose one number set
$set_questions = array();
$not_include = array();
if (isset($_COOKIE["answered"])) {
	$not_include = unserialize($_COOKIE["answered"]);
}

// Decide the client ip address, and skip the questions that already answered.
/*$user_id = get_userid();
if ($user_id){
	$sql = "SELECT DISTINCT set_id FROM ethic_answers WHERE user_id={$user_id}";
	$result = mysql_query($sql);
	if (!$result) {
		die ("Cannot load answer history.");
	}
	while($row = mysql_fetch_row($result)){
		array_push($not_include, $row[0] + 0);
	}
	
	for ($i=1; $i<=6; $i++){
		if (!in_array($i, $not_include)){
			array_push($set_questions, $i);
		}
	}
} else {
	$set_questions = array(1, 2, 3, 4, 5, 6);
}*/
for ($i=1; $i<=6; $i++){
	if (!in_array($i, $not_include)){
		array_push($set_questions, $i);
	}
}

// Randomly choose one set of question not answered yet
$left = true;
if (count($set_questions) == 0) {
	$left = false;
} else {
	$set = rand(0, count($set_questions)-1);
	$set = $set_questions[$set];
	$set = 1;
	
	//print_r($not_include);
	//print_r($set_questions);
	//print("<br />{$set}");
	
	$sql = "SELECT q_id, set_id, question, answer1, answer2 FROM ethic_questions WHERE set_id={$set};";
	$result = mysql_query($sql);
	if (!$result) {
		die("ERROR cannot load questions, please contact web administrator.");
	}
}
?>
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/ethics.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <script src="js/g.raphael-min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

		<div id="container">
			<?php
			// If there are some questions unanswered, then display the questions
			if ($left) {
			?>
            <ul id="questions">
				<form method="POST", action="post_result.php">
				<?php
				$count = 0;
				while ($row = mysql_fetch_row($result)) {
				?>
					<li class="question">
						<input type="hidden" name="q_id-<?= $count ?>" value="<?= $row[0] ?>" />
						<!--p>q_id: <?= $row[0] ?></p>
                        <p>How many people have answered this question: <?php echo get_count($row[0]); ?></p>
						<p>set_id: <?= $row[1] ?></p-->
						<p><b>Question:</b> <?= $row[2] ?></p>
						<p><?= $row[3] ?><input type="radio" name="answer_<?= $count ?>" value="0" /> <?= $row[4] ?><input type="radio" name="answer_<?= $count ?>" value="1" /></p>
					</li>
				<?php
					array_push($count_result, get_count($row[0]));
					$count++;
				}
				?>
					<input type="hidden" name="set_id" value="<?= $set ?>" />
					<input type="hidden" name="count" value="<?= $count ?>" />
					<input type="submit" name="submit-answer" value="Submit your answer" />
				</form>
			</ul>
            <script>var count_total = <?= $count ?>;</script>

			<div id="results">
            	<div id="result-choice">
                	<?php
					for ($i=0; $i<$count; $i++){
					?>
                    	<a href="#" id="<?= $numbers_str[$i] ?>">Result <?= $numbers_str[$i] ?></a>
                    <?php
					}
					?>
                </div>
				<div id="chart">
                	<?php
					for ($i=0; $i<$count; $i++){
					?>
						<div id="bar<?php echo $i+1; ?>"
                        <?php
                        	if ($count == 3) {
								// If there are three questions, then display three bars and adjust the position
								$left_position = 60 * ($i+1) + 80 * $i;
								echo "style=\"left: {$left_position}px;\"";
							}
                        ?>
                        ><span><?= $count_result[$i] ?> people</span></div>
                    <?php
					}
					?>
				</div>

			</div>
            <?php
			}
			?>
        </div>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
        <script src="js/main.js"></script>
        <script src="js/jquery.easing.1.3.js"></script>


        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script type="text/javascript">
         var _gaq = _gaq || [];
         _gaq.push(['_setAccount', 'UA-36986878-1']);
         _gaq.push(['_trackPageview']);

         (function() {
           var ga = document.createElement('script'); ga.type =
        'text/javascript'; ga.async = true;
           ga.src = ('https:' == document.location.protocol ? 'https://ssl' :
        'http://www') + '.google-analytics.com/ga.js';
           var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
         })();

        </script>
    </body>
</html>