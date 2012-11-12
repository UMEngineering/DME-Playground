<?php

# Connect to database
//require_once("connect.php");
require_once("functions.php");
require_once("database/db.php");

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
	array_push($contents, array('r_id'=>$row[1], 'title'=>str_replace("&", "&amp;", $row[2]), 'description'=>str_replace("&", "&amp;", $row[3]), 'category'=>str_replace("&", "&amp;", $row[4]), 'subcategory'=>str_replace("&", "&amp;", $row[5]), 'img_src'=>$row[6]));
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
					<li id="<?= $contents[$i]['r_id'] ?>">
						<a href="#" onclick="displayPage('<?= $contents[$i]['r_id'] ?>');">
							<img class="scroll-img" src="<?= $contents[$i]['img_src'] ?>" alt="<?= $contents[$i]['title'] ?>" />
							<div class="transparent"><span class="title"><?= $contents[$i]['title'] ?></span></div>
						</a>
                        <div class="content-for-page" id="content<?= $contents[$i]['r_id'] ?>" style="display: none;">
                        	<span class="title"><?= $contents[$i]['title'] ?></span>
                        	<span class="category"><?= $contents[$i]['category'] ?></span>
                        	<span class="subcategory"><?= $contents[$i]['subcategory'] ?></span>
                        	<span class="description"><?= $contents[$i]['description'] ?></span>
                        </div>
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
        <!-- Display this in mobile version -->
        <div class="scroll-background display-when-mobile">
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
        <!-- Display this in desktop version -->
        <div class="scroll-background display-when-desktop flexslider">
            <ul class="slides">
				<?php
                for ($k=0; $k<2; $k++) {
                ?>
                <li>
                    <ul class="imgs-nav">
                        <?php
                        for ($j=0; $j<4; $j++) {
                            ?>
                            <li>
                                <a href="#"><img class="scroll-img" src="img/scroll/scroll1.png" alt="undergrad research" />
                                <div class="transparent"><span class="title">Undergrad Research</span></div></a>
                            </li>
                        <?php
                        }
                        ?>
                    </ul>
                </li>
                <?php
                }
                ?>
            </ul>
        </div>
        <?php
	}
} elseif ($_REQUEST["page"] == "next") {
	# For the 'next' page
	$categories = array(/*"NEXT STEPS", "MEET SOME STUDENTS", "EXPLORE ANN ARBOR", "MAKE CONNECTIONS"*/);
	
	# Load the photos from database
	$result = mysql_query("SELECT title, imgsrc, subcategory, id FROM pages ORDER BY subcategory;");
	if (!$result){
		print("Cannot load info from PAGE");
	}
	
	$start = 0;
	$category_index = -1;
	while ($row = mysql_fetch_row($result)) {
		if (!in_array($row[2], $categories)) {
			$category_index++;
			array_push($categories, $row[2]);
			if ($start != 0) echo "</ul></div></div>";?>
            <ul class="inside-nav" id="category<?= $category_index ?>">
                <li><?= strtoupper($categories[$category_index]) ?></li>
            </ul>
            <div class="scroll-background">
                <div class="scrollview-right" id="scrollview-right<?= $category_index ?>">
                    <ul class="imgs-nav">
            <?php
		}?>
                        <li>
                            <a href="#" onclick="changePageDetail(<?= $row[3] ?>, '<?= strtoupper($categories[$category_index]) ?>', 'scrollview-right<?= $category_index ?>')"><img class="scroll-img" src="<?= $row[1] ?>" alt="<?= $row[0] ?>" />
                            <div class="transparent"><span class="title"><?= $row[0] ?></span></div></a>
                        </li>
        <?php
		$start++;
	}
	/*
	for ($i=0; $i<count($categories); $i++) {
		?>
        <ul class="inside-nav" id="category<?= $i ?>">
            <li><?= $categories[$i] ?></li>
        </ul>
        <div class="scroll-background">
            <div class="scrollview-right" id="scrollview-right<?= $i ?>">
                <ul class="imgs-nav">
					<?php
                    for ($j=0; $j<9; $j++) {
                        ?>
                        <li>
                            <a href="#" onclick="changePageDetail(1, '<?= $categories[$i] ?>', 'scrollview-right<?= $i ?>')"><img class="scroll-img" src="img/scroll/scroll1.png" alt="undergrad research" />
                            <div class="transparent"><span class="title">Undergrad Research</span></div></a>
                        </li>
                    <?php
                    }
                    ?>
                </ul>
            </div>
        </div>
        <?php
	}*/
} elseif ($_REQUEST["page"] == "detail" && !empty($_REQUEST["id"])) {
	# For detail page (when click on a image)
	$id = $_REQUEST["id"];
	load_page($id);
}
?>