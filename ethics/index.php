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

        <link rel="stylesheet" href="css/flexslider.css">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/ethics.css">
        <script>document.cookie='resolution='+Math.max(screen.width,screen.height)+("devicePixelRatio" in window ? ","+devicePixelRatio : ",1")+'; path=/';</script>
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <script src="js/g.raphael-min.js"></script>
        <script type="text/javascript" src="//use.typekit.net/xyr4htp.js"></script>
        <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
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
            	<div id="top-header-nav"><a href="http://www.engin.umich.edu/" target=_blank><span class="color-red">COLLEGE</span></a> <img src="img/arrow.png" /> <a href="http://www.engin.umich.edu/about" target=_blank><span class="color-red">ABOUT</span></a> <img src="img/arrow.png" /> <a href="http://www.engin.umich.edu/college/about/news" target=_blank><span class="color-red">NEWS</span></a> <img src="img/arrow.png" /> <span>DIGITAL MULTIMEDIA EXPERIENCE</span></div>
            </div>
        </div>
		<div id="container">
        	<div class="story-container">
                <div class="story">
                    <h1 id="top-title">By Bill Clayton</h1>
                    <p>On Day One of Engineering 101 on the Princeton campus, not so many years ago, a professor strode into class, threw down his jacket and said to his students, “I just heard about a fantastic new invention. Virtually everyone in the world will want it. It’ll create millions of jobs and improve people’s quality of life. The inventor’s looking for investors. Who wants in?” </p>
                    <p class="pullquote">Engineers do things of consequence, sometime positive, sometimes negative, sometimes accidental, often widespread, occasionally irreversible.</p>

                    <p>Hands shot up. Yes! Yes! Of course we would! The collective look in their eyes said, “Engineering’s gonna make me rich, and I haven’t even pulled my first all-nighter.”</p>
                    <p>“But,” the professor said, wagging a finger, “this invention will kill a quarter of a million people each year.”</p>
                    <p>The hands went down slowly, as if the hands themselves had learned the lesson of the day: Engineers do things of consequence, sometime positive, sometimes negative, sometimes accidental, often widespread, occasionally irreversible. (By the way, the “new invention” in the professor’s scenario was the automobile.)</p>
					<p>He continued, telling his class that engineering does indeed deal with equations, physical laws and problem-solving, but it’s not that simple. Engineers often work at the intersection or technology and ethics.</p>
                    <p>Cynthia Finelli (BSE EE ’88, MSE ’89, PhD ’93) is the director of the Center for Research on Learning and Teaching in Engineering and a research associate professor. She’s also part of E3 (Exploring Ethical Decision-Making in Engineering), a multi-institutional team of engineering educators that studies engineering ethics. She notes that “using engineering to improve people’s lives requires more than an ability to build bridges and unravel the mysteries of DNA. Engineers need a moral center.” </p>
					
                </div>
            </div>
            <?php
			$count = 0;
			?>
            <div class="flexslider">
            	<ul class="slides">
				<?php
                for ($x=0; $x<3; $x++) {
                ?>
                <li>
                    <div class="question" id="s<?= $x+1 ?>">
                        <div class="question-container">
                            <div class="question-content">
                                <p class="what-do-you-think"><img class="q" src="img/q<?= $x?>.png" alt="q<?= $x?>" /><img class="wdyt" src="img/ethicsex.png" alt="what do you think?" /></p>
                                <?php
                                // Display the next question or not
                                $display_next = true;
                                
                                // Read first set of question
                                for ($i=0; $i<3; $i++){
                                    $row = mysql_fetch_row($result);
                                    ?>
                                    <div class="question-div active" id="question-div-<?= $count ?>"
                                    <?php
                                    if ($display_next){
                                        echo 'style="display: block;"';
                                    }
                                    ?>
                                    >
                                        <p class="question-p" data-q="<?= $count ?>" data-i="<?= $i?>" data-x="<?= $x?>"><?= $i+1 ?>. <?= $row[2] ?></p>
                                        <p class="question-form">
                                            <?php
                                            //if (!in_array($row[0], $not_include)){
                                            ?>
                                            <form method="POST" id="question-form-<?= $count ?>" action="post_result.php">
                                                <input type="hidden" name="q_id-<?= $count ?>" value="<?= $row[0] ?>" />
                                                <p class="yesno"><input type="radio" name="answer_<?= $count ?>" value="0" /><?= $row[3] ?><br /><input type="radio" name="answer_<?= $count ?>" value="1" /><?= $row[4] ?></p>
                                                <input type="hidden" name="set_id" value="<?= $row[1] ?>" />
                                                <input type="hidden" name="count" value="<?= $count ?>" />
                                                <!--input type="submit" name="submit-answer-<?= $count ?>" value="Submit your answer" onclick="submit_answer(<?= $count ?>); return false;" /-->
                                                <a href="#" onclick="submit_answer(<?= $count ?>); return false;" class="submitanswer" >Submit answer</a>
                                            </form>
                                            <?php
                                            //} else {
                                                //echo '<span>You have answered this question before, ';
                                                echo '<a class="viewresult" href="#" onclick="set_result(' . $count . '); return false;">view result</a>';
												if ($count%3 != 0){
                                                    echo '<!--a href="#" onclick="show_question(' . $count . ', 0); return false;">Prev question</a--> ';
                                                }
                                                if ($count%3 != 2){
                                                    echo '<span class="next"><a href="#" onclick="show_question(' . $count . ', 1); return false;">Next question</a></span>';
                                                }
                                                echo "</span>";
                                            //}
                                            ?>
                                        </p>
                                    </div>
                                    <?php
                                    $display_next = false;
                                    $count++;
                                }
                                ?>
                            </div>
                            <div class="results" id="result-<?= $x ?>">
                                <div class="result-choice">
                                    <?php
                                    for ($i=0; $i<3; $i++) {
                                    ?>
                                    <span class="q smallq<?= $i?>" id="aspan-<?= $i+($count-3) ?>" onclick="display_result(<?= $i+($count-3) ?>, <?= $x ?>); return false;">Q<?= $i+1 ?></span>
                                    <?php
                                    }
                                    ?>
                                </div>
                                <div id="chart-<?= $x ?>" class="charts">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
				<?php
                    }
                ?>
                </ul>
            </div>
        	<div class="story-container">
                <div class="story">
                    <p>The need for this moral center has raised its head over and over, often in unforgettable ways.</p>
                    <p class="pullquote">Using engineering to improve people’s lives requires more than an ability to build bridges and unravel the mysteries of DNA. Engineers need a moral center.</p>
                    <p>The designers of the Titanic equipped the ship with 1,178 lifeboat positions, knowing that the vessel carried 2,224 passengers and crew. When disaster struck, 1,515 people lost their lives, at least in part because of this single decision about lifeboats. The owners wanted to bill the ship as “unsinkable.” No one knows what the engineers were thinking, but even if they had just an inkling that the ship was in fact sinkable, was there any justification for providing lifeboat positions for only half the ship’s occupants? Was this a case of an ethical lapse or bad design - or both? </p>
					<p>Seven astronauts aboard the Challenger shuttle died tragically in an explosion during launch on January 28, 1986. Investigation showed that the failure of an "O-ring" seal in one of Challenger’s solid-fuel boosters led to the explosion. The investigation faulted NASA officials for allowing the shuttle to launch despite clear warnings by engineers from the Morton-Thiokol company, manufacturers of the booster rockets: launching the vehicle during cold weather could cause problems. Because each O-ring had a backup in place, NASA decided it was unlikely that both the primary and the backup would fail. This case raises a number of fundamental questions, such as issues was NASA’s judgment justified? Should engineers have pressed the issue more strongly, perhaps to officials other than those at NASA? (The Challenger accident is frequently used as a case study in subjects such as engineering safety, the ethics of whistle-blowing, communications, group decision-making and the dangers of groupthink).</p>
                    <p>These and other examples present issues that engineers face frequently and can be used to influence that moral center Finelli spoke of. E3 research shows that it’s possible to develop an engineer’s ability to make good decisions. “Students who cheat in college are more likely to become professionals predisposed to make unethical decisions,” she said. “Forty years of ational research shows that levels of cheating are higher in undergraduate engineering than in almost all other disciplines, and educators have the ability and the opportunity to have an impact on students’ decision-making processes.</p>
					
                </div>
            </div>
            <div class="flexslider">
            	<ul class="slides">
				<?php
                for ($x=3; $x<6; $x++) {
                ?>
                <li>
                    <div class="question" id="s<?= $x+1 ?>">
                        <div class="question-container">
                            <div class="question-content">
                                <p class="what-do-you-think"><img class="q" src="img/q<?= $x?>.png" alt="q<?= $x?>" /><img class="wdyt" src="img/ethicsex.png" alt="what do you think?" /></p>
                                <?php
                                // Display the next question or not
                                $display_next = true;
                                
                                // Read first set of question
                                for ($i=0; $i<2; $i++){
                                    $row = mysql_fetch_row($result);
                                    ?>
                                    <div class="question-div active" id="question-div-<?= $count ?>"
                                    <?php
                                    if ($display_next){
                                        echo 'style="display: block;"';
                                    }
                                    ?>
                                    >
                                        <p class="question-p" data-q="<?= $count ?>" data-i="<?= $i?>" data-x="<?= $x?>"><?= $i+1 ?>. <?= $row[2] ?></p>
                                        <p class="question-form">
                                            <?php
                                            //if (!in_array($row[0], $not_include)){
                                            ?>
                                            <form method="POST" id="question-form-<?= $count ?>" action="post_result.php">
                                                <input type="hidden" name="q_id-<?= $count ?>" value="<?= $row[0] ?>" />
                                                <p class="yesno"><input type="radio" name="answer_<?= $count ?>" value="0" /><?= $row[3] ?><br /><input type="radio" name="answer_<?= $count ?>" value="1" /><?= $row[4] ?></p>
                                                <input type="hidden" name="set_id" value="<?= $row[1] ?>" />
                                                <input type="hidden" name="count" value="<?= $count ?>" />
                                                <!--input type="submit" name="submit-answer-<?= $count ?>" value="Submit your answer" onclick="submit_answer(<?= $count ?>); return false;" /-->
                                                <a href="#" onclick="submit_answer(<?= $count ?>); return false;" class="submitanswer">Submit answer</a>
                                            </form>
                                            <?php
                                            //} else {
                                                //echo '<span>You have answered this question before, ';
                                                echo '<a class="viewresult" href="#" onclick="set_result(' . $count . '); return false;">view result</a>';
                                                if ($count%2 != 1){
                                                    echo '<!--a href="#" onclick="show_question(' . $count . ', 0); return false;">Prev question</a--> ';
                                                }
                                                if ($count%2 != 0){
                                                    echo '<span class="next"><a href="#" onclick="show_question(' . $count . ', 1); return false;">Next question</a></span>';
                                                }
                                                echo "</span>";
                                            //}
                                            ?>
                                        </p>
                                    </div>
                                    <?php
                                    $display_next = false;
                                    $count++;
                                }
                                ?>
                            </div>
                            <div class="results" id="result-<?= $x ?>">
                                <div class="result-choice">
                                    <?php
                                    for ($i=0; $i<2; $i++) {
                                    ?>
                                    <span class="q smallq<?= $i?>" id="aspan-<?= $i+($count-2) ?>" onclick="display_result(<?= $i+($count-2) ?>, <?= $x ?>); return false;">Q<?= $i+1 ?></span>
                                    <?php
                                    }
                                    ?>
                                </div>
                                <div id="chart-<?= $x ?>" class="charts">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
				<?php
                    }
                ?>
                </ul>
            </div>
            <div class="story-container">
                <div class="story">
                    <p>“We’ve made a lot of progress in identifying factors that influence the ethical decision-making of engineering undergraduates and, ultimately, this work will affect the engineering profession by producing engineers of the highest integrity. We’re helping to raise Michigan Engineering’s awareness of ethics and encouraging its students, faculty, staff and graduates, as well as engineers in general, to embrace ethical behavior.”</p>
                    <p>As technology grows more complex, choices become more difficult. For engineers, making an ethical choice is important on a global scale because technology now reaches people around the world. On a personal level, doing the right thing speaks volumes about a person’s character – people are ultimately the product of their choices.</p>
                    <p>It takes years to build a reputation – and five minutes to ruin it. One choice can be a life-and-death decision for engineers. That’s something they can learn on day one of Engineering 101; it’s something they must remember every day after.</p>
                </div>
            </div>
        </div>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
        <script src="js/main.js"></script>
        <script src="js/jquery.easing.1.3.js"></script>
        <script src="js/jquery.flexslider-min.js"></script>


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