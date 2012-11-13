<?php
# Connect to database
require_once("connect.php");

# Questions
$Q_COUNT = 5;
$exist_cookie = "true";
$results = array();
for ($i=1; $i<=$Q_COUNT; $i++){
	if(!array_key_exists("q{$i}",$_COOKIE)) {
		$exist_cookie = "false";
	} else {
		$results[$i] = $_COOKIE["q{$i}"];
	}
}
$str_results = implode("-", $results);

# Logic information
# $logic array format: key=answers from the quiz, in "q1-q2-q3-q4-q5", value is the order of image
$logic = array("23-45-23-45-2"=>"231450");
$order_image = "012345";	# Default order: 012345
if (array_key_exists($str_results, $logic)) {
	$order_image = $logic[$str_results];
}

# The six images in the result page
$images = array(array("img/scroll/scroll1.png", "Multidisciplinary Design program", "Multidisciplinary Design program", "#"),
				array("img/scroll/scroll2.png", "Arts &amp; Culture", "Arts &amp; Culture", "#"),
				array("img/scroll/scroll3.png", "Entrepreneurship", "Entrepreneurship", "#"),
				array("img/scroll/scroll1.png", "Undergrad Research", "Undergrad Research", "#"),
				array("img/scroll/scroll2.png", "Student Teams &amp; Organizations", "Student Teams &amp; Organizations", "#"),
				array("img/scroll/scroll3.png", "Honors Program", "Honors Program", "#"));



# =========== AJAX return start =============
# Pages: result, explore, next
if ($_REQUEST["page"] == "result"){
	# If the Ajax request is for the RESULT page
	if ($exist_cookie == "false"){
		?>
		<div id="content"><p>To see which opportunities you might be interested in, please take the customized quiz.</p>
		<a class="start" href="quiz.php">Start the quiz!</a>
		</div>
		<?php
	} elseif ($exist_cookie == "true") {
		?>
		<div id="result-explore"><span class="explore">Or explore</span></div>
		<div id="content">
			<p>Your answers indicate that you would be interested in the following opportunities at Michigan Engineering. But there are dozens more!</p>
			<a class="start" href="quiz.php">Take the quiz again</a>
		</div>
		<div id="result-div">
			<ul class="imgs-nav" id="result-image">
			<?php
				for ($i=0; $i<strlen($order_image); $i++){
					?>
					<li>
						<a href="<?= $images[$order_image[$i]][3] ?>">
							<img class="scroll-img" src="<?= $images[$order_image[$i]][0] ?>" alt="<?= $images[$order_image[$i]][1] ?>" />
							<div class="transparent"><span class="title"><?= $images[$order_image[$i]][2] ?></span>
						</a>
					</li>
					<?php
				}
			?>
			</ul>
		</div>
		<?php
	}
} elseif ($_REQUEST["page"] == "explore") {
	$categories = array("ACADEMICS", "OPPORTUNITIES", "LIFE &amp; ACTIVITIES");
	for ($i=0; $i<count($categories); $i++) {
		?>
        <ul class="inside-nav">
            <li><?= $categories[$i] ?></li>
        </ul>
        <div class="scroll-background">
            <div class="scrollview-right" id="scrollview-right<?= $i ?>">
                <ul class="imgs-nav">
					<?php
                    for ($j=0; $j<9; $j++) {
                        ?>
                        <li>
                            <a href="#"><img class="scroll-img" src="img/scroll/scroll1.png" alt="undergrad research" />
                            <div class="transparent"><span class="title">Undergrad Research</span></div></a>
                        </li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </div>
        <?php
	}
} elseif ($_REQUEST["page"] == "next") {
	$categories = array("NEXT STEPS", "MEET SOME STUDENTS", "EXPLORE ANN ARBOR", "MAKE CONNECTIONS");
	for ($i=0; $i<count($categories); $i++) {
		?>
        <ul class="inside-nav">
            <li><?= $categories[$i] ?></li>
        </ul>
        <div class="scroll-background">
            <div class="scrollview-right" id="scrollview-right<?= $i ?>">
                <ul class="imgs-nav">
					<?php
                    for ($j=0; $j<9; $j++) {
                        ?>
                        <li>
                            <a href="#"><img class="scroll-img" src="img/scroll/scroll1.png" alt="undergrad research" />
                            <div class="transparent"><span class="title">Undergrad Research</span></div></a>
                        </li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </div>
        <?php
	}
}
?>