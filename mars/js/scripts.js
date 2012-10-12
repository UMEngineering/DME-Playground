	function hashim(hash) {
		if (hash == "earth") {
			var nextStep = $(".active").attr("id");
			if (nextStep == "mars") {
				$("#impress").css({"-webkit-transition":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#impress").css({"-webkit-transition-timing-function":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#canvas").css({"-webkit-transition":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#canvas").css({"-webkit-transition-timing-function":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#impress").css({"-moz-transition":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#impress").css({"-moz-transition-timing-function":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#canvas").css({"-moz-transition":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#canvas").css({"-moz-transition-timing-function":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
			}
		}
		
		else if (hash == "surface2") {
			var nextStep = $(".active").attr("id");
			if (nextStep == "rover1") {
				$("#impress").css({"-webkit-transition":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#impress").css({"-webkit-transition-timing-function":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#canvas").css({"-webkit-transition":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#canvas").css({"-webkit-transition-timing-function":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#impress").css({"-moz-transition":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#impress").css({"-moz-transition-timing-function":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#canvas").css({"-moz-transition":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
				$("#canvas").css({"-moz-transition-timing-function":"all 5000ms cubic-bezier(0.350, .95, 0.65, 0.05)"});
			}
		}
		else {
			$("#impress").css({"-webkit-transition":"all 1200ms ease-in-out"});
			$("#impress").css({"-webkit-transition-timing-function":"all 1200ms ease-in-out"});
			$("#canvas").css({"-webkit-transition":"all 1200ms ease-in-out"});
			$("#canvas").css({"-webkit-transition-timing-function":"all 1200ms ease-in-out"});
			$("#impress").css({"-moz-transition":"all 1200ms ease-in-out"});
			$("#impress").css({"-moz-transition-timing-function":"all 1200ms ease-in-out"});
			$("#canvas").css({"-moz-transition":"all 1200ms ease-in-out"});
			$("#canvas").css({"-moz-transition-timing-function":"all 1200ms ease-in-out"});	
		}
		
	}
	
	var litUp = new Array(), litCache = new Array();
	
	function lights(el) {
		
		var lights = el.getAttribute("data-lights");
		
		if (lights != null) {
			litUp = el.getAttribute("data-lights").split(",");
		}
		if ( litCache.length != 0 ){
			for (var k in litCache){
				litCache[k].classList.remove("litUp");
			}
			litCache = [];
		}
		if ( litUp.length != 0 ) {
			for (var k in litUp){
				document.getElementById(litUp[k]).classList.add("litUp");
				litCache.push(document.getElementById(litUp[k]));
			}
			litUp = [];
		}	
	}
	
	
	
	var earth = null, mars= null, surface2= null, rover1 = null, orion = null;
	function loadEarth() {
		earth = new Image();
		earth.src = "http://engcomm.engin.umich.edu/mars/img/large/earth1.jpg";
		earth.addEventListener('load', function(){
			var canvas = document.getElementById("earthCanvas");
			var context = canvas.getContext("2d");
			context.drawImage(earth,0,0);
		});
		$("#earthCanvas").attr("width","1836");
		$("#earthCanvas").attr("height","1836");
	}
	function loadMars() {
		mars = new Image();
		mars.src = "http://engcomm.engin.umich.edu/mars/img/large/mars3000.jpg";
		mars.addEventListener('load', function(){
			var canvas = document.getElementById("marsCanvas");
			var context = canvas.getContext("2d");
			context.drawImage(mars,0,0);
		});
		$("#marsCanvas").attr("width","3000");
		$("#marsCanvas").attr("height","3000");
	}
	function loadSurface2() {
		surface2 = new Image();
		surface2.src = "http://engcomm.engin.umich.edu/mars/img/large/surface22900.jpg";
		surface2.addEventListener('load', function(){
			var canvas = document.getElementById("surface2Canvas");
			var context = canvas.getContext("2d");
			context.drawImage(surface2,0,0);
		});
		$("#surface2Canvas").attr("width","2900");
		$("#surface2Canvas").attr("height","1406");
	}
	function loadRover1() {
		rover1 = new Image();
		rover1.src = "http://engcomm.engin.umich.edu/mars/img/large/rovercrop.jpg";
		rover1.addEventListener('load', function(){
			var canvas = document.getElementById("rover1Canvas");
			var context = canvas.getContext("2d");
			context.drawImage(rover1,0,0);
		});
		$("#rover1Canvas").attr("width","2397");
		$("#rover1Canvas").attr("height","1710");
	}
	
	function loadOrion() {
		orion = new Image();
		orion.src = "http://engcomm.engin.umich.edu/mars/img/large/orion.jpg";
		orion.addEventListener('load', function(){
			var canvas = document.getElementById("orionCanvas");
			var context = canvas.getContext("2d");
			context.drawImage(orion,0,0);
		});
		$("#orionCanvas").attr("width","3000");
		$("#orionCanvas").attr("height","3000");
	}
	$(document).ready(function(){
		$(window).load(function() {
			
			$(".simplify").click(function(e){
				e.preventDefault();
				$("body").toggleClass("impress-not-supported");
				$("body").toggleClass("userchoice");
				if ($("body").hasClass("userchoice")) {
					
					$("#impress").css({"-webkit-transition":"all 0s ease-in-out"});
					$("#impress").css({"-webkit-transition-timing-function":"all 0s ease-in-out"});
					$("#canvas").css({"-webkit-transition":"all 0s ease-in-out"});
					$("#canvas").css({"-webkit-transition-timing-function":"all 0s ease-in-out"});
					$("#impress").css({"-moz-transition":"all 0s ease-in-out"});
					$("#impress").css({"-moz-transition-timing-function":"all 0s ease-in-out"});
					$("#canvas").css({"-moz-transition":"all 0s ease-in-out"});
					$("#canvas").css({"-moz-transition-timing-function":"all 0s ease-in-out"});
							
				}
				else {
					$("#impress").css({"-webkit-transition":"all 800ms ease-in-out"});
					$("#impress").css({"-webkit-transition-timing-function":"all 800ms ease-in-out"});
					$("#canvas").css({"-webkit-transition":"all 800ms ease-in-out"});
					$("#canvas").css({"-webkit-transition-timing-function":"all 800ms ease-in-out"});
					$("#impress").css({"-moz-transition":"all 800ms ease-in-out"});
					$("#impress").css({"-moz-transition-timing-function":"all 800ms ease-in-out"});
					$("#canvas").css({"-moz-transition":"all 800ms ease-in-out"});
					$("#canvas").css({"-moz-transition-timing-function":"all 800ms ease-in-out"});
				}
			});
			
			$("#userchoice a").click(function(e){
				e.preventDefault();
				$("body").toggleClass("impress-not-supported");
				$("body").toggleClass("userchoice");	
			});
			
			if ($("body").hasClass("impress-supported")) {
	
				loadEarth();loadMars();loadSurface2();loadRover1();loadOrion();
	
				$("#impress").css({"-webkit-transition":"all 800ms ease-in-out"});
				$("#impress").css({"-webkit-transition-timing-function":"all 800ms ease-in-out"});
				$("#canvas").css({"-webkit-transition":"all 800ms ease-in-out"});
				$("#canvas").css({"-webkit-transition-timing-function":"all 800ms ease-in-out"});
				$("#impress").css({"-moz-transition":"all 800ms ease-in-out"});
				$("#impress").css({"-moz-transition-timing-function":"all 800ms ease-in-out"});
				$("#canvas").css({"-moz-transition":"all 800ms ease-in-out"});
				$("#canvas").css({"-moz-transition-timing-function":"all 800ms ease-in-out"});	
				$("*").css({"-webkit-transition":"height 0s ease-in-out"});
				$("*").css({"-moz-transition":"height 0s ease-in-out"});
				$("*").css({"-webkit-transition":"all 1200ms ease-in-out"});
				$("*").css({"-moz-transition":"all 1200ms ease-in-out"});
				
				$("#impress").bind("impress:stepleave", function(){
					if(window.location.hash && window.location.hash != "#") {
						var hash = window.location.hash.replace("#/", "#").replace("#","");
						hashim(hash);
					}		
				});
				
				$("#impress").bind("impress:stepenter", function(){
					var el = api.currentStep();
					if (el != null) lights(el);
				});
				
				$(window).hashchange(function () {
					if(window.location.hash && window.location.hash != "#") {
						var hash = window.location.hash.replace("#/", "#").replace("#","");
					}
				});
				
				$(".next").click(function(e){
					e.preventDefault();
					api.next();	
				});
				
				$(".navigation a.last").click(function(e){
					e.preventDefault();
					api.prev();	
				});
				var newYear = new Date(); 
				newYear = new Date(newYear.getFullYear(), 7, 5);
				
				$("#countdown").countdown({until: newYear});
			}
			$('#impress').show();
			$('#loader').fadeOut(300, function() {
			$(this).remove();
		  });
		});
	
		
		
		var image, i=0;
		$('.share').sharrre({
		  share: {
			googlePlus: true,
			facebook: true,
			twitter: true,
			digg: true,
			stumbleupon: true,
			pinterest: true
		  },
		  buttons: {
			googlePlus: {size: 'tall'},
			facebook: {layout: 'box_count'},
			twitter: {count: 'vertical'},
			digg: {type: 'DiggMedium'},
			delicious: {size: 'tall'},
			stumbleupon: {layout: '5'},
			linkedin: {counter: 'top'},
			pinterest: {media: 'http://engin.umich.edu/newscenter/dme/mars/img/150.jpg', description: $('#shareme').data('text'), layout: 'vertical'}
		  },
		  enableHover: false,
		  enableCounter: false,
		  enableTracking: true
		});
		var el = api.currentStep();
		if (el != null) lights(el);
	});