var inNav = true;
//alert("Test");
// window.scrollTo(0, 0);
var originalBottom = new Array("", "", "", "");

// Change a page for quiz result, drag information via Ajax
function changePage(page){
	console.log("changePage");
	var urlAjax = "load_result.php?page=" + page;
	var response = $.ajax({url: urlAjax, success: function(){
		$("#main").html(response.responseText);
		$("#main").css("height", "100%");
		
		// Set the "current" class for the top nav
		$("ul#nav li").each(function(index, element) {
            $(this).attr("class", "non-current");
        });
		$("#"+page+"-nav").attr("class", "current");
		
		// Create horizontal scroll if in page "explore" or "what's next"
		var screenWidth = $(window).width();
		var originWidth = screenWidth;
		if (page == "explore" || page == "next") {
			if (screenWidth <= 800){
				//create_yui_vert('.container');
				if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)){
					create_yui('#scrollview-right0');
					create_yui('#scrollview-right1');
					create_yui('#scrollview-right2');
					create_yui('#scrollview-right3');
				} else {
					$(".scrollview-right").css("overflow-x", "scroll");
				}
			} else {
				$('.flexslider').flexslider({
					animation: "slide",
					slideshow: false/*,
					animationLoop: false*/
				});
			}
			$("#main").css("height", "auto");
			$(window).resize(function () { 
				screenWidth = $(window).width();
				if (screenWidth <= 800 && originWidth > 800/* && inNav && navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)*/){
					if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)){
						create_yui('#scrollview-right0');
						create_yui('#scrollview-right1');
						create_yui('#scrollview-right2');
						create_yui('#scrollview-right3');
					} else {
						$(".scrollview-right").css("overflow-x", "scroll");
					}
				} else if (screenWidth > 800 && originWidth <= 800 && inNav) {
					$(".scrollview-right").css("overflow-x", "scroll");
					$('.flexslider').flexslider({
						animation: "slide",
						slideshow: false/*,
						animationLoop: false*/
					});
					originWidth = screenWidth;
				}
			});
			
		}
		$(".page_detail p a").attr("target", "_blank");
	}});
}

// Load the detailed page
function changePageDetail(id, title, navid, typePage){
	console.log("changePageDetail");
	window.scrollTo(0, 0);
	inNav = false;
	$("#main").css("height", "100%");
	var urlAjax = "load_result.php?page=detail&id=" + id + "&typePage=" + typePage;
	var response = $.ajax({url: urlAjax, success: function(){
		if ($(".bottom").html() == null) {
			// Append the bottom first
			$('head').append("<link rel=\"stylesheet\" href=\"css/pages.css\" type=\"text/css\" />");
			
			// Append the original bottom nav
			if(originalBottom[0] == "" && originalBottom[1] == "" && originalBottom[2] == "") {
				originalBottom[0] = "<div id=\"bottom-title\">"+title+"</div><div id=\"bottom-scrollbackground\"><div class=\"scrollview-right\" id=\"img-nav-div\">"+$("#"+navid).html()+"</div></div>";
				originalBottom[1] = "<div id=\"bottom-title\">"+title+"</div><div class=\"scroll-background flexslider\"><ul class=\"slides\">"+$("#desk-"+navid+" .flex-viewport .slides").html()+"</ul></div>";
				originalBottom[2] = "<div id=\"bottom-title\">"+title+"</div><div class=\"scroll-background flexslider\">"+$("#desk-"+navid).html()+"</div>";
			}
			
			// Mobile version bottom
			$("#container").append("<div class=\"bottom display-when-mobile\">"+originalBottom[0]+"</div>");
			
			// Desktop version bottom
			if ($("#desk-"+navid+" .flex-direction-nav").html()) {
				$("#container").append("<div class=\"bottom display-when-desktop\">"+originalBottom[1]+"</div>");
				$("li.clone").remove();
			} else {
				$("#container").append("<div class=\"bottom display-when-desktop\">"+originalBottom[2]+"</div>");
			}
		} else {
			// If the bottom nav exists
			$(".display-when-mobile").html(originalBottom[0]);
			if ($(".clone").html()) {
				$(".display-when-desktop").html(originalBottom[1]);
				$("li.clone").remove();
			} else {
				$(".display-when-desktop").html(originalBottom[2]);
			}
		}
		
		// Let the current bottom nav photo display none
		$(".display-when-desktop .d-bottom-nav-"+id).detach();
		//var appended = false;
		for (var i=id+1; ; i++){
			if (!$(".display-when-desktop .d-bottom-nav-"+i).html()){
				
				break;
			}
			/*if ($(".display-when-desktop .d-bottom-nav-"+i).html()){
				var temp = $(".display-when-desktop .bottom-nav-"+i).detach();
				if (!appended) {
					$(".display-when-desktop .d-bottom-nav-"+id).parent().append(temp);
				} else {
					$(".display-when-desktop .d-bottom-nav-"+i).parent().append(temp);
				}
				
				if ($(".display-when-desktop .d-bottom-nav-"+i).parent().attr("class") != $(".display-when-desktop .d-bottom-nav-"+id).parent().attr("class")){
					appended = true;
				}
			} else {
				break;
			}*/
		}
		
		if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)) {
			//$(".scrollview-right").css("overflow-x", "scroll");
			create_yui('#img-nav-div');
		} else {
			$("#img-nav-div").css("overflow-x", "scroll");
		}
		$('.flexslider').flexslider({
			animation: "slide",
			slideshow: false
		});
		
		$("#main").html(response.responseText);
		$("#main").css("height", "auto");
		
		// Change the #main's height to screen's height if in mobile version
		var screenWidth = $(window).width();
		if (screenWidth <= 800 && $(document).height() - $(window).height() <= 20) {
			//alert($(window).height()+" "+$(document).height());
			$("#main").css("height", ($(window).height()-200)+"px");;
		}
		$("#nav").html("<li>"+$("#title-none-display").text().toUpperCase()+"</li><span id=\"goback\"><span onclick=\"history.back(-1)\">Go Back</span></span>");
		$(".page_detail p a").attr("target", "_blank");
	}});
}

