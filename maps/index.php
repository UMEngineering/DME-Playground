<? if (!extension_loaded('gd')) {
	if (!dl('gd.so')) {
	   exit;
	}
   }
?>
<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
       Remove this if you use the .htaccess -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Michigan Engineering</title>
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- Mobile viewport optimized: j.mp/bplateviewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Place favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">

  <!-- Page styles -->
  <!--link type='text/css' href='css/demo.css' rel='stylesheet' media='screen' /-->

  <!-- Contact Form CSS files -->
  <link type='text/css' href='css/contact.css' rel='stylesheet' media='screen' />

  <!--mp3 player-->
  <link href="css/blue.monday/jplayer.blue.monday.css" rel="stylesheet" type="text/css" />
  <!-- CSS: implied media="all" -->
  <!--link rel="stylesheet" href="css/style.css?v=2"-->
  <link rel="stylesheet" href="css/maps.css?v=2">
  <link href='http://fonts.googleapis.com/css?family=Cookie|Rochester' rel='stylesheet' type='text/css'>

  <!-- Uncomment if you are specifically targeting less enabled mobile browsers
  <link rel="stylesheet" media="handheld" href="css/handheld.css?v=2">  -->

  <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  <script>document.cookie='resolution='+Math.max(screen.width,screen.height)+'; path=/';</script>
  <script src="js/libs/modernizr-1.7.min.js"></script>
<!--[if gte IE 6]>
	<link href="css/ie.css" rel="stylesheet" type="text/css" />
    <link href="css/ie_png.css" rel="stylesheet" type="text/css" />
<![endif]-->
<!--[if lt IE 9]>
<script>
document.createElement('header');
document.createElement('nav');
document.createElement('section');
document.createElement('article');
document.createElement('aside');
document.createElement('footer');
document.createElement('hgroup');
</script>
<![endif]-->
</head>

<body>

  <div id="container">
	
    <div class="lightbox">
    	<div id="lbcontainer">
            <a href="#" id="close"><img src="" alt="close" /></a>
            <div class="mainimg"></div>
            <ul id="thumbnails"></ul>
        </div>
    </div>
    
    
    <div class="mapready" id="googlemap">
    
      
       
    </div>
    
    <div id="snow">
    	
    </div>

    <!--form method="post" action="" name="search" id="search">
         <input style="width: 240px;color: #cccccc;" value="Search by name, group, or department." type="text" name="q" />
    </form-->
    
    
   		<div id="globe">
            <a href="#" id="start">Start exploring!</a><br />
       </div>
       
       


    
  </div> <!--! end of #container -->


  <!-- JavaScript at the bottom for fast page loading -->
  <script type="text/javascript"
	  src="http://maps.googleapis.com/maps/api/js?sensor=false">
  </script>
  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if necessary -->
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"></script>  
  <script>window.jQuery || document.write("<script src='js/libs/jquery-1.5.1.min.js'>\x3C/script>")</script>

  <!-- scripts concatenated and minified via ant build script-->
  <script src="js/jquery.simplemodal.1.4.1.min.js"></script>
  <script src="js/plugins.js"></script>
  <script src="js/script.js"></script>
  <script src="js/livesearch.js"></script>
  <script src="js/tooltip.js"></script>
  
  <script type="text/javascript">
  	$(document).ready(function(){
		$("li a.thumbnail").live("click", function(e) {
			e.preventDefault();
			console.log($(this).attr("data-id"));	
			$("img.current").hide();
			$("img#img"+$(this).attr("data-id")).addClass("current").show();
		});
		
		$(".showlb").live("click", function(e){
			e.preventDefault();
			console.log("Passing in ",$(this).data("id"));
			var ph = $(this).data("id").toString();
			mapLightbox(ph);
		});
		
	});
  
  
  </script>
  
  <script src="js/main.js"></script>
  <!-- end scripts-->


  <!--[if lt IE 7 ]>
    <script src="js/libs/dd_belatedpng.js"></script>
    <script>DD_belatedPNG.fix("img, .png_bg"); // Fix any <img> or .png_bg bg-images. Also, please read goo.gl/mZiyb </script>
  <![endif]-->


  <!-- mathiasbynens.be/notes/async-analytics-snippet Change UA-XXXXX-X to be your site's ID -->
  <script>
    var _gaq=[["_setAccount","UA-27100008-1"],["_trackPageview"]];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
    g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
    s.parentNode.insertBefore(g,s)}(document,"script"));
  </script>

</body>
</html>