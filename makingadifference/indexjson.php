<?php
	require("database/db.php");
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
    </head>
    <body>
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
          
        
            <div id="container">
                
            </div>
            <div id="page-nav" style="display: block;">
                <a class="cursor" onclick="getimages(1)">Next</a>
            </div>	

		</div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script src="js/jquery.infinitescroll.min.js"></script>
        <script src="js/masonry.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        
        <script src="js/vendor/jquery.lightbox-0.5.min.js"></script>
        <script>
			var loading = 1;
			var current = 0;
			var amount = 15;
			$(document).ready(function(){
				getimages(0);
				
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
							$container.append(response.responseText);
							console.log(response.responseText);
							create_lightbox();
							$container.imagesLoaded(function(){
							  $container.masonry({
								itemSelector: '.mason'
								//isAnimated : 'true'
							  });
							});
							current = current + amount;
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
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>