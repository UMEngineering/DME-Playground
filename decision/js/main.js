
// Change a page, drag information via Ajax
function changePage(page){
	var urlAjax = "load_result.php?page=" + page;
	var response = $.ajax({url: urlAjax, success: function(){
		$("#main").html(response.responseText);
		
		// Set the "current" class for the top nav
		$("ul#nav li").each(function(index, element) {
            $(this).attr("class", "non-current");
        });
		$("#"+page+"-nav").attr("class", "current");
		
		// Create horizontal scroll if in page "explore" or "what's next"
		if (page == "explore") {
			create_yui('#scrollview-right0');
			create_yui('#scrollview-right1');
			create_yui('#scrollview-right2');
		} else if (page == "next") {
			create_yui('#scrollview-right0');
			create_yui('#scrollview-right1');
			create_yui('#scrollview-right2');
			create_yui('#scrollview-right3');
		}
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