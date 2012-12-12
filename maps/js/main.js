// This is the main javascript for the UM Engineering Global Holiday Greeting.
// If you have any questions about the code, don't hesitate to email me at tkdman@umich.edu.
// Thanks!
// 
// Ben Collins

// Check if the browser is Internet Explorer and store the version.

var ie = (function(){
	var undef,
		v = 3,
		div = document.createElement('div'),
		all = div.getElementsByTagName('i');
	while (
		div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
		all[0]
	);
	return v > 4 ? v : undef;
}());
// Get URL variables.
function getUrlVars() {
	var map = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	return map;
}



//Check if it's an iPhone 
function iphone() {
	/*if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	   if (document.cookie.indexOf("iphone_redirect=false") == -1) return true;
	}		
	return false;*/
	if ($(window).width() <= 800){
		return true;
	}
	return false;
}

// < Lightbox function>
	
function mapLightbox(flickr_photoset) {
	$(".lightbox").show();
	
	$.ajax({ // ..for flickr photoset
		  url: 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=0a4c13223c53dc01af68bbecd1127ad2&photoset_id='+flickr_photoset+'&format=json&nojsoncallback=1', 
		  type: 'GET',
			dataType: 'json',
			success: function(data){
				
				
				
				console.log('Lightbox photoset data http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=0a4c13223c53dc01af68bbecd1127ad2&photoset_id='+flickr_photoset+'&format=json&nojsoncallback=1: ', data);
				$(data.photoset.photo).each(function(k, v){
					var this_url = 'http://farm'+v.farm+'.staticflickr.com/'+v.server+'/'+v.id+'_'+v.secret+'_c.jpg';
					var thumb_url = 'http://farm'+v.farm+'.staticflickr.com/'+v.server+'/'+v.id+'_'+v.secret+'_s.jpg';
					// If this is the first iteration, display the primary image first.
					var imgStr = '<img src="'+this_url+'" class="lightbox current" id="img'+v.id+'" />';
					var thumbStr = '<img src="'+thumb_url+'" class="thumbnail" id="thumb'+v.id+'" />';
					$(".lightbox .mainimg").append(imgStr);
					$(".lightbox #thumbnails").append(thumbStr);
					
				});
			
		  },//End success condition
		error: function(xhr, statusText, errorThrown){
			console.log('Server error: '+xhr.statusText+", "+xhr.errorThrown+", "+ xhr.responseText+", "+xhr.status);
		}
	});
}
	
// < / Lightbox function>

function resizer() {
	//Empty for now	
}

// Cache videos and other DOM objects.
var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed");

// Establish options for youtube embeds
var mode="wmode=opaque&allowscriptaccess=true&rel=0";
if (ie>6) mode = "rel=0";

// Map buffer will store map object later
var mapBuffer;

// Loop through each video and cache its properties.
$allVideos.each(function() {
var i = 0;
  $(this)
	// jQuery .data does not work on object/embed elements
	.attr('data-aspectRatio', this.height / this.width)
	.removeAttr('height')
	.removeAttr('width');
});



// Establish arrays to house various google map elements.  "infoWindows" will house the numerous google infoWindows, which will eventually
// contain each user's story or video.  "markers" contains all the marker objects (which also contain the latitude/longitude info).  
var infoWindows = new Array(), markers = new Array();

// This is an interesting patch I had to write.  Google Chrome has a bug where YouTube won't display inside a googlemap infoWindow.  To fix this,
// I put a placeholder div inside each infoWindow and put each youtube video in a div that's absolutely positioned on top of the map.  When
// the map is dragged, each youtube video watches the underlying DIV element and matches its position.  It seems like the google map is contained inside
// the infoWindow, but really it's on top.
function refreshMap() {
	for (key in infoWindows) {
		try {$("iframe#ifr_"+key).css({"left":$("div#"+key).offset()["left"]+"px", "top":$("div#"+key).offset()["top"]+"px", "display":"block"});}
		catch (err) {}
	}
}
// This makes sure the iFrame is no more than 50ms behind the google map's motion.  In reality, refreshMap should be called on the map's "drag" event
// but I added this as a failsafe.
setInterval(function(){refreshMap()}, 50);

