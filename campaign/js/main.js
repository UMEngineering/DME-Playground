var current = "";

$(document).ready(function(e) {
	var width = $(window).width();
	var height = $(window).height();
	
	$(".one-item img").css({"height" : height + "px"});
	
	$(window).resize(function(e) {
		height = $(window).height();
		$(".one-item img").css({"height" : height + "px"});
    });
	
	// Bind click event for each image
    $(".img-cover").each(function(index, element) {
        var item_id = $(this).parent().attr("id");
		
		/* Click event: when click on an image, load the image and append it into the HTML */
		$(this).click(function(e) {
			current = item_id;
			
			// temp
			item_id_img = "item-1";
			//item_id_img = item_id
			
			// Clear all content in all items
			$("#" + item_id + " .img-cover").css({"display" : "none"});
			$("#" + item_id + " .item-content").html('<img class="content-image" style="height: ' + height + 'px;" src="img/big/' + item_id_img + '_big.jpg" alt="item image" />');
			$("#go-back").show();

			// Expand the selected item to full screen, and make all other cover images with as 0 so they will disappear
			$(".one-item").each(function(index, element) {
                if ($(this).attr("id") != item_id) {
					$(this).css({"width" : "0px"});
				} else {
					$(this).css({"width" : "100%"});
				}
            });
        });
    });
	
	// Go back to slider show
	$("#go-back").click(function(e) {
		if (current != "") {
			console.log(current + " " + $("#" + current).width());
			var added = $("#" + current).width() + 200;
			console.log(added);
			$("#" + current).css({"width" : added + "px"});
			console.log($("#" + current).width());
		}
		
		/*$(".content-image").css({"position" : "absolute", "top" : "0", "left" : "0"});*/
		$("#" + current).css({"white-space" : "nowrap"});
		
		$(".one-item").each(function(index, element) {
			$(this).css({"width" : "180px"});
		});
		
		setTimeout(function(){
			//$(".img-cover").css({"display" : "block"});
			$(".item-content").html("");
			$("#go-back").hide();
			//$(".img-cover").fadeIn(500);
		}, 500);
    });
});