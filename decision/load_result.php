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
		$results[$i] = str_split($_COOKIE["q{$i}"]);
	}
}
$str_results = implode("-", $results);

# Logic information
# $logic array format: key=answers from the quiz, in "q1-q2-q3-q4-q5", value is the order of image
$result = mysql_query("SELECT ans_id, q_id, logic FROM questions;");
if (!$result){
	print("Cannot load questions");
}

# Load and calculate the logic
$logic_db = array();
$logic_score = array();
$j = 0;
$temp_id = "A";
for ($i=0; $i<28; $i++){
	$j++;
	if ($i == 10) {
		$temp_id = "O"; $j = 1;
	} elseif ($i == 20) {
		$temp_id = "L"; $j = 1;
	}
	$logic_score["{$temp_id}{$j}"] = 0;
}
while ($row = mysql_fetch_row($result)){
	if (in_array($row[0], $results[$row[1]])) {
		$logic_ans = explode(";", $row[2]);
		for ($i=0; $i<count($logic_ans); $i++) {
			if (array_key_exists($logic_ans[$i], $logic_score)) {
				$logic_score[$logic_ans[$i]]++;
			}
		}
	}
}
arsort($logic_score);
$rank = (array_keys($logic_score));

# Load the top 6 best match result from the database based on the logic result
$result = mysql_query("SELECT * FROM results WHERE r_id='{$rank[0]}' OR r_id='{$rank[1]}' OR r_id='{$rank[2]}' OR r_id='{$rank[3]}' OR r_id='{$rank[4]}' OR r_id='{$rank[5]}';");
if (!$result){
	print("Cannot load questions");
}

# Prepare the content for output
$contents = array();
while ($row = mysql_fetch_row($result)){
	array_push($contents, array('r_id'=>$row[1], 'title'=>$row[2], 'description'=>$row[3], 'category'=>$row[4], 'subcategory'=>$row[5]));
}

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
				for ($i=0; $i<6; $i++){
					?>
					<li>
						<a href="#">
							<img class="scroll-img" src="img/scroll/scroll1.png" alt="<?= $contents[$i]['title'] ?>" />
							<div class="transparent"><span class="title"><?= $contents[$i]['title'] ?></span>
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
	# For the 'explore' page
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
	# For the 'next' page
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