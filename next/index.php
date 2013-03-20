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
        <link rel="stylesheet" href="css/next.css">
        <script>document.cookie='resolution='+Math.max(screen.width,screen.height)+("devicePixelRatio" in window ? ","+devicePixelRatio : ",1")+'; path=/';</script>
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
        <script type="text/javascript" src="//use.typekit.net/xyr4htp.js"></script>
        <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
        <script>
		  var short_ans = new Array();
		</script>
        <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
        <script type="text/javascript">stLight.options({publisher: "39723eac-eec9-4aea-a4c7-aa9cb890e47a", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
        
        <div class="sticky" id="nav">
            <ul>
                <li class="home"><a href="http://engin.umich.edu"><img src="img/mighigan_engineering_25.png" alt="Michigan Engineering" /></a></li>
                <!--<li class="dmegallery"><a href="http://www.engin.umich.edu/newscenter/dme">Digital Multimedia Experience Gallery</a><a id="circle" href="http://www.engin.umich.edu/newscenter/dme"></a></li>-->
                <li class="sticky-title"></li>
                <li class="sticky-sections">
                	<span id="stage">SECTION: </span>
                    <a href="#section-1" class="stage-a stage-1">1</a>
                    <a href="#section-2" class="stage-a stage-2">2</a>
                    <a href="#section-3" class="stage-a stage-3">3</a>
                    <a href="#section-4" class="stage-a stage-4">4</a>
                    <a href="#section-5" class="stage-a stage-5">5</a>
                </li>
            </ul>
            <div id="progress">
            	<div id="progressBar"></div>
            </div>
        </div>  

		<div id="container">
        	<div class="section" id="section-1">
            	<div class="video" id="top-video">
                	<div class="video-cover">
                    	<img src="img/placeholder.jpg" alt="title" />
                    </div>
                    <div id="player0"></div>
                	<!--<iframe class="youtubeVideo" width="560" height="315" src="http://www.youtube.com/embed/c2W_Zlt8J2Y" frameborder="0" allowfullscreen></iframe>-->
                </div>
            </div>
        	<div class="section" id="section-2">
            	<h1>2</h1>
            </div>
        	<div class="section" id="section-3">
            	<h1>3</h1>
            </div>
        	<div class="section" id="section-4">
            	<h1>4</h1>
            </div>
        	<div class="section" id="section-5">
            	<h1>5</h1>
            </div>
        </div>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
        <script src="js/main.js"></script>
		<script>
        var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	var player0;
	
	  function onYouTubeIframeAPIReady() {
		  player0 = new YT.Player('player0', {
			videoId: 'c2W_Zlt8J2Y',
			events: {
			  'onReady': function(event){ 
					//console.log("Loaded");
					 // Find all YouTube videos
						var $allVideos = $("iframe[src^='http://www.youtube.com']"),
							// The element that is fluid width
							$fluidEl = $("body");
						// Figure out and save aspect ratio for each video
						$allVideos.each(function() {
							$(this)
								.data('aspectRatio', this.height / this.width)
								
								// and remove the hard coded width/height
								.removeAttr('height')
								.removeAttr('width');
						});
						// When the window is resized
						// (You'll probably want to debounce this)
						$(window).resize(function() {
							var newWidth = $fluidEl.width();
							// Resize all videos according to their own aspect ratio
							$allVideos.each(function() {
								var $el = $(this);
								var newHeight = newWidth * $el.data('aspectRatio');
								$el
									.width(newWidth)
									.height(newWidth * $el.data('aspectRatio'));
								$("#top-video .video-cover").css({"height" : newHeight + "px"});
							});
						// Kick off one resize to fix all videos on page load
						}).resize();
			  },
			  'onStateChange': function(event){ var parent = $(event.target.a).parent()[0]; var overlay = $(parent).find(".video-cover")[0];var play = $(parent).find(".play")[0];if (event.data == 2) { $(overlay).fadeIn(500);$(play).fadeIn(1000);}}
			}
		  });
		}
	$(".video-cover").click(function(e){
		e.preventDefault();
		var overlay = $(this)/*, playbutton = $(".overlay .play");*/
		//console.log(overlay);
		$(overlay).fadeOut(500);
		//$(playbutton).fadeOut(200)
		player0.playVideo();
	  });
        </script>

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