var LAYER = getUrlVars()["layer"];
var LAT = getUrlVars()["lat"];
var LON = getUrlVars()["lon"];
var OPEN = getUrlVars()["open"];

LAT = parseFloat(LAT);
LON = parseFloat(LON);

// Create a new event called "loadmap" and bind it to the map's div.  Also create an "unloadmap" event, and bind that.  These will be fired when the page loads.
$("div#googlemap").bind("loadmap", function initialize() {
	$(this).removeClass("mapready").addClass("maploaded");

	if (isNaN(LAT) || isNaN(LON)) {
		console.log("The things were undefined!");
		var lat = 42.29011737230321, lon = -83.71559682724455;
		if (LAYER=="decision") var lat = 42.274705, lon = -83.744408;
	}
	else {
		var lat = LAT; var lon = LON;

	}
	var latlng = new google.maps.LatLng(lat, lon);
	console.log("LatLng",latlng);
//****** Set map options! ******	
	
	var myOptions = {
	  zoom: 8,
	  center: latlng,
	  scrollwheel: false,
	  panControl: false,
	  zoomControlOptions: {
		 position: google.maps.ControlPosition.RIGHT_TOP
	  },
	  mapTypeControlOptions: {
		 position: google.maps.ControlPosition.TOP_RIGHT
	  },
	 mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(this,
			myOptions);
	wholemap = map;
	mapBuffer = map;
	google.maps.event.addListener(map, 'click', function (event){ console.log("Click",event.latLng) });	
	
// ****************
// Here's the drag event.  When this happens, fire refreshMap() to make sure the overlayed youtube videos are following the infowindow.
// ****************

	google.maps.event.addListener(map, 'drag', function (event) { refreshMap();});
	google.maps.event.addListener(map, 'resize', function (event) { refreshMap();});
	var ii = 0;
	
// Map the appropriate marker, infoWindow, content and placeholder divs.

//  < Decision map function >

	function decisionMap (id, lat, lng, text, vid, vopen, name, description) {
		if (id == OPEN) vopen = 1;
		var id=String(lat).replace(".","").replace("-","");
		id += String(lng).replace(".","").replace("-","");
		console.log("ID:", id);
		var mpointer = String(lat)+String(lng);
		
		// The list of all markers to be displayed as "description"
		
		// Define the description string
		desc_string += "<li onclick='pantoNext("+temp_current+")'>"+name+"</li>";
		
		// Set "contentString"
		//**************************************************
		var contentString = '<div data-innerid="'+id+'" class="googleInfo" id="googleInfoa'+id+'" style="width: '+infoWindowW+'px; z-index: 100; max-height:'+infoWindowH+'px; overflow: hidden;">';
		var temp = new google.maps.LatLng(0, 0);
		if (name != "none") { contentString += '<div class="author">'+name+'</div>'; }
		else contentString += '<div class="spacer"></div>';
		contentString += '<div class="description">'+description+'</div>';
	
		contentString += '<div id="nav_prev_next" style="position: relative;"><span class="nextMarker" onclick="pantoNext(-98);" id="nextMarker'+id+'" style="float: left;">prev</span><span class="nextMarker" onclick="pantoNext(-99);" id="nextMarker'+id+'" style="float: right;">next</span></div></div>';
		//**************************************************

		var this_id = temp_current;
		temp_current++;
		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: infoWindowW
		});
		var LL = new google.maps.LatLng(lat, lng);
		
		// Create marker 
		var marker = new google.maps.Marker({
			  position: LL,
			  //icon: "img/mpin.png",
			  zIndexProcess: function() { return 1; }	
		});
		marker.setZIndex(0);
		//var mpointer = String(lat)+String(lng);
		// Place the current marker in the "markers" array. It's useful to keep track of everything we're working on in a global context.
		markers[mpointer]=marker;
		
		// ================================
		// Push the item into ordered array
		// ================================
		markers_inorder.push(marker);
		infoWindows_inorder.push(infowindow);
		video_inorder.push(vid);
		latlon_arr.push(LL);
		names_inorder.push(name);
		ids_inorder.push(id);
		
		
		if (vopen == 1) {
			infowindow.open(map,marker);
			if (id != null) {
				infoWindows[id]=infowindow;
			}
			var youtubeOverlay = '<iframe class="youtubeOverlay" id="ifr_'+id+'" style="position: absolute; top: 20px; left: 0px; display: none; z-index: 1010;" width="'+youtubeW+'" height="'+youtubeH+'" src="http://www.youtube.com/embed/'+vid+'?'+mode+'" frameborder="0" allowfullscreen></iframe>';
			$("iframe#ifr_"+id).load(function(){refreshMap();});
			$(".googleInfo").parent().css({"overflow":"hidden"});
			$("#googlemap").append(youtubeOverlay);
			//.open(map, markers[mpointer]);
			google.maps.event.addListener(infowindow,'closeclick',function(event){
				for (key in infoWindows) {
					$("iframe#ifr_"+key).remove();	
				}
			});
		}
		
		google.maps.event.addListener(marker, 'click', function() {
			for (key in infoWindows) {
				console.log("Close infowindow ", key);
				try { infoWindows[key].close(); }
				catch (e){}
				$("iframe#ifr_"+key).remove();	
			}
			infowindow.open(map,marker);
			var strIndex = String(infowindow.anchor.position.Pa+infowindow.anchor.position.Qa);
			if (id != null) {
				infoWindows[id]=infowindow;
			}
			console.log("iPhone:", iphone());
			var youtubeOverlay = '<iframe class="youtubeOverlay" id="ifr_'+id+'" style="position: absolute; top: 20px; left: 0px; display: none; z-index: 1010;" width="'+youtubeW+'" height="'+youtubeH+'" src="http://www.youtube.com/embed/'+vid+'?'+mode+'" frameborder="0" allowfullscreen></iframe>';
			$("iframe#ifr_"+id).load(function(){refreshMap();});
			infowindow.setContent(contentString);
			$(".googleInfo").parent().css({"overflow":"hidden"});
			//$("div[data-innerid="+id+"]").prepend(youtubeOverlay);
			$("#googlemap").append(youtubeOverlay);
			google.maps.event.addListener(infowindow,'closeclick',function(event){
				for (key in infoWindows) {
					$("iframe#ifr_"+key).remove();	
				}
			});
			//$(".description").html(desc_string);
			
			// ==========================Haoyi Yang EDITED 11/22===================================
			current = this_id;
			
			prev = current-1;
			if (prev < 0) prev = latlon_arr.length;
		});
		marker.setMap(map);	
		map.setZoom(16);
		current = latlon_arr.length-1;
	}

// </ Decision map function>	


//  < Holiday map function >
	function holidayMap (id, lat, lng, text, vid, vopen, name) {
		var id=String(lat).replace(".","").replace("-","");
		id += String(lng).replace(".","").replace("-","");
		
		// Set "contentString" differently for video or text.
		if (vid || vid != "") { 
			var contentString = '<div data-innerid="'+id+'" class="googleInfo" style="width: 420px; z-index: 100; height: 360px; max-height:360px; overflow: hidden;">';
			console.log("Video: ", vid);
			if (name != "none") { contentString += '<div class="author">'+name+'</div>'; }
			else contentString += '<div class="spacer"></div>';
			if (text == "none")	contentString += '<div id="'+id+'" class="youtubeHolder" style="opacity: 1 !important; z-index: 1000 !important; background-color: black !important;" width="420" height="315"></div><div class="clear">&nbsp;</div>';
			else {contentString += '<div class="story">';
				contentString += text+'</div>';
			}
			contentString += '</div>';
		}
		else { 
			var contentString = '<div data-innerid="'+id+'" class="googleInfo" style="width: 420px; z-index: 100; height: 360px; max-height:360px; overflow: scroll;">';
			console.log("No Video");
			if (name != "none") { contentString += '<div class="author">'+name+'</div>'; }
			else contentString += '<div class="spacer"></div>';
			if (text == "none")	contentString += '<div id="'+id+'" class="youtubeHolder" style="opacity: 1 !important; z-index: 1000 !important; background-color: black !important;" width="420" height="315"></div><div class="clear">&nbsp;</div>';
			else {contentString += '<div class="story">';
				contentString += text+'</div>';
			}
			contentString += '</div>';
		}
		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 420
		});
		var LL = new google.maps.LatLng(lat, lng);
		// Create marker 
		var marker = new google.maps.Marker({
			  position: LL,
			  //icon: "img/mpin.png",
			  zIndexProcess: function() { return 1; }	
		});
		marker.setZIndex(0);
		var mpointer = String(lat)+String(lng);
		// Place the current marker in the "markers" array. It's useful to keep track of everything we're working on in a global context.
		markers[mpointer]=marker;
		if (vopen == 1) {
			infowindow.open(map,marker);
		}
		google.maps.event.addListener(marker, 'click', function() {
			for (key in infoWindows) {
				console.log("Close infowindow ", key);
				try { infoWindows[key].close(); }
				catch (e){}
				$("iframe#ifr_"+key).remove();	
			}
			infowindow.open(map,marker);
			var strIndex = String(infowindow.anchor.position.Pa+infowindow.anchor.position.Qa);
			if (id != null) {
				infoWindows[id]=infowindow;
			}
			console.log("iPhone:", iphone());
			var youtubeOverlay = '<iframe class="youtubeOverlay" id="ifr_'+id+'" style="position: absolute; top: 20px; left: 0px; display: none; z-index: 1010;" width="250" height="141" src="http://www.youtube.com/embed/'+vid+'?'+mode+'" frameborder="0" allowfullscreen></iframe>';
			$("iframe#ifr_"+id).load(function(){refreshMap();});
			infowindow.setContent(contentString);
			$(".googleInfo").parent().css({"overflow":"hidden"});
			//$("div[data-innerid="+id+"]").prepend(youtubeOverlay);
			$("#googlemap").append(youtubeOverlay);
			google.maps.event.addListener(infowindow,'closeclick',function(event){
				for (key in infoWindows) {
					$("iframe#ifr_"+key).remove();	
				}
			});
		});
		marker.setMap(map);	
		map.setZoom(16);
	}

