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
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="css/student.css">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/result.css">
        <link rel="stylesheet" href="css/flexslider.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body class="yui3-skin-sam">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

		<div id="container">
        	<div id="topcontainer">
            	<img id="main-logo" src="img/engin-logo2.png" alt="um-logo" />
                <p class="right-text">+ Add to Homescreen</p>
            </div>
            
            <ul id="nav">
                <li class="current" id="result-nav"><a href="#" onclick="changePage('result');">Q'S RESULTS</a></li>
               	<li id="explore-nav"><a href="#" onclick="changePage('explore');">EXPLORE</a></li>
               	<li id="next-nav"><a href="#" onclick="changePage('next');">WHAT'S NEXT?</a></li>
            </ul>
            <div id="main">
            
            </div>
        </div>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        <script src="js/quiz_result.js"></script>
        <script src="js/vendor/yui-min.js"></script>
        <script src="js/jquery.flexslider-min.js"></script>
		<script>
        $(document).ready(function(){
			changePage("result");
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
