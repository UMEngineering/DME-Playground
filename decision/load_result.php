<?php
# Connect to database
//require_once("connect.php");
require_once("functions.php");
require_once("../../db.php");
//require_once("database/db.php");

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
						<a href="#detail" onclick="displayPage('<?= $contents[$i]['r_id'] ?>');">
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
         <div id="result-div-detail" style="display: none;">
            <ul class="slides">
            	<li>
                	<ul class="imgs-nav imgs-nav-desktop" id="result-image">
                	<?php
					for ($i=0; $i<4; $i++){
						?>
                        <li id="d<?= $contents[$i]['r_id'] ?>">
                            <a href="#detail" onclick="displayPage('<?= $contents[$i]['r_id'] ?>');">
                                <img class="scroll-img" src="<?= $contents[$i]['img_src'] ?>" alt="<?= $contents[$i]['title'] ?>" />
                                <div class="transparent"><span class="title"><?= $contents[$i]['title'] ?></span></div>
                            </a>
                            <div class="content-for-page" id="content<?= $contents[$i]['r_id'] ?>" style="display: none;">
                                <span class="title<?= $contents[$i]['r_id'] ?>"><?= $contents[$i]['title'] ?></span>
                                <span class="category"><?= $contents[$i]['category'] ?></span>
                                <span class="subcategory"><?= $contents[$i]['subcategory'] ?></span>
                                <span class="description"><?= $contents[$i]['description'] ?></span>
                            </div>
                        </li>
                        <?php
					}
					?>
                    </ul>
                </li>
                <li>
                	<ul class="imgs-nav imgs-nav-desktop" id="result-image">
                	<?php
					for ($i=4; $i<6; $i++){
						?>
                        <li id="d<?= $contents[$i]['r_id'] ?>">
                            <a href="#detail" onclick="displayPage('<?= $contents[$i]['r_id'] ?>');">
                                <img class="scroll-img" src="<?= $contents[$i]['img_src'] ?>" alt="<?= $contents[$i]['title'] ?>" />
                                <div class="transparent"><span class="title"><?= $contents[$i]['title'] ?></span></div>
                            </a>
                            <div class="content-for-page" id="content<?= $contents[$i]['r_id'] ?>" style="display: none;">
                                <span class="title<?= $contents[$i]['r_id'] ?>"><?= $contents[$i]['title'] ?></span>
                                <span class="category"><?= $contents[$i]['category'] ?></span>
                                <span class="subcategory"><?= $contents[$i]['subcategory'] ?></span>
                                <span class="description"><?= $contents[$i]['description'] ?></span>
                            </div>
                        </li>
                        <?php
					}
					?>
                    </ul>
                </li>
            </ul>
		</div>
		<?php
	}
} elseif ($_REQUEST["page"] == "explore" || $_REQUEST["page"] == "next") {
	# For the 'explore' or 'next' page
	$categories = array(/*"NEXT STEPS", "MEET SOME STUDENTS", "EXPLORE ANN ARBOR", "MAKE CONNECTIONS"*/);
	$request_page = $_REQUEST["page"];
	
	# Load the photos from database
	if ($request_page == "explore") {
		$result = mysql_query("SELECT title, img_src, category, id, outside_href FROM results ORDER BY category;");
	} else {
		$result = mysql_query("SELECT title, imgsrc, subcategory, id, outside_href FROM pages WHERE category=\"{$request_page}\" ORDER BY subcategory;");
	}
	if (!$result){
		print("Cannot load info from PAGE");
	}
	
	# For mobile version
	$start = 0;
	$category_index = -1;
	$target_blank = "";
	while ($row = mysql_fetch_row($result)) {
		if ($row[4] != "") {
			$out_href=$row[4];
			$target_blank = "target=_blank";
		} else { 
			$out_href="#detail";
			$target_blank = "";
		}
		if (!in_array($row[2], $categories)) {
			$count = 1;
			$category_index++;
			array_push($categories, $row[2]);
			if ($start != 0) echo "</ul></div></div>";?>
            <ul class="inside-nav display-when-mobile" id="category<?= $category_index ?>">
                <li><?= strtoupper($categories[$category_index]) ?></li>
            </ul>
        	<!-- Display this in mobile version -->
            <div class="scroll-background display-when-mobile">
                <div class="scrollview-right" id="scrollview-right<?= $category_index ?>">
                    <ul class="imgs-nav">
            <?php
		}?>
                        <li class="m-bottom-nav-<?= $row[3] ?>">
                            <a href="<?= $out_href ?>" <?= $target_blank ?>
                            <?php
                            if ($out_href=="#detail") {?>onclick="changePageDetail(<?= $row[3] ?>, '<?= strtoupper($categories[$category_index]) ?>', 'scrollview-right<?= $category_index ?>', '<?= $request_page ?>')";
							<?php
							}?>><img class="scroll-img" src="<?= $row[1] ?>" alt="<?= $row[0] ?>" />
                            <div class="transparent"><span class="title"><?= $row[0] ?></span></div></a>
                        </li>
        <?php
		$start++;
	}
	echo "</ul></div></div>";
	
	# Desktop Version
	mysql_data_seek($result,0);
	$start = 0;
	$category_index = -1;
	while ($row = mysql_fetch_row($result)) {
		if ($row[4] != "") {
			$out_href=$row[4];
			$target_blank = "target=_blank";
		} else { 
			$out_href="#detail";
			$target_blank = "";
		}
		if ($row[2] != $categories[$category_index]) {
			$category_index++;
			if ($count % 4 != 0) echo "</ul></li>";
			if ($start != 0) echo "</ul></div>";
			$count = 0;
			?>
            <ul class="inside-nav display-when-desktop" id="category<?= $category_index ?>">
                <li><?= strtoupper($categories[$category_index]) ?></li>
            </ul>
            <!-- Display this in desktop version -->
            <div class="scroll-background display-when-desktop flexslider" id="desk-scrollview-right<?= $category_index ?>">
            	<ul class="slides">
            <?php
		}
	?>
        
            <?php
            if ($count % 4 == 0) echo "<li><ul class=\"imgs-nav imgs-nav-desktop {$count}\">";
            ?>
                    <li class="d-bottom-nav-<?= $row[3] ?>">
                            <a href="<?= $out_href ?>" <?= $target_blank ?>
                            <?php
                            if ($out_href=="#detail") {?>onclick="changePageDetail(<?= $row[3] ?>, '<?= strtoupper($categories[$category_index]) ?>', 'scrollview-right<?= $category_index ?>', '<?= $request_page ?>')";
							<?php
							}?>><img class="scroll-img" src="<?= $row[1] ?>" alt="<?= $row[0] ?>" />
                            <div class="transparent" style="bottom: 67px;"><span class="title"><?= $row[0] ?></span></div></a>
                    </li>
            <?php
			$count++;
			if ($count % 4 == 0) echo "</ul></li>";
            ?>
        <?php
		$start++;
	}
	if ($count % 4 != 0) echo "</ul></li>";
	echo "</ul></div>";
} elseif ($_REQUEST["page"] == "detail" && !empty($_REQUEST["id"]) && !empty($_REQUEST["typePage"])) {
	# For detail page (when click on a image)
	$id = $_REQUEST["id"];
	load_page($id, $_REQUEST["typePage"]);
}
?>