// Create horizontal scroll bars
function create_yui(class_name){
	var screenWidth = $(window).width();
	YUI().use('scrollview', function(Y) {
		var scrollView = new Y.ScrollView({
			id: 'scrollview',
			srcNode: class_name,
			width: screenWidth,
			flick: {
				minDistance:10,
				minVelocity:0.3,
				axis: "x"
			}
		});
		//scrollView._prevent.move = false;
	
		scrollView.render();
		
		// Prevent default image drag behavior
		scrollView.get("contentBox").delegate("mousedown", function(e) {
			e.preventDefault();
		}, "img");
		
		var resizeTimer;
		$(window).resize(function () { 
			clearTimeout(resizeTimer);
			screenWidth = $(window).width();
			resizeTimer = setTimeout(scrollView.set('width', screenWidth), 100);
		});
	});
}

// Create vertical scrolling for mobile
function create_yui_vert(class_name){
	
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
	YUI().use('scrollview', function(Y) {
		var scrollView = new Y.ScrollView({
			id: 'scrollview',
			srcNode: class_name,
			height: '200',
			flick: {
				minDistance:10,
				minVelocity:0.3,
				axis: "y"
			}
		});
	
		scrollView.render();
		
		// Prevent default image drag behavior
	/*	scrollView.get("contentBox").delegate("mousedown", function(e) {
			e.preventDefault();
		}, "img");*/
		
		var resizeTimer;
		$(window).resize(function () { 
			clearTimeout(resizeTimer);
			screenWidth = $(window).width();
			resizeTimer = setTimeout(scrollView.set('width', screenWidth), 100);
		});
	});
}

// Checkbox for pages, change the current style and save them into cookie
function checkthis(id){
	if ($("#"+id+"p").attr('class') == "steps") $("#"+id+"p").attr('class', 'checked');
	else $("#"+id+"p").attr('class', 'steps');
	
	// Save to cookie
	var answer = "";
	$(".styled").each(function(index, element) {
		if ($(this).attr("checked")){
			answer += (index+1)+"-";
		}
    });
	
	var days = 120;
	var expTime = new Date();
	expTime.setTime(expTime.getTime()+days*24*60*60*1000);
	document.cookie = "checklist="+answer.substr(0, answer.length-1)+";expires="+expTime.toGMTString();	
	//alert(document.cookie);
}

// Load the checklist from the cookie
function load_checklist(){
	var str_cookie = document.cookie;
	
	var arr_cookie = str_cookie.split("; ");
	for (var i=0; i<arr_cookie.length; i++) {
		if (arr_cookie[i].indexOf("checklist=") == 0) {
			var arr_split_cookie = arr_cookie[i].split("=");
			var arr_finalresult = arr_split_cookie[1].split("-");
			for (var i=0; i<arr_finalresult.length; i++){
				$("#c"+arr_finalresult[i]).attr("checked", "checked");
				checkthis("c"+arr_finalresult[i]);
			}
			break;
		}
	}
	
}