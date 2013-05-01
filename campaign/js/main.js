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
		
		$(this).click(function(e) {
			current = item_id;
			
			// temp
			item_id_img = "item-1";
			//item_id_img = item_id
			
			// Clear all content in all items
			$("#" + item_id + " .img-cover").css({"display" : "none"});
			$("#" + item_id + " .item-content").html('<img style="height: ' + height + 'px;" src="img/big/' + item_id_img + '_big.jpg" alt="item image" />');
			$("#go-back").show();

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
			var added = $("#" + current).width() + 180;
			console.log(added);
			$("#" + current).css({"width" : added + "px"});
			console.log($("#" + current).css("width"));
		}
		
		$(".one-item").each(function(index, element) {
			$(this).css({"width" : "180px"});
		});
		
		$(".img-cover").css({"display" : "block"});
		setTimeout(function(){
			$(".item-content").html("");
			$("#go-back").hide();
		}, 500);
    });
});