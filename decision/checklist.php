<?php

function isIphone($user_agent=NULL) {
    if(!isset($user_agent)) {
        $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    }
    return (strpos($user_agent, 'iPhone') !== FALSE && strpos($user_agent, 'iPad') !== FALSE);
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
        <script type="application/javascript" src="js/vendor/add2home.js"></script>
        <link rel="stylesheet" href="css/add2home.css">

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/student.css">
        <link rel="stylesheet" href="css/pages.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body class="yui3-skin-sam">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

		<div id="container">
        	<div id="topcontainer">
            	<img id="main-logo" src="img/engin-logo2.png" alt="um-logo" />
                <?php
				if (!isIphone())
                	echo "<p class=\"right-text\">+ Add to Homescreen</p>";
				?>
            </div>
            
            <ul id="nav">
                <li>CHECKLIST</li>
                <span id="goback">Go Back</span>
            </ul>
            <div id="main">
            	<p>Your Admissions Checklist includes the list of task needed to enroll at Michigan Engineering. Click each box to check when complete.</p>
                <form id="checklist">
                	<div><input class="styled" id="c1" type="checkbox" name="step1" value="1" onclick="checkthis('c1')"/><p><span class="steps" id="c1p">STEP ONE</span><br />Receive your acceptance letter and view admitted student website.</p></div>
                	<div><input class="styled" id="c2" type="checkbox" name="step2" value="2" onclick="checkthis('c2')"/><p><span class="steps" id="c2p">STEP TWO</span><br />Submit $200 application deposit. The deposit can be paid via credit card or check. If paying by check, make payable to the University of Michigan College of Engineering and mail to 1000 University Ave, Suite 3A, Ann Arbor, MI 48108</p></div>
                	<div><input class="styled" id="c3" type="checkbox" name="step3" value="3" onclick="checkthis('c3')"/><p><span class="steps" id="c3p">STEP THREE</span><br />Receive your acceptance letter and view admitted student website.</p></div>
                </form>
            </div>
            <div class="bottom">
            	<div id="bottom-title">NEXT STEPS</div>
                <div id="img-nav-div">
                    <ul class="imgs-nav">
                        <li>
                            <a href="#"><img class="scroll-img" src="img/scroll/scroll1.png" alt="register" />
                            <div class="transparent"><span class="title">Register for Campus Day</span></div></a>
                        </li>
                        <li>
                            <a href="http://www.google.com/calendar/event?action=TEMPLATE&text=This%20is%20a%20test&dates=20121201/20121208&details=description&location=where%20test&trp=false&sprop=http%3A%2F%2Fwww.engin.umich.edu%2F&sprop=name:College%20of%20Engineering" target="_blank"><img class="scroll-img" src="img/scroll/scroll2.png" alt="putdate" />
                            <div class="transparent"><span class="title">Put dates onto your Google Cal</span></div></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        <script src="js/quiz_result.js"></script>
        <script src="js/vendor/yui-min.js"></script>
        <!--<script src="js/custom_checkbox.js"></script>-->
		<script>
        $(document).ready(function(){
			load_checklist();
		});
        </script>
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
