<?php
require("database/db.php");
require_once("functions.php");

$q1 = "SELECT * FROM difference";
$result = mysql_query($q1);
$result_json = array();
for ($i=0; $i<3; $i++) {
	//echo "<!-- i: $i -->";
	while ($line = mysql_fetch_array($result)){	
	
		$rand = rand(0, 100);
		$class = " sm";
		
		if ($rand > 80) $class = " lg";
		
		if ($rand < 20) $color = "#2E282E";
		else if ($rand < 40) $color = "#8A404D";
		else if ($rand < 60) $color = "#FA5F53";
		else if ($rand < 80) $color = "#F1EEF5";
		else $color = "#8691CC";
		
		//echo "<!-- $rand -->";
		$image = $line['image1']; 
		$subtitle = limit_size($line['story'], $class);
		if ($line['color'] != "") $color = $line['color'];
		/*<!-- <?= $image ?> -->*/
		?>
		
		<div class="mason<?= $class?>" style="border: 6px solid <?= $color?>;">
			<a class="lightbox-image" id="<?= $line['id'] ?>" href="<?= $line['image1'] ?>"><img class="item" style="width:100%;" src="<?= $image?>" /></a>
			<div class="transparent" style="width: <?= $width?>px" id="a1">
				<span class="title"><a class="" href="inspiration">Page one</a></span>
				<span class="subtitle"><?= limit_size($subtitle, $class) ?></span>
			</div>
		</div>
		<?php
		array_push($result_json, array('id'=>$line['id'], 'href'=>$line['image1'], 'src'=>$image, 'class'=>$class, 'color'=>$color, 'width'=>$width, 'subtitle'=>$subtitle));
	}
}
$json_string = json_encode($result_json);
//print_r($json_string);

?>