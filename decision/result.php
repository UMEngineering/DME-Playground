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

        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/student.css">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/flexslider.css">
        <link rel="stylesheet" href="css/result.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body class="yui3-skin-sam">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

		<div class="container" id="container">
        	<div id="topcontainer">
            	<a href="index.html"><img id="main-logo" src="img/engin-logo2.png" alt="um-logo" /></a>
                <p class="right-text">+ Add to Homescreen</p>
            </div>
            
            <ul id="nav">
                <li class="current" id="result-nav"><a href="#result">Q'S RESULTS</a></li>
               	<li id="explore-nav"><a href="#explore">EXPLORE</a></li>
               	<li id="next-nav"><a href="#next">WHAT'S NEXT?</a></li>
            </ul>
            <div id="main" class="mainResult">
            
            </div>
        </div>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        <script src="js/quiz_result.js"></script>
        <script src="js/vendor/yui-min.js"></script>
        <script src="js/jquery.flexslider-min.js"></script>
        <script src="js/jquery.ba-hashchange.min.js"></script>
		<script>
		var prev_hash = "#result";
		var current_hash = window.location.hash;
		var explode_current = current_hash.split("-");
		if (current_hash != "#result" && !explode_current[1] && current_hash != "") {
			prev_hash = current_hash;
		}
        $(document).ready(function(){
			window.location.hash = prev_hash;
			$(window).hashchange( function(){
				var hash = location.hash;
				if (hash == "#result" || hash == "#explore" || hash == "#next") {
					var explode_hash = hash.split("-");
					if (explode_hash[1])	{
                        window.location.reload();//history.go(0);
                    }
					changePage(hash.replace( /^#/, '' ));
				} else {
					var hash_arr = hash.split("-");
					//changePage(hash_arr[0].replace( /^#/, '' ));
				}
				prev_hash = hash;
			});
			$(window).hashchange();
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
