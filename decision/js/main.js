var inNav = true;

// Change a page for quiz result, drag information via Ajax
function changePage(page){
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
				create_yui('#scrollview-right0');
				create_yui('#scrollview-right1');
				create_yui('#scrollview-right2');
				create_yui('#scrollview-right3');
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
				if (screenWidth <= 800 && originWidth > 800 && inNav){
					create_yui('#scrollview-right0');
					create_yui('#scrollview-right1');
					create_yui('#scrollview-right2');
					create_yui('#scrollview-right3');
				} else if (screenWidth > 800 && originWidth <= 800 && inNav) {
					$('.flexslider').flexslider({
						animation: "slide",
						slideshow: false/*,
						animationLoop: false*/
					});
					originWidth = screenWidth;
				}
			});
		}
	}});
}

// Load the detailed page
function changePageDetail(id, title, navid){
	inNav = false;
	$("#main").css("height", "100%");
	var urlAjax = "load_result.php?page=detail&id=" + id;
	var response = $.ajax({url: urlAjax, success: function(){
		if ($(".bottom").html() == null) {
			// Append the bottom first
			$('head').append("<link rel=\"stylesheet\" href=\"css/pages.css\" type=\"text/css\" />");
			$("#container").append("<div class=\"bottom display-when-mobile\"><div id=\"bottom-title\">"+title+"</div><div id=\"bottom-scrollbackground\"><div class=\"scrollview-right\" id=\"img-nav-div\">"+$("#"+navid).html()+"</div></div></div>");
			$("#container").append("<div class=\"bottom display-when-desktop\"><div id=\"bottom-title\">"+title+"</div><div class=\"scroll-background flexslider\">"+$("#desk-"+navid).html()+"</div></div>");
		}
		
		$("#main").html(response.responseText);
		create_yui('#img-nav-div');
		$('.flexslider').flexslider({
			animation: "slide",
			slideshow: false/*,
			animationLoop: false*/
		});
		$("#nav").html("<li>"+$("#title-none-display").text().toUpperCase()+"</li><span id=\"goback\"><a href=\"result.php\">Go Back</a></span>");
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
	document.cookie = "checklist="+answer.substr(0, answer.length-1);	
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