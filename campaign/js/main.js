var current = "";
var contentView = false;
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
		
		if (contentView) {
			$("#" + current).css({"width":width + "px"});
			$(".items").css({"height" : height + "px"});
		}

    });
	
	$(".items").scroll(function(e) {
        if (contentView) {
			//console.log(1 - 1.0 * $(".items").scrollTop() / $(window).height());
			var opac = 1 - 1.0 * $(".items").scrollTop() / $(window).height();
			if (opac >= 0 && opac <= 1) {
				$("#" + current + " img.content-image").css({"opacity" : opac});
			}
		}
    });
	
	// When you open the big image	
    $(".img-cover").each(function(index, element) {
        var item_id = $(this).parent().attr("id");

		/* Click event: when click on an image, load the image and append it into the HTML */
		$(this).click(function(e) {
			contentView = true;
			window.location.hash = item_id;

			console.log("Title:", $(this).children(".meta#title").html());

			var title = $(this).children(".meta#title").html(), body = $(this).children(".meta#body").html();

			current = item_id;
			console.log(current);
	        $("body").removeClass("collapsed");
			$(".left, .info").hide();

			$(".items").css({"left":"0px","width":"100%", "overflow-x" : "hidden", "overflow-y" : "auto"});

			// temp
			item_id_img = $("#" + current + " a.img-src").attr("href");
			
			// Clear all content in all items
			$("#" + item_id + " .img-cover").hide();
			$("#" + item_id + " .item-content").html('<div class="content-image-div"><img class="content-image" src="img/big/' + item_id_img + '" alt="item image" /></div><div class="content-info"><h2>'+title+'</h2><div class="body">'+body+'</div>');
			
			setTimeout(function(){
				//$("#" + item_id + " .content-image").css({"position" : "fixed"});
				//$("#" + item_id + " .content-image-div").css({"height" : $("#" + item_id + " .content-image").height() + "px"});
				}, 500);
			
			// console.log("Height of div:" ,$(".content-info").height());
			var margintop = $(".content-info .body").height()/-3;
			// console.log("height:",$(".content-info .body").height());
			margintop = String(margintop) + "px";

			var itemwidth = $(window).width() - ($(window).width()/3);
			var marginleft = String(itemwidth/-2)+"px";
			

			//$(".content-info").css({"margin-top" : margintop,"margin-left":marginleft,"width":itemwidth});
			$("#go-back").show();

			// Expand the selected item to full screen, and make all other cover images with as 0 so they will disappear
			$(".one-item").each(function(index, element) {
                if ($(this).attr("id") != item_id) {
					$(this).css({"width" : "0px"});
					var thisitem = $(this);
					setTimeout(function(){
						thisitem.css({"height" : "0px"});
					}, 500);
				} else {
					var src = $(element).find(".content-image").attr("src");

					var buffer = new Image();
					buffer.src = src;

					// ***** Calculate the amount to apply to the top margin on the text *****
					// var apr = buffer.naturalWidth() / buffer.naturalHeight();
					buffer.onload = function() {
						var apr = buffer.naturalWidth / buffer.naturalHeight;
						var bodymargin = String((width/apr)-51)+"px";
						$(".content-info").css({"margin-top":bodymargin});
					}
					

					// var apr = $img.width();

					// console.log("img: ",$img);

					$(this).css({"width" : width+"px"});
					var itemheight = $(".content-image").height();
					// console.log("Height: ",itemheight);
				}
            });
        });
    });
	
	// When you close the big image
	$("#go-back").click(function(e) {
		//$(".content-image").css({"position" : "relative"});
		contentView = false;
		window.location.hash = "";
		
		$(".items").scrollTop(0);
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

		$(".items").css({"left":"270px", "overflow-x" : "scroll", "overflow-y" : "hidden"});

		
		$(".one-item").each(function(index, element) {
			$(this).css({"width" : "180px", "height" : "100%"});
		});
		
		setTimeout(function(){
			$("#" + current + " .img-cover").fadeIn(500, function(){
				$(".item-content").html("");
				$("#go-back").hide();
			});
		}, 500);
    });
	$(window).resize();
	
	// Open the corresponding page if there is a hash in url
	if (window.location.hash) {
		$(window.location.hash + " .img-cover").click();
	}
});