<?php
require_once("../../db.php");
require_once("functions.php");

// Some global variables
$count_result = array();
$numbers_str = array("one", "two", "three");

// Put questions into array for future use
$set_questions = array();
$not_include = array();
if (isset($_COOKIE["answered"])) {
	$not_include = unserialize($_COOKIE["answered"]);
}

for ($i=1; $i<=6; $i++){
	if (!in_array($i, $not_include)){
		array_push($set_questions, $i);
	}
}

$sql = "SELECT q_id, set_id, question, answer1, answer2 FROM ethic_questions;";
$result = mysql_query($sql);
if (!$result) {
	die("ERROR cannot load questions, please contact web administrator.");
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
        
        <div class="sticky" id="nav">
            <ul>
                <li class="home"><a href="http://engin.umich.edu"><img src="img/mighigan_engineering_25.png" alt="Michigan Engineering" /></a></li>
                <li class="dmegallery"><a href="http://www.engin.umich.edu/newscenter/dme">Digital Multimedia Experience Gallery</a><a id="circle" href="http://www.engin.umich.edu/newscenter/dme"></a></li>
            </ul>
        </div>  

        <div id="top-header">
            <div id="top-header-content">
            	<div id="top-header-logo"></div>
            	<div id="top-header-subtitle"></div>
            	<div id="top-header-nav"><span class="color-red">COLLEGE</span> <img src="img/arrow.png" /> <span class="color-red">ABOUT</span> <img src="img/arrow.png" /> <span class="color-red">NEWS</span> <img src="img/arrow.png" /> <span>DIGITAL MULTIMEDIA EXPERIENCE</span></div>
            </div>
        </div>
		<div id="container">
        	<div class="story-container">
                <div class="story">
                    <h1 id="top-title">By Bill Clayton</h1>
                    <p>On Day One of Engineering 101 on the Princeton campus, not so many years ago, a professor strode into class, threw down his jacket and said to his students, “I just heard about a fantastic new invention. Virtually everyone in the world will want it. It’ll create millions of jobs and improve people’s quality of life. The inventor’s looking for investors. Who wants in?” </p>
                    <p>Hands shot up. Yes! Yes! Of course we would! The collective look in their eyes said, “Engineering’s gonna make me rich, and I haven’t even pulled my first all-nighter.”</p>
                    <p>“But,” the professor said, wagging a finger, “this invention will kill a quarter of a million people each year.”</p>
                </div>
            </div>
            <?php
			$count = 0;
			?>
            <div class="question" id="q1">
            	<div class="question-container">
                    <div class="question-content">
                        <p class="what-do-you-think"><img src="img/whatdoyouthink.png" alt="what do you think?" /></p>
						<?php
                        // Display the next question or not
                        $display_next = true;
                        
                        // Read first set of question
                        for ($i=0; $i<3; $i++){
                            $row = mysql_fetch_row($result);
                            ?>
                            <div class="question-div" id="question-div-<?= $count ?>"
                            <?php
							if ($display_next){
								echo 'style="display: block;"';
							}
							?>
                            >
                                <p class="question-p"><?= $row[2] ?></p>
                                <p class="question-form">
                                    <?php
                                    if (!in_array($row[0], $not_include)){
                                    ?>
                                    <form method="POST" id="question-form-<?= $count ?>" action="post_result.php">
                                        <input type="hidden" name="q_id-<?= $count ?>" value="<?= $row[0] ?>" />
                                        <p><?= $row[3] ?><input type="radio" name="answer_<?= $count ?>" value="0" /> <?= $row[4] ?><input type="radio" name="answer_<?= $count ?>" value="1" /></p>
                                        <input type="hidden" name="set_id" value="<?= $row[1] ?>" />
                                        <input type="hidden" name="count" value="<?= $count ?>" />
                                        <input type="submit" name="submit-answer-<?= $count ?>" value="Submit your answer" onclick="submit_answer(<?= $count ?>); return false;" />
                                    </form>
                                    <?php
                                    } else {
                                        echo '<span>You have answered this question before, <a href="#" onclick="set_result(' . $count . '); return false;">view result</a><br /><br />';
										if ($count != 0){
											echo '<a href="#" onclick="show_question(' . $count . ', 0); return false;">Prev question</a> ';
										}
										if ($count != 2){
											echo ' <a href="#" onclick="show_question(' . $count . ', 1); return false;">Next question</a>';
										}
										echo "</span>";
                                    }
                                    ?>
                                </p>
                            </div>
                            <?php
							$display_next = false;
							$count++;
                        }
						?>
                    </div>
                    
                    <div class="results" id="result-1" style="display: block;">
                        <div class="result-choice">
                            <a href="#" class="one" id="a-0">Question 1</a>
                            <a href="#" class="two" id="a-1">Question 2</a>
                            <a href="#" class="three" id="a-2">Question 3</a>
                        </div>
                        <div id="chart">
                            
                        </div>
                    </div>
                </div>
            </div>
			<?php
			// If there are some questions unanswered, then display the questions
			//if ($left) {
			?>
            <ul id="questions">
				<?php
				$count = 0;
				
				// Display the next question or not
				$display_next = false;
				
				while ($row = mysql_fetch_row($result)) {
				?>
                        <li class="question" id="question-li-<?= $count ?>"
                        <?php
						if ($display_next){
							echo 'style="display: list-item;"';
						}
						?>
                        >
                            <p><b>Question:</b> <?= $row[2] ?></p>
                            <?php
							if (!in_array($row[0], $not_include)){
							?>
							<form method="POST" id="question-form-<?= $count ?>" action="post_result.php">
                                <input type="hidden" name="q_id-<?= $count ?>" value="<?= $row[0] ?>" />
                                <p><?= $row[3] ?><input type="radio" name="answer_<?= $count ?>" value="0" /> <?= $row[4] ?><input type="radio" name="answer_<?= $count ?>" value="1" /></p>
                                <input type="hidden" name="set_id" value="<?= $row[1] ?>" />
                                <input type="hidden" name="count" value="<?= $count ?>" />
                                <input type="submit" name="submit-answer-<?= $count ?>" value="Submit your answer" onclick="submit_answer(<?= $count ?>); return false;" />
                            </form>
                            <?php
								$display_next = false;
							} else {
								echo '<p>You have answered this question before, <a href="#" onclick="set_result(' . $count . '); return false;">view result</a></p>';
								$display_next = true;
							}
							?>
                        </li>
				<?php
					//array_push($count_result, get_count($row[0]));
					$count++;
				}
				?>
			</ul>
            <script>var count_total = <?= $count ?>;</script>

			<!--<div id="results" style="display: block;">
            	<div id="result-choice">
                	<a href="#" id="one">Question 1</a>
                	<a href="#" id="two">Question 2</a>
                    <a href="#" id="three">Question 3</a>
                </div>
				<div id="chart">
                	
				</div>
			</div>-->
            <?php
			//}
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