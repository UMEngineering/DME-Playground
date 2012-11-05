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



var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
$fluidEl = $("img#hh_top"),
$exit = $("#exit"),
$contact = $("#contact");
$innerImg = $("#globe img");
$innerIframe = $("#globe iframe");
var exitBottomOrig = parseFloat($exit.css("bottom").replace("px",""));
var exitRightOrig = parseFloat($exit.css("right").replace("px",""));
var contactBottomOrig = parseFloat($contact.css("bottom").replace("px",""));
console.log("IE: ", ie);
var mode="wmode=opaque&allowscriptaccess=true&rel=1";
if (ie>6) mode = "";
var mapBuffer;
$allVideos.each(function() {
var i = 0;
  $(this)
	// jQuery .data does not work on object/embed elements
	.attr('data-aspectRatio', this.height / this.width)
	.removeAttr('height')
	.removeAttr('width');
});
function resizer() {
	console.log("Resizer.");
	var newWidth = ($fluidEl.width()*340)/750;
	var bottomAdjust = (200*($fluidEl.height()/804))*($fluidEl.width()/750);
	var rightAdjust = 240*($fluidEl.width()/750);
	var newExitWidth = ($fluidEl.width()*40)/750;
	var exitBottom = exitBottomOrig*($fluidEl.width()/750);
	var exitRight = 620*($fluidEl.width()/750);
	var adj = 135;
	var newContactWidth = ($fluidEl.width()*1.8)/750;
	var contactBottom = contactBottomOrig+adj - (804/$fluidEl.height())*adj;
	var contactRight = 200*($fluidEl.width()/750);
	if (ie != 7) {
		
		//Video fix
		$allVideos.each(function() {
			var $el = $(this);
			$el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio')).css({"bottom":bottomAdjust+"px","right":rightAdjust+"px"})
		});
		//Close button fix
		$exit.css({"width":newExitWidth+"px","right":exitRight+"px","bottom":exitBottom+"px"});
		$contact.css({"font-size":newContactWidth+"em","left":contactRight+"px","bottom":contactBottom+"px"});
	}
	else {
		
		var mLeft = -.5*$fluidEl.width();
		var mLeftIframe = mLeft+60;
		$innerImg.css({"margin-left":mLeft+"px"});
		$innerIframe.css({"margin-left":mLeftIframe+"px"});
		console.log("Changing ie7: ", mLeft);
		//Video fix
		$allVideos.each(function() {
			var $el = $(this);
			$el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio')).css({"bottom":bottomAdjust+"px","right":rightAdjust+"px"})
		});
		//Close button fix
		$exit.css({"width":newExitWidth+"px","right":exitRight+"px","bottom":exitBottom+"px"});
		$contact.css({"font-size":newContactWidth+"em","left":contactRight+"px","bottom":contactBottom+"px"});
	}
	//Player fix
	if ($(window).width()<950) {
	  var w = (950 - $(window).width())*-1;
	  w = w+"px";
	  $("#jp_container_1").css({"right":w});
	}
	else {
	  $("#jp_container_1").css({"right":"0"});
	}
}
var geoTweets = new Array();
var infoWindows = new Array();
$("div#googlemap").bind("loadmap", function initialize() {
	$(this).removeClass("mapready").addClass("maploaded");
	var facebookLat=new Array();
	var facebookLon=new Array();
	var facebookID=new Array();
	var lat = 27.844895761175323, lon = -31.31536606190184;
	var latlng = new google.maps.LatLng(lat, lon);
	var myOptions = {
	  zoom: 0,
	  center: latlng,
	  //Make this satellite view
	  scrollwheel: false,
	 mapTypeId: google.maps.MapTypeId.HYBRID
	//  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(this,
			myOptions);
	
	document.getElementById("googlemap").addEventListener('webkitTransitionEnd', function(e) {
		console.log(e);
		for(key in infoWindows)
		{
			var contentCache = infoWindows[key].content;
			setTimeout(function(){
				infoWindows[key].setContent="";
				infoWindows[key].setContent = contentCache;
				console.log("Animation complete, refreshing infowindow");
			}, 500);
			//console.log("Animation complete, infowindow object: ", infoWindows[key].content);
		}
	}, false);
	mapBuffer = map;
	//var georssLayer = new google.maps.KmlLayer('http://solarcontrols.engin.umich.edu/xml/aus.kml', { preserveViewport : true });
	//georssLayer.setMap(map);
	//map.setCenter(lat, lon);
	//poly = new google.maps.Polyline(polyOptions);
	//poly.setMap(map);
	google.maps.event.addListener(map, 'click', function (event){ console.log("Click",event.latLng) });	
	//Social media
	function mapit (id, lat, lng, text, vid, vopen, name) {
		console.log(name);
		var contentString = '<div style="z-index: 100" class="googleInfo" id="content">';
		if (name != "none") { contentString += '<div class="author">'+name+'</div>'; }
		else contentString += '<div class="spacer"></div>';
		 
		if (text == "none")	contentString += '<iframe style="opacity: 1 !important; z-index: 1000 !important; background-color: black !important;" width="420" height="315" src="http://www.youtube.com/embed/'+vid+'?'+mode+'" frameborder="0" allowfullscreen></iframe>';
		//if (text == "none")	contentString += '<object width="420" height="315"><param name="movie" value="http://www.youtube.com/v/'+vid+'?version=3&amp;hl=en_US&amp;wmode=opaque"></param><param name="allowFullScreen" value="false"></param><param name="wmode" value="opaque"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+vid+'?version=3&amp;hl=en_US&amp;wmode=opaque" type="application/x-shockwave-flash" width="420" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>';
		else {contentString += '<div class="story">';
			contentString += text+'</div>';
		}
		contentString += '</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		var LL = new google.maps.LatLng(lat, lng);
		var Icon25 = "img/twitter.png";
		var marker = new google.maps.Marker({
			  position: LL,
			  zIndexProcess: function() { return 1; }
		});
		if (vopen == 1) {
			infowindow.open(map,marker);
		}
		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map,marker);
		  var strIndex = String(infowindow.anchor.position.Pa+", "+infowindow.anchor.position.Qa);
		  console.log("String index based on ll: ",strIndex);
		  infoWindows[strIndex] = infowindow;
		  
			for(key in infoWindows)
			{
				console.log("InfoWindow[", key+"]: "+infoWindows[key]);
			}
		  
		 
		  infowindow.setContent(contentString);
		google.maps.event.addListener(infowindow,'closeclick',function(){
		   var strIndex = String(this.anchor.position.Pa+", "+this.anchor.position.Qa);
		   delete infoWindows[strIndex];
		});
		
		});
		
		
		
		//console.log(map);
		marker.setMap(map);	
		map.setZoom(2);
	}
	$.ajax({
		  url: 'server.php', 
		  type: 'GET',
			dataType: 'json',
			success: function(data){
				var latarr = new Array(), lonarr = new Array();
			 	$(data).each(function(k, v){
					console.log(v.text);
					var tx = "none";
					if (v.text != null) { tx = v.text; }
					var nm = "none";
					if (v.name != null) { nm = v.name; }
					mapit(v.id, v.lat, v.lon, tx, v.link, v.open, nm);
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
}).bind("unloadmap", function () {
		$(this).empty().removeClass("maploaded").addClass("mapready");
		$("#legend").removeClass("maploaded").addClass("mapready");
});
$fluidEl = $("img#hh_top");
$fluidEl.load(function(){resizer();});
//Document ready
$(document).ready(function(){
	
	
	
	if (ie == 9) { $("html").addClass("ie9");}
	
	$(window).resize(function(){resizer();});
	var once = 0;
	
	if (ie > 0) { $("#snow").snowfall({round: false,maxSpeed : 5, maxSize : 1}); }
	else { $("#snow").snowfall({round: true,maxSpeed : 5, maxSize : 5}); }
	$('div.mapready').trigger('loadmap');
	
	//Close big globe
	$("#start, #exit, #googlemap").bind("click", function(clk) {
		mapBuffer.setZoom(3);
		once++;
		console.log(once);
		clk.preventDefault();
		console.log("Click: ", clk);
		$("#globe, #globe *, #globe #hh_base, #globe iframe, #exit").css({"pointer-events":"none","opacity":"0"});
		$("#globe iframe").hide();
		console.log("Hiding globe");
		$("#smglobe").css({"opacity":"1","pointer-events":"all"});
		$(".ie7 #smglobe, .ie8 #smglobe, .ie9 #smglobe").css({"display":"block", "z-index":"100"});
		$(".ie7 #pile, .ie8 #pile, .ie9 #pile").css({"display":"block", "z-index":"10"});
		$(".ie7 #googlemap, .ie8 #googlemap, .ie9 #googlemap").css({"display":"block", "z-index":"10"});
		if (once==1) { $("#jquery_jplayer_1").jPlayer("play"); }
	});
	//Re-open big globe
	$("#smglobe a#intro").bind("click", function(clk) {
		clk.preventDefault();
		$("#globe, #globe *, #globe #hh_base, #globe iframe, #exit").css({"opacity":"1","pointer-events":""});
		$("#globe iframe").show();
		console.log("Showing globe");
		$("#smglobe").css({"opacity":"0","pointer-events":"none"});
		$(".ie7 #smglobe, .ie8 #smglobe, .ie9 #smglobe").css({"display":"block", "z-index":"10"});
		$(".ie7 footer, .ie8 footer").css({"display":"block", "z-index":"11","pointer-events":"all"});
		$(".ie7 #pile, .ie8 #pile, .ie9 #pile").css({"display":"block", "z-index":"0"});
		$(".ie7 #googlemap, .ie8 #googlemap, .ie9 #googlemap").css({"display":"block", "z-index":"0"});
		$("#jquery_jplayer_1").jPlayer("pause");
	});
	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3:"http://engcomm.engin.umich.edu/happyholidays/media/holidays_q.mp3",
				ogg:"http://engcomm.engin.umich.edu/happyholidays/media/holidays_q.ogg	"
			});
		},
		swfPath: "js",
		supplied: "mp3",
		wmode: "window",
		volume: 0.10
	});
	resizer();
}); // document ready