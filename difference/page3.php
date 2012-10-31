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
                
                <?
					$q1 = "SELECT * FROM difference";
					$result = mysql_query($q1);
					for ($i=0; $i<3; $i++) {
						echo "<!-- i: $i -->";
						while ($line = mysql_fetch_array($result)){	
						
							$rand = rand(0, 100);
							$class = " sm";
							
							if ($rand > 80) $class = " lg";
							
							if ($rand < 20) $color = "#0B2272";
							else if ($rand < 40) $color = "#169BD8";
							else if ($rand < 60) $color = "#00C1AD";
							else if ($rand < 80) $color = "#F1A012";
							else $color = "#F20000";
							
							echo "<!-- $rand -->";
							$image = $line['image1']; 
							$subtitle = $line['story'];
							
							?>
							<!-- <?= $image ?> -->
							
							<div class="mason<?= $class?>" style="border: 6px solid <?= $color?>;">
								<a class="lightbox-image" id="<?= $line['id'] ?>" href="<?= $line['image1'] ?>"><img class="item" style="width:100%;" src="<?= $image?>" /></a>
								<div class="transparent" style="width: <?= $width?>px;" id="a1">
									<span class="title"><a class="" href="inspiration">Page three</a></span>
									<span class="subtitle"><?= limit_size($subtitle, $class) ?></span>
								</div>
							</div>
							
							
							<?
						}
					}
				?>
                <div id="page-nav" style="display: block;">
                    <a href="page2.php">Next</a>
                </div>	
            </div>
            

		</div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
        <script src="js/jquery.infinitescroll.min.js"></script>
        <script src="js/masonry.min.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
		
        <script>
			$(document).ready(function(){
				var $container = $('#container');
				$container.imagesLoaded(function(){
				  $container.masonry({
					itemSelector: '.mason'
				  });
				});
				
				$container.infinitescroll({
					navSelector  : '#page-nav',    // selector for the paged navigation 
					nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
					itemSelector : '.mason',     // selector for all items you'll retrieve
					loading: {
					  finishedMsg: 'No more pages to load.',
					  img: 'http://i.imgur.com/6RMhx.gif'
					}
					},
					// trigger Masonry as a callback
					function( newElements ) {
					// hide new items while they are loading
					var $newElems = $( newElements ).css({ opacity: 0 });
					// ensure that images load before adding to masonry layout
					$newElems.imagesLoaded(function(){
						console.log("Loading new images");
					  // show elems now they're ready
					  $newElems.animate({ opacity: 1 });
					  $container.masonry( 'appended', $newElems, true ); 
					});
					}
				);
				
					
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