// </ Holiday map function>	


//  < Campus map function >

	function campusMap (id, lat, lng, name, subtitle, description, lnk, flickr_photoset, num_thumbs, address, department) {
		
		// Create a unique ID for this particular pin.
		
		var primary, primary_url, contentString;
		var id=String(lat).replace(".","").replace("-","");
		id += String(lng).replace(".","").replace("-","");
		
		// Parse the flickr stuff
		
		$.ajax({ // ..for flickr photoset
			  url: 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=0a4c13223c53dc01af68bbecd1127ad2&photoset_id='+flickr_photoset+'&format=json&nojsoncallback=1', 
			  type: 'GET',
				dataType: 'json',
				success: function(data){
					console.log('Photoset data for http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=0a4c13223c53dc01af68bbecd1127ad2&photoset_id='+flickr_photoset+'&format=json&nojsoncallback=1', data);
					primary = data.photoset.primary;			
					
					$.ajax({ // ..for primary photo
						url: 'http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=0a4c13223c53dc01af68bbecd1127ad2&photo_id='+primary+'&format=json&nojsoncallback=1',
						type: 'GET',
						dataType: 'json',
						success: function(primaryData){
							console.log("Primary photo data", primaryData.photo);
							primary_url = 'http://farm'+primaryData.photo.farm+'.staticflickr.com/'+primaryData.photo.server+'/'+primary+'_'+primaryData.photo.secret+'_n.jpg';

							// < Set contentString>
							
							contentString = '<div id="'+id+'" data-innerid="'+id+'" class="googleInfo" style="width: 420px; z-index: 100; height: auto; max-height:360px; overflow: auto;">';
							if (name != "none") { contentString += '<div class="author">'+name+'</div>'; }
							if (department != null) { contentString += '<div class="department">'+department+'</div>'; }
							if (address != null) { contentString += '<div class="address">'+address+'</div>'; }
							else contentString += '<div class="spacer"></div>';
							contentString += '<div class="story"><div id="imageholder">';
							
							$(data.photoset.photo).each(function(k, v){
								// If this is the first iteration, display the primary image first.
								if (k == 0) contentString += '<img src="'+primary_url+'" class="primary switchable current" id="img'+v.id+'" />';
								if (v.id != primary) {
									var this_url = 'http://farm'+v.farm+'.staticflickr.com/'+v.server+'/'+v.id+'_'+v.secret+'_n.jpg';
									var checkSize = new Image();
									checkSize.src = this_url;
									var aspRat = checkSize.width / checkSize.height;
									console.log("Aspect ratio of image " + v.id, checkSize.width+" by "+checkSize.height);
									contentString += '<img src="'+this_url+'" class="switchable" id="img'+v.id+'" />';
								}
							});
							
							contentString += '<ul class="thumbs">';
							
							$(data.photoset.photo).each(function(k, v){
								if (k >= num_thumbs) return false;
								
								// If this is the first iteration, display the primary image thumbnail first.
								if (k == 0) contentString += '<li><a href="#" class="thumbnail" data-id="'+primary+'"><img src="http://farm'+primaryData.photo.farm+'.staticflickr.com/'+primaryData.photo.server+'/'+primary+'_'+primaryData.photo.secret+'_s.jpg" /></a></li>';
								
								// Don't repeat the primary image.
								if (v.id != primary) { 
									console.log("In each, this is v: ",v);
									contentString += '<li><a href="#" class="thumbnail" data-id="'+v.id+'"><img src="http://farm'+v.farm+'.staticflickr.com/'+v.server+'/'+v.id+'_'+v.secret+'_s.jpg" alt="thumbnail" /></a></li>';
								}
							});//End each
							
							
							//contentString += '</ul><a href="#" class="showlb" data-id="'+data.photoset.id+'">View all images</a></div>';
							contentString += '</ul></div>';
							contentString += '<div class="description">'+description+'</div><div class="viewOnFlickr">View more images on <a href="http://www.flickr.com/photos/michigan-engineering/sets/'+data.photoset.id+'">flickr</a>!</div></div>';
							contentString += '</div>';
							
							// < /Set contentString>	
						},
						error: function() {
							console.log("Error reading primary photo data.");
						}
					});
				
			  },//End success condition
			error: function(xhr, statusText, errorThrown){
				console.log('Server error: '+xhr.statusText+", "+xhr.errorThrown+", "+ xhr.responseText+", "+xhr.status);
			}
		});
	
		// Create the infoWindow
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 420
		});
		
		// Create marker 
		
		var LL = new google.maps.LatLng(lat, lng);
		var marker = new google.maps.Marker({
			  position: LL,
			  //icon: "img/mpin.png",
			  zIndexProcess: function() { return 1; }	
		});
		marker.setZIndex(0);
		var mpointer = String(lat)+String(lng);
		
		// Place the current marker in the "markers" array. It's useful to keep track of everything we're working on in a global context.
		
		markers[mpointer]=marker;
		
		// Open window if it's appropriate
		
		/*if (vopen == 1) {
			infowindow.open(map,marker);
		}*/
		
		// What happens when you click the marker we just created?
		
		google.maps.event.addListener(marker, 'click', function() {
			
			// Close all other infoWindows
			
			for (key in infoWindows) {
				//console.log("Close infowindow ", key);
				try { infoWindows[key].close(); }
				catch (e){}
				$("iframe#ifr_"+key).remove();	
			}
			
			infowindow.open(map,marker);
			var strIndex = String(infowindow.anchor.position.Pa+infowindow.anchor.position.Qa);
			
			// Add this infowindow to the main "infoWindows" array.
			
			if (id != null) {
				infoWindows[id]=infowindow;
			}
			$("iframe#ifr_"+id).load(function(){refreshMap();});
			infowindow.setContent(contentString);
			$(".googleInfo").parent().css({"overflow":"hidden"});
			
			// Close all infoWindows, even if you just click close on the current one.
			
			google.maps.event.addListener(infowindow,'closeclick',function(event){
				for (key in infoWindows) {
					$("iframe#ifr_"+key).remove();	
				}
			});
			
		});
		
		// Place the marker on the map.
		
		marker.setMap(map);	
		
		//Refresh the map zoom level.
		
		map.setZoom(16);
	}

