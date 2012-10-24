    var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
    $fluidEl = $("img#hh_top"),
	$exit = $("#exit"),
	$contact = $("#contact");
	var exitBottomOrig = parseFloat($exit.css("bottom").replace("px",""));
	var exitRightOrig = parseFloat($exit.css("right").replace("px",""));
	var contactBottomOrig = parseFloat($contact.css("bottom").replace("px",""));
	
	$allVideos.each(function() {
	var i = 0;
	  $(this)
	    // jQuery .data does not work on object/embed elements
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');
	});
	function resizer() {
		
		console.log("Resizing");
		var newWidth = ($fluidEl.width()*340)/750;
		var bottomAdjust = (200*($fluidEl.height()/804))*($fluidEl.width()/750);
		var rightAdjust = 240*($fluidEl.width()/750);
		var newExitWidth = ($fluidEl.width()*40)/750;
		var exitBottom = exitBottomOrig*($fluidEl.width()/750);
		var exitRight = 530*($fluidEl.width()/750);
		var adj = 135;
		var newContactWidth = ($fluidEl.width()*1.8)/750;
		var contactBottom = contactBottomOrig+adj - (804/$fluidEl.height())*adj;
		var contactRight = 200*($fluidEl.width()/750);
		$allVideos.each(function() {
		var $el = $(this);
		$el
			.width(newWidth)
			.height(newWidth * $el.attr('data-aspectRatio'))
			.css({"bottom":bottomAdjust+"px","right":rightAdjust+"px"})
			
		});
		$exit.css({"width":newExitWidth+"px","right":exitRight+"px","bottom":exitBottom+"px"});
		$contact.css({"font-size":newContactWidth+"em","left":contactRight+"px","bottom":contactBottom+"px"});
		console.log("New exit width: ", newExitWidth);
		console.log("Fluid el width: ", $fluidEl.width());
		console.log("Window width: ", $(window).width());
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
	  zoom: 14,
	  center: latlng,
	  //Make this satellite view
	  scrollwheel: false,
	 mapTypeId: google.maps.MapTypeId.HYBRID
	//  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(this,
			myOptions);
	//var georssLayer = new google.maps.KmlLayer('http://solarcontrols.engin.umich.edu/xml/aus.kml', { preserveViewport : true });
	//georssLayer.setMap(map);
	//map.setCenter(lat, lon);
	map.setZoom(3);
	//poly = new google.maps.Polyline(polyOptions);
	//poly.setMap(map);
	google.maps.event.addListener(map, 'click', function (event){ console.log("Click",event.latLng) });	
	//Social media
	function mapit (id, lat, lng, text, vid, vopen, name) {
		console.log(name);
		var contentString = '<div style="z-index: 100" class="googleInfo" id="content">';
		if (name != "none") { contentString += '<div class="author">'+name+'</div>'; }
		else contentString += '<div class="spacer"></div>';
		if (text == "none")	contentString += '<iframe width="420" height="315" src="http://www.youtube.com/embed/'+vid+'?wmode=opaque&allowscriptaccess=true" frameborder="0" allowfullscreen></iframe>';
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
		});
		//console.log(map);
		marker.setMap(map);	
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
	function passThrough(e) {
    $("#googlemap").each(function() {
       // check if clicked point (taken from event) is inside element
       var mouseX = e.pageX;
       var mouseY = e.pageY;
       var offset = $(this).offset();
       var width = $(this).width();
       var height = $(this).height();
	   console.log("This:",this);
       if (mouseX > offset.left && mouseX < offset.left+width 
           && mouseY > offset.top && mouseY < offset.top+height)
	   		{ google.maps.event.trigger(map, e.type); } 
		 $(this).trigger(e.type); // force click event
		 console.log("Clicked it:", e.type);
    });
}
//$("#globe").bind("mousedown mouseup mousemove click drag dragstart dragend", passThrough);
}).bind("unloadmap", function () {
		$(this).empty().removeClass("maploaded").addClass("mapready");
		$("#legend").removeClass("maploaded").addClass("mapready");
});
$fluidEl = $("img#hh_top");
$fluidEl.load(function(){resizer();});
//Document ready
$(document).ready(function(){
	$(window).resize(function(){resizer();});
	var once = 0;	
	$("#snow").snowfall({round: true,maxSpeed : 5, maxSize : 5});
	$('div.mapready').trigger('loadmap');
	
	//Close big globe
	$("#start, #exit, #googlemap").bind("click", function(clk) {
		once++;
		console.log(once);
		clk.preventDefault();
		console.log("Click: ", clk);
		$("#globe, #globe #hh_base, #globe iframe, #exit").css({"opacity":"0","pointer-events":"none"});
		$("#globe iframe").hide();
		$("#smglobe").css({"opacity":"1","pointer-events":"all"});
		$(".ie7 #smglobe, .ie8 #smglobe").css({"display":"block", "z-index":"100"});
		$(".ie7 #pile, .ie8 #pile").css({"display":"block", "z-index":"10"});
		$(".ie7 #googlemap, .ie8 #googlemap").css({"display":"block", "z-index":"10"});
		if (once==1) { $("#jquery_jplayer_1").jPlayer("play"); }
	});
	//Re-open big globe
	$("#smglobe a#intro").bind("click", function(clk) {
		clk.preventDefault();
		$("#globe, #globe #hh_base, #globe iframe, #exit").css({"opacity":"1","pointer-events":""});
		$("#globe iframe").show();
		$("#smglobe").css({"opacity":"0","pointer-events":"none"});
		$(".ie7 #smglobe, .ie8 #smglobe").css({"display":"block", "z-index":"10"});
		$(".ie7 footer, .ie8 footer").css({"display":"block", "z-index":"11","pointer-events":"all"});
		$(".ie7 #pile, .ie8 #pile").css({"display":"block", "z-index":"0"});
		$(".ie7 #googlemap, .ie8 #googlemap").css({"display":"block", "z-index":"0"});
		$("#jquery_jplayer_1").jPlayer("pause");
	});
	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3:"http://engcomm.engin.umich.edu/holidays/media/holidays.mp3"
			});
		},
		swfPath: "js",
		supplied: "mp3",
		wmode: "window",
		volume: 0.15
	});
}); // document ready