var current = "";
$(document).ready(function(e) {
	var width = $(window).width();
	var height = $(window).height();
	$(".one-item img").css({"height" : height + "px"});
	$(window).resize(function(e) {
		height = $(window).height(), width = $(window).	width();
		var itemsWidth = width - 270, itemsHeight = height-51;
		if (height > 800) {
			$(".one-item .img-cover img").css({"width" : "auto"});
			$(".one-item .img-cover img").css({"height" : itemsHeight + "px"});
		}
		else {
			$(".one-item .img-cover img").css({"width" : "auto"});
		}
		//Resize large image
		$("content-image");
		$(".left").css("height",itemsHeight);
		$(".collapsed .items").css({"width":itemsWidth, "height":itemsHeight});

    });
	
    $(".img-cover").each(function(index, element) {
        var item_id = $(this).parent().attr("id");

		// When you open the big image	
		/* Click event: when click on an image, load the image and append it into the HTML */
		$(this).click(function(e) {

			console.log("Title:", $(this).children(".meta#title").html());

			var title = $(this).children(".meta#title").html(), body = $(this).children(".meta#body").html();

			current = item_id;
	        $("body").removeClass("collapsed");
			$(".left, .info").hide();

			$(".items").css({"left":"0px","width":"100%"});

			// temp
			item_id_img = $("#" + current + " a.img-src").attr("href");
			
			// Clear all content in all items
			$("#" + item_id + " .img-cover").hide();
			$("#" + item_id + " .item-content").html('<img class="content-image" src="img/big/' + item_id_img + '" alt="item image" /><div class="content-info"><h2>'+title+'</h2><div class="body">'+body+'</div>');
			// console.log("Height of div:" ,$(".content-info").height());
			var margintop = $(".content-info .body").height()/-3;
			console.log("height:",$(".content-info .body").height());
			margintop = String(margintop) + "px";

			var itemwidth = $(window).width() - ($(window).width()/3), marginleft = String(itemwidth/-2)+"px";
			console.log(itemwidth);

			$(".content-info").css({"margin-top" : margintop,"margin-left":marginleft,"width":itemwidth});
			$("#go-back").show();

			// Expand the selected item to full screen, and make all other cover images with as 0 so they will disappear
			$(".one-item").each(function(index, element) {
                if ($(this).attr("id") != item_id) {
					$(this).css({"width" : "0px"});
				} else {
					$(this).css({"width" : width+"px"});

				}
            });
        });
    });
	
	// When you close the big image
	$("#go-back").click(function(e) {
		$("body").addClass("collapsed");

		$(".content-info, .content-image").hide();

		/*if (current != "") {
			console.log(current + " " + $("#" + current).width());
			var added = $("#" + current).width() + 200;
			// console.log(added);
			$("#" + current).css({"width" : added + "px"});
			// console.log($("#" + current).width());
		}
			console.log($("#" + current).width());
		}*/
		
		/*$(".content-image").css({"position" : "absolute", "top" : "0", "left" : "0"});*/
		//$("#" + current).css({"white-space" : "nowrap"});

		$(".left, .info").show();

		$(".items").css({"left":"270px"});

		
		$(".one-item").each(function(index, element) {
			$(this).css({"width" : "180px"});
		});
		
		setTimeout(function(){
			$("#" + current + " .img-cover").fadeIn(500, function(){
				$(".item-content").html("");
				$("#go-back").hide();
			});
		}, 500);
    });
	$(window).resize();

});