// </ Campus map function>	


	
	
	
	

	
// Ping the server for user submissions.

	console.log("Layer: ", LAYER);

// In this area, we will determine which map content to load.
// There will be different AJAX calls to different PHP documents for
// each map data type.

// At some point down the line, there may be the need to call multiple types of maps.
// When this happens, I'll have to find a way to determine the proper scope (e.g. map.setZoom, etc).

// < Decision Call >	

	if (LAYER == "decision") {	
		$.ajax({
			  url: 'decision.php', 
			  type: 'GET',
				dataType: 'json',
				success: function(data){
					var latarr = new Array(), lonarr = new Array();
					$(data).each(function(k, v){
						
	//*****************THIS IS WHERE THE DATABASE IS TRAVERSED.***********//
						var tx = "none";
						if (v.text != null) { tx = v.text; }
						var nm = "none";
						if (v.name != null) { nm = v.name; }
						
	//*****************THIS IS WHERE WE MAP AN ELEMENT.***********//
						console.log("Mapping something:", v.id);
						decisionMap(v.id, v.lat, v.lon, tx, v.link, v.open, nm, v.description);
						latarr.push(parseFloat(v.lat));	
						lonarr.push(parseFloat(v.lon));	
						if (latarr.length > 1) { latarr.splice(-1,1); }
						if (lonarr.length > 1) { lonarr.splice(-1,1); }
				});//End each
				
				//======================================================
				// 12-3: make a clickable list of all markers
				//  display in the description area for each info window
				//======================================================
				/*var length = names_inorder.length;
				for (var i=0; i<names_inorder.length; i++){
					desc_string += "<li onclick='pantoNext("+i+")'>"+names_inorder[i]+"</li>";
				}*/
				desc_string += "</ol>";
			  },//End success condition
			error: function(xhr, statusText, errorThrown){
				alert('Server error: '+xhr.statusText+", "+xhr.errorThrown+", "+ xhr.responseText+", "+xhr.status);
			}
		});
	}
