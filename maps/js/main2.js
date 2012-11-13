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
var mode="wmode=opaque&allowscriptaccess=true&rel=0";
if (ie>6) mode = "rel=0";
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
	
	//Search results
	var sh = ($(window).height()-200);
	sh = sh+"px";
	$("#resultcontainer").css({"height":sh});

}

var infoWindows = new Array();
var markers = new Array();
var highlighter = new Array();
var highlighter2 = new Array();
var highlighter3 = new Array();

function refreshMap() {
	for (key in infoWindows) {
		try {$("iframe#ifr_"+key).css({"left":$("div#"+key).offset()["left"]+"px", "top":$("div#"+key).offset()["top"]+"px", "display":"block"});}
		catch (err) {}
	}
}
setInterval(function(){refreshMap()}, 50);
$("div#googlemap").bind("loadmap", function initialize() {
	$(this).removeClass("mapready").addClass("maploaded");
	var lat = 27.844895761175323, lon = -31.31536606190184;
	var latlng = new google.maps.LatLng(lat, lon);
	var myOptions = {
	  zoom: 0,
	  center: latlng,
	  scrollwheel: false,
	  panControl: false,
	  zoomControlOptions: {
		 position: google.maps.ControlPosition.RIGHT_TOP
	  },
	  mapTypeControlOptions: {
		 position: google.maps.ControlPosition.TOP_RIGHT
	  },
	 mapTypeId: google.maps.MapTypeId.HYBRID
	};
	
	var map = new google.maps.Map(this,
			myOptions);
	mapBuffer = map;
	google.maps.event.addListener(map, 'click', function (event){ console.log("Click",event.latLng) });	
	//****************
	//Wanna drag?
	//****************
	google.maps.event.addListener(map, 'drag', function (event) { refreshMap();});
	google.maps.event.addListener(map, 'resize', function (event) { refreshMap();});
	//Social media
	var ii = 0;
	function mapit (id, lat, lng, text, vid, vopen, name) {
		var id=String(lat).replace(".","").replace("-","");
		id += String(lng).replace(".","").replace("-","");
		var contentString = '<div style="z-index: 100" data-innerid="'+id+'" class="googleInfo" style="width: 420px; height: 315px;">';
		if (name != "none") { contentString += '<div class="author">'+name+'</div>'; }
		else contentString += '<div class="spacer"></div>';
		if (text == "none")	contentString += '<div id="'+id+'" class="youtubeHolder" style="opacity: 1 !important; z-index: 1000 !important; background-color: black !important;" width="420" height="315"></div><div class="clear">&nbsp;</div>';
		else {contentString += '<div class="story">';
			contentString += text+'</div>';
		}
		contentString += '</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 420
		});
		var LL = new google.maps.LatLng(lat, lng);
		var marker = new google.maps.Marker({
			  position: LL,
			  icon: "img/mpin.png",
			  zIndexProcess: function() { return 1; }	
		});
		marker.setZIndex(0);
		var mpointer = String(lat)+String(lng);
		markers[mpointer]=marker;
		
		if (vopen == 1) {
			infowindow.open(map,marker);
		}
		google.maps.event.addListener(marker, 'click', function() {
			for (key in infoWindows) {
				infoWindows[key].close();
				$("iframe#ifr_"+key).remove();	
			}
			infowindow.open(map,marker);
			var strIndex = String(infowindow.anchor.position.Pa+infowindow.anchor.position.Qa);
			if (id != null) {
				infoWindows[id]=infowindow;
			}
			var youtubeOverlay = '<iframe class="youtubeOverlay" id="ifr_'+id+'" style="position: absolute; top: 20px; left: 0px; display: none; z-index: 1010;" width="420" height="315" src="http://www.youtube.com/embed/'+vid+'?'+mode+'" frameborder="0" allowfullscreen></iframe>';
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
		map.setZoom(2);
	}
	$.ajax({
		  url: 'server.php', 
		  type: 'GET',
			dataType: 'json',
			success: function(data){
				var latarr = new Array(), lonarr = new Array();
			 	$(data).each(function(k, v){
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

function deleter(assoc) {
	for (k in assoc) {
		delete assoc[k];
	}
}
function eraser() {
	for (k in markers) {
		markers[k].setIcon("img/mpin.png");
	}
}
var zInd = 0;
function highlight(which, color) {
	for (k in which) {
		zInd++;
		var point = which[k];
		highlightme = markers[point];
		highlightme.setIcon("img/mpin_"+color+".png");
		highlightme.setZIndex(zInd);
		var z = highlightme.getZIndex();
	}
}
function lights() {
	eraser();
	highlight(highlighter, 'red');
	highlight(highlighter3, 'green');
	highlight(highlighter2, 'yellow');
}
$(document).ready(function(){	
	$('#search input').live("keydown", function(e){
		if (e.keyCode == 13 ) e.preventDefault();
	});
	
	var initialSearchVal = $('#search input').val();
	$('#search input').live("focus", function(e){
		var option = {
		  x:      1, 
		  y:      1, 
		  radius: 5,
		  color:  "#ff0000"
		}
		$("label#search").textShadow( option );
		$('#search input').val('');
		$('#search input').css({"color":"#000000"});
		$("label#search").css({"text-shadow":"rgba(255, 0, 0, .5) 1px 1px 5px"});
	});
	
	$('#search input').live("blur", function(e){
		$('#search input').val(initialSearchVal);
		$('#search input').css({"color":"#cccccc"});
		try { $("label#search").removeShadow(); }
		catch(e){}
		$("label#search").css({"text-shadow":"none"});
	});
	
	var lsrch = $('#search input[name="q"]').liveSearch({url: '/happyholidays/ajax/search2.php?q='});
	
	$("a.searchForMe").live("click", function(e){
		e.preventDefault();
		var ref = $(this).attr('href').replace("#","");
		mapBuffer.panTo(markers[ref].position);
		mapBuffer.setZoom(13);
		deleter(highlighter);
		highlighter.push(ref);
		highlight(highlighter, "blue");
		$('#search input').val($(this).html());
		$('#search input').css({"color":"#9bc3fa"});
		$("#jquery-live-search").slideUp(200);
	});
	
	$("a.searchForDepartment").live("click", function(e){
		e.preventDefault();
		var ref = $(this).attr('href').replace("#","");
		deleter(highlighter2);
		eraser();
		highlight(window[ref], "blue");
		$("#search input").val('');
		$('#search input').css({"color":"#9bc3fa"});
		$('#search input').val($(this).html());		
		$("#jquery-live-search").slideUp(200);
		
	});
	
	$("a.searchForGroup").live("click", function(e){
		e.preventDefault();
		var ref = $(this).attr('href').replace("#","");
		deleter(highlighter3);
		eraser();
		highlight(window[ref], "blue");
		$("#search input").val('');
		$('#search input').css({"color":"#9bc3fa"});
		$('#search input').val($(this).html());		
		$("#jquery-live-search").slideUp(200);
		
	});
	
	var ifbuffer = '<iframe data-aspectratio="0.75" width="420" height="315" src="http://www.youtube.com/embed/zgYx5rCNwk0?&version=3" frameborder="0" allowfullscreen></iframe>';
	if (ie == 9) { $("html").addClass("ie9");}
	$(window).resize(function(){resizer();});
	var once = 0;
	if (ie > 0) { $("#snow").snowfall({round: false,maxSpeed : 5, maxSize : 1}); }
	else { $("#snow").snowfall({round: true,maxSpeed : 5, maxSize : 5}); }
	$('div.mapready').trigger('loadmap');
	//Close big globe
	$footerActivity = $("#smglobe img, #smglobe a, div.jp-audio");
	$ieFooterActivity = $(".ie7 #smglobe img, .ie7 #smglobe a, .ie7 div.jp-audio, .ie8 #smglobe img, .ie8 #smglobe a, .ie8 div.jp-audio, .ie9 #smglobe img, .ie9 #smglobe a, .ie9 div.jp-audio, ");
	
	$("#start, #exit, #googlemap").bind("click", function(clk) {
		once++;	
		if (once==1) {mapBuffer.setZoom(3);}
		clk.preventDefault();
		console.log("Click: ", clk);
		$("#globe, #globe *, #globe #hh_base, #globe iframe, #exit").css({"pointer-events":"none","opacity":"0"});
		$("#iframeholder iframe").remove();
		//$("#smglobe").css({"opacity":"1","pointer-events":"all"});
		$footerActivity.css({"opacity":"1","pointer-events":"all"});
		//$(".ie7 #smglobe, .ie8 #smglobe, .ie9 #smglobe").css({"display":"block", "z-index":"100"});
		$ieFooterActivity.css({"display":"block", "z-index":"100"});
		$(".ie7 #pile, .ie8 #pile, .ie9 #pile").css({"display":"block", "z-index":"10"});
		$ieFooterActivity.css({"display":"block", "z-index":"10"});
		$(".ie7 #googlemap, .ie8 #googlemap, .ie9 #googlemap").css({"display":"block", "z-index":"10"});
		if (once==1) { $("#jquery_jplayer_1").jPlayer("play"); }
	});
	//Re-open big globe
	$("#smglobe a#intro, #smglobe img").bind("click", function(clk) {
		clk.preventDefault();
		$("#globe, #globe *, #globe #hh_base, #globe iframe, #exit").css({"opacity":"1","pointer-events":""});
		$("#iframeholder").append(ifbuffer);
		//$("#smglobe").css({"opacity":"0","pointer-events":"none"});
		$footerActivity.css({"opacity":"0","pointer-events":"none"});
		//$(".ie7 #smglobe, .ie8 #smglobe, .ie9 #smglobe").css({"display":"block", "z-index":"10"});
		$ieFooterActivity.css({"display":"block", "z-index":"10"});
		$(".ie7 footer, .ie8 footer").css({"display":"block", "z-index":"11","pointer-events":"all"});
		$(".ie7 #pile, .ie8 #pile, .ie9 #pile").css({"display":"block", "z-index":"0"});
		$(".ie7 #googlemap, .ie8 #googlemap, .ie9 #googlemap").css({"display":"block", "z-index":"0"});
		$("#jquery_jplayer_1").jPlayer("pause");
	});
	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3:"http://www.engin.umich.edu/happyholidays/media/holidays_q.mp3",
				ogg:"http://www.engin.umich.edu/happyholidays/media/holidays_q.ogg",
			});
		},
		errorAlerts: false,
		swfPath: "js",
		supplied: "mp3,ogg",
		wmode: "window",
		volume: 0.10
	});
	resizer();
	
}); // document ready