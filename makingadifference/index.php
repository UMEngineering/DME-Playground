<?php
	require("../../db.php");
	require_once("functions.php");
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
        <link rel="stylesheet" href="css/difference.css">
    	<link rel="stylesheet" type="text/css" href="css/jquery.lightbox-0.5.css" media="screen" />
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <script type="text/javascript" src="//use.typekit.net/eys6qmh.js"></script>
		<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
        <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
		<script type="text/javascript">stLight.options({publisher: "39723eac-eec9-4aea-a4c7-aa9cb890e47a"});</script>
    </head>
    <body>
    	<div class="lightbox">
        	<div id="round">
                <span id="closebox">x</span>

                <div id="wufoo-m7x3w7" class="">
                    Fill out my <a href="http://bencollins2.wufoo.com/forms/m7x3w7">online form</a>.
                    </div>
                    <script type="text/javascript">var m7x3w7;(function(d, t) {
                    var s = d.createElement(t), options = {
                    'userName':'bencollins2', 
                    'formHash':'m7x3w7', 
                    'autoResize':true,
                    'height':'1381',
                    'async':true,
                    'header':'show'};
                    s.src = ('https:' == d.location.protocol ? 'https://' : 'http://') + 'wufoo.com/scripts/embed/form.js';
                    s.onload = s.onreadystatechange = function() {
                    var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return;
                    try { m7x3w7 = new WufooForm();m7x3w7.initialize(options);m7x3w7.display(); } catch (e) {}};
                    var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr);
                    })(document, 'script');</script>
                </div>
            </div>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
            <div class="sticky" id="nav">
                <ul>
                    <li class="home"><a href="http://engin.umich.edu"><img src="img/mighigan_engineering_25.png" alt="Michigan Engineering" /></a></li>
                    <li class="dmegallery"><a href="http://www.engin.umich.edu/newscenter/dme">Digital Multimedia Experience Gallery</a><a id="circle" href="http://www.engin.umich.edu/newscenter/dme"></a></li>
                </ul>
            </div>        
            <div id="main" role="main">
          	<h1>Making a Difference</h1>
            <h2>See how Michigan Engineers have been empowered to make a difference in the world</h2>
        	
            
            
            <div id="container">
                
            </div>
            <div id="page-nav" style="display: block;">
                <a class="cursor" onclick="getimages(1)">Next</a>
            </div>	
            
            <div id="sharing">
                <span class='st_facebook_large' displayText='Facebook'></span>
                <span class='st_googleplus_large' displayText='Google +'></span>
                <span class='st_twitter_large' displayText='Tweet'></span>
                <span class='st_stumbleupon_large' displayText='StumbleUpon'></span>
                <span class='st_pinterest_large' displayText='Pinterest'></span>
                <span class='submit' displayText="Submit your own photo"></span>
            </div>

		</div>
        <div class="hideme">Submit your own photo! &rarr;</div>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script src="js/jquery.infinitescroll.min.js"></script>
        <script src="js/masonry.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        
        <script src="js/vendor/jquery.lightbox-0.5.min.js"></script>
        <script>
			var loading = 1;
			var current = 0;
			var amount = 25;
			function hide() {
				$(".hideme").animate({opacity: '0'}, 1000, 'swing');	
			}
			$(document).ready(function(){
				getimages(0);
				
				$(".hideme").animate({
					right: '0px'
				  }, 3000, 'swing', function() {
					  setInterval(hide, 3000);
				});
				
				// If does not support opacity
				if ($("html.no-opacity").html()) {
					$("span.submit").click(function(e){
						$(".lightbox").css({"display":"block"});
					});
					$("span#closebox, div.lightbox").click(function(e){
						$(".lightbox").css({"display":"none"});
					});
					$(window).keydown(function(e){
						console.log("TEST");
						console.log(e.keyCode);
						if (e.keyCode == "27") {
							$(".lightbox").css({"display":"none"});
						}
					});
				} else {
					$("span.submit").click(function(e){
						$(".lightbox").css({"opacity":"1","pointer-events":"all"});
					});
					$("span#closebox, div.lightbox").click(function(e){
						$(".lightbox").css({"opacity":"0","pointer-events":"none"});
					});
					$(window).keydown(function(e){
						console.log("TEST");
						console.log(e.keyCode);
						if (e.keyCode == "27") {
							$(".lightbox").css({"opacity":"0","pointer-events":"none"});
						}
					});
				}
				
				// Load more when scroll down
				$(window).scroll(function(){
					//$("#test3").html(+" = "+$(window).scrollTop());
					var value = $(document).height() - $(window).height();
					if (($(window).scrollTop() <= value+0 && $(window).scrollTop() >= value-0) && $("#nomore").text() == "" && loading == 0){
						loading = 1;
						getimages(1);
						//current = current + amount;
					}
				});
			});
			
			// Create lightbox for each image
			function create_lightbox() {
				$(".lightbox-image").each(function(index, element) {
                    $(this).lightBox({fixedNavigation:true});
                });
			}
			
			function getimages(first){
				if ($("#nomore").text() == ""){
					var urlAjax = "pagejson.php?offset="+current+"&amount="+amount;
					var $container = $('#container');
					//alert(urlAjax);
					//alert(type);
					var response = $.ajax({url: urlAjax, success: function(){
						if (first == 0){
							// Load the first set of page
							console.log(response.responseText);
							$container.append(response.responseText);
							create_lightbox();
							$container.imagesLoaded(function(){
							  $container.masonry({
								itemSelector: '.mason'
								//isAnimated : 'true'
							  });
							});
							current = current + amount;
							amount = amount + amount;
						} else {
							// Load more images when user scroll down or click "next"
							var newElems = $(response.responseText);
							newElems.imagesLoaded(function(){
								$('#container').append(newElems).masonry('appended', newElems);
								create_lightbox();
								current = current + amount;
							});
						}
						loading = 0;
					}});
				}
			}
		</script>
        
        
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script type="text/javascript">

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-36416965-1']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		
		</script>
    </body>
</html>