// </ Decision Call>

// < Holiday Call >	

	if (LAYER == "holiday") {	
		$.ajax({
			  url: 'server.php', 
			  type: 'GET',
				dataType: 'json',
				success: function(data){
					var latarr = new Array(), lonarr = new Array();
					$(data).each(function(k, v){
						
	//*****************THIS IS WHERE THE DATABASE IS TRAVERSED.***********//
						var tx = "none";
						if (v.text != null) { tx = v.text; }
						var nm = "none";
						if (v.name != null) { nm = v.name; }
						
	//*****************THIS IS WHERE WE MAP AN ELEMENT.***********//
						holidayMap(v.id, v.lat, v.lon, tx, v.link, v.open, nm);
						latarr.push(parseFloat(v.lat));	
						lonarr.push(parseFloat(v.lon));	
						if (latarr.length > 1) { latarr.splice(-1,1); }
						if (lonarr.length > 1) { lonarr.splice(-1,1); }
						
				});//End each
			  },//End success condition
			error: function(xhr, statusText, errorThrown){
				alert('Server error: '+xhr.statusText+", "+xhr.errorThrown+", "+ xhr.responseText+", "+xhr.status);
			}
		});
	}
// </ Holiday Call>

// < Campus Call >	
	
	if (LAYER == "campus") {	
		$.ajax({
			  url: 'campus.php', 
			  type: 'GET',
				dataType: 'json',
				success: function(data){
					console.log("Returned: ", data);
					$(data).each(function(k, v){
						
	//*****************THIS IS WHERE THE DATABASE IS TRAVERSED.***********//
						var tx = "none";
						if (v.text != null) { tx = v.text; }
						var nm = "none";
						if (v.name != null) { nm = v.name; }
						
	//*****************THIS IS WHERE WE MAP AN ELEMENT.***********//
	// campusMap (id, lat, lng, name, subtitle, description, lnk, flickr_photoset, num_thumbs)
	
						campusMap(v.id, v.lat, v.lon, v.building_name, v.subtitle, v.description, v.link, v.flickr_photoset, v.num_thumbs, v.address, v.department);
						
				});//End each
			  },//End success condition
			error: function(xhr, statusText, errorThrown){
				alert('Server error: '+xhr.statusText+", "+xhr.errorThrown+", "+ xhr.responseText+", "+xhr.status);
			}
		});
	}
	
		
		
