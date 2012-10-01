$(document).ready(function(){
	
	$("#container").click(function(e){
		console.log("Click:", e);
		console.log("This:", this);
	});
	
	$(".captions").click(function(event){
		event.preventDefault();
	});
	
	var captionon = false;
	
	function lights(one, two, on) {
		one = "li"+one, two = "li"+two, oneimg = one +" img", twoimg = two +" img";
		if(on) {
			
			$(".tiles li img").stop().animate({opacity: .2}, 100);
			$(oneimg).stop().animate({opacity: 1}, 100, function(){});
			$(twoimg).stop().animate({opacity: 1}, 100); 
			var hoverCapHeight =  (-10 - parseFloat($(one+" .hovercap").css("height").replace("px", ""))) + "px"; console.log(hoverCapHeight);
			var hoverCapHeight2 =  (-10 - parseFloat($(two+" .hovercap").css("height").replace("px", ""))) + "px"; console.log(hoverCapHeight);
			$(one+" .hovercap").stop().animate({"margin-top": hoverCapHeight } );
			$(two+" .hovercap").stop().animate({"margin-top": hoverCapHeight2 } );
		}
		else {
			
			$(".tiles li img").stop().animate({opacity: .5}, 100);
			$(oneimg).stop().animate({opacity: .5}, 100, function(){  });
			$(twoimg).stop().animate({opacity: .5}, 100);
			$(one+" .hovercap").stop().animate({"margin-top": "0px" } );
			$(two+" .hovercap").stop().animate({"margin-top": "0px" } );
		}
	}
	
	function reorder(one, two, feature1, feature2) {
		
		var oneleft = one.css("left"), twoleft = two.css("left"), onetop = one.css("top"), twotop = two.css("top"), fonetop = feature1.css("top"), foneleft = feature1.css("left"), ftwotop = feature2.css("top"), ftwoleft = feature2.css("left");
		
		if (one.hasClass("before")) {
			//Switch around the featured position classes
			feature1.removeClass("feature1");
			one.addClass("feature1");
			feature2.removeClass("feature2");
			two.addClass("feature2");
			
			//Switch one and feature1
			console.log("Switch one and feature1");
			one.animate({
						top: fonetop,
						left: foneleft
				   },200,"easeOutExpo");
			feature1.animate({
						top: onetop,
						left: oneleft
				   },200,"easeOutExpo");
				   
			//Switch two and feature2
			two.animate({
						top: ftwotop,
						left: ftwoleft
				   },200,"easeOutExpo");
			feature2.animate({
						top: twotop,
						left: twoleft
				   },200,"easeOutExpo");
		}
		if (two.hasClass("before")) {
			//Switch around the featured position classes
			feature1.removeClass("feature1");
			two.addClass("feature1");
			feature2.removeClass("feature2");
			one.addClass("feature2");
			
			//Switch one and feature2
			console.log("Switch one and feature2");
			one.animate({
						top: ftwotop,
						left: ftwoleft
				   },200,"easeOutExpo");
			feature1.animate({
						top: twotop,
						left: twoleft
				   },200,"easeOutExpo");
				   
			//Switch two and feature1
			two.animate({
						top: fonetop,
						left: foneleft
				   },200,"easeOutExpo");
			feature2.animate({
						top: onetop,
						left: oneleft
				   },200,"easeOutExpo");
		}
		
		/*var oneleft = one.css("left"), twoleft = two.css("left"), onetop = one.css("top"), twotop = two.css("top");
		one.animate({
						top: twotop,
						left: twoleft,
				   },200,"easeOutExpo");
		two.animate({
						top: onetop,
						left: oneleft,
				   },210,"easeOutExpo");*/
				   
		// For relative positioning: $("#"+parentid+" li:nth-child("+after+")").after(temp);
	}	
	
	function caption(which, on) {
		console.log("Which: ", which);
		if (on) {
			$("#"+which).addClass("current");
			captionon = true;
			$("#"+which).stop().animate({
					"margin-top": 0
				  }, 100, function() {
					// Animation complete.
				  });
			$("#ulthree").stop().animate({
					"width": "1010px"
				}, 100, function() {
				// Animation complete
			});
			$("#ulfive").stop().animate({
					"width": "1010px"
				}, 100, function() {
				// Animation complete
			});
			
			$(".feature1 img, .feature2 img").addClass("bright");
		}
		else {
			captionon = false;
			var height = "-"+ $("#"+which).css("height");
			console.log("Off", height);
			$("#"+which).removeClass("current");
			$("#"+which).stop().animate({
					"margin-top": height
				  }, 100, function() {
					// Animation complete.
				  });
			$("#ulthree").stop().animate({
					"width": "610px"
				}, 100, function() {
				// Animation complete
			});
			$("#ulfive").stop().animate({
					"width": "810px"
				}, 100, function() {
				// Animation complete
			});
			$(".feature1 img, .feature2 img").removeClass("bright");
		}
		
			
			
	}
	
	$(".tiles li").mouseenter(function(){
		//console.log("Mouseenter: ", this);
		var pair = $(this).data("pair"), me = $(this).attr("id");
		lights("#"+me,"#"+pair,true);
	});
	
	$(".tiles li").mouseleave(function(){
		var pair = $(this).data("pair"), me = $(this).attr("id");
		lights("#"+me,"#"+pair,false);
	});
	
	$(".tiles li").click(function(e){
		e.preventDefault();
		console.log("CLick: ", this);
		var cap = $(this).data("caption"), pair = ".tiles li#"+$(this).data("pair");
		pair = $(pair);
		reorder($(this), pair, $(".tiles li.feature1"), $(".tiles li.feature2"));
		//reorder(pair,$(".tiles li.after"));
		caption(cap, true);
	});
	
	$(document).keyup(function(e) {
		if (e.keyCode == 13) { 
		
		}     
		// enter
		if (e.keyCode == 27) { 
			if (captionon) {
				caption($(".caption_container .current").attr("id"), false);
			}
		}   
		// esc
	});
	
	$(".caption_off").click(function(e){
		e.preventDefault();
		caption($(this).parent().attr("id"), false);
	});
		
	/*$("#butterflies, #7, #9").click(function(e){
		e.preventDefault();
		
		$("#animals, #butterfly").fadeToggle();
		
		
	});*/

});  