// < / Campus Call>
}).bind("unloadmap", function () {
		$(this).empty().removeClass("maploaded").addClass("mapready");
		$("#legend").removeClass("maploaded").addClass("mapready");
});


function deleter(assoc) {
	for (k in assoc) {
		delete assoc[k];
	}
}
// Resets the markers.
function eraser() {
	for (k in markers) {
		try { markers[k].setIcon("img/mpin.png"); }
		catch (e) {}
	}
}

// ================== Edited 11/19 ==================
var temp_current = 0;
var desc_string = "<ol style='margin: 0;'>";	// ordered list of all markers display in description area
var latlon_arr = new Array();
var markers_inorder = new Array();
var infoWindows_inorder = new Array();
var video_inorder = new Array();
var names_inorder = new Array();
var ids_inorder = new Array();
var current = latlon_arr.length;
var prev = 0;
var wholemap;

// Youtube and description size
var youtubeW = 250;
var youtubeH = 190;
var descriptionW = 150;
var descriptionH = 300;

var infoWindowW = 300;
var infoWindowH = 150;
if (iphone()) {
	youtubeW = 150;
	youtubeH = 100;
	descriptionH = 200;
	infoWindowW = 300;
	infoWindowH = 257;
}
//var prev_id;
//var prev_mpointer;
function pantoNext(gotoid){
	prev = current;
	if (gotoid == -99) {
		// Next one
		current++;
		if (current == latlon_arr.length){
			current = 0;
		}
	} else if (gotoid == -98) {
		// Previous one
		current--;
		if (current == -1){
			current = latlon_arr.length-1;
		}
	} else if (gotoid >= 0) {
		// Go to given id of marker
		current = gotoid;
	}
	wholemap.panTo(latlon_arr[current]);
	infoWindows_inorder[current].open(wholemap, markers_inorder[current]);
	if (prev != current)
		infoWindows_inorder[prev].close();
	$(".youtubeOverlay").remove();
	
	id = ids_inorder[current];
	if (id != null) {
		infoWindows[id]=infoWindows_inorder[current];
	}
	
	var vid = video_inorder[current];
	$(".youtubeHolder").attr("id", id);
	var youtubeOverlay = '<iframe class="youtubeOverlay" id="ifr_'+id+'" style="position: absolute; top: 20px; left: 0px; display: none; z-index: 1010;" width="'+youtubeW+'" height="'+youtubeH+'" src="http://www.youtube.com/embed/'+vid+'?'+mode+'" frameborder="0" allowfullscreen></iframe>';
	$("iframe#ifr_"+id).load(function(){refreshMap();});
	$(".googleInfo").parent().css({"overflow":"hidden"});
	$("#googlemap").append(youtubeOverlay);
	google.maps.event.addListener(infoWindows[id],'closeclick',function(event){
		for (key in infoWindows) {
			$("iframe#ifr_"+key).remove();	
		}
	});
	$(".description").html(desc_string);
}
// ================== Edited End ==================

var zInd = 0;
// This function iterates through an array and "highlights" the pins (replaces the pin icon with one of a specified color).
// the reason I'm able to pass a color in is because I've already pre-rendered pins in the format mpin_blue.png, mpin_red.png, etc.

// Document is ready, finally.
$(document).ready(function(){	
	
// Add the ie9 class which modernizr doesn't do for some reason.
	if (ie == 9) { $("html").addClass("ie9");}
	$(window).resize(function(){resizer();});
// The "once" varibale makes sure certain things only happen the first time.
	var once = 0;
// Load the map!
// *************
	$('div.mapready').trigger('loadmap');

// Fire "resizer," because it does some important stuff.
	resizer();

// Let it snow!  This feature was too processor intensive for a lot of browsers, so I shut it off.
// but if you want to see how it once looked, try going to http://engin.umich.edu/index.php?letit=snow.
	var letit = getUrlVars()["letit"];
	if (letit === 'snow') {
		$("#snow").css({"display":"block"});	
		console.log("Let it snow!");
	}
}); // document ready