$(document).ready(function(){
	
	function light(one, on) {
		if(on) {
			
			$(one).addClass("on");
			
		}
		else {
			$(one).removeClass("on");
		}
	}
	
	function lights(one, two, on) {
		if(on) {
			$(one).addClass("on");
			$(two).addClass("on");
		}
		else {
			$(one).removeClass("on");
			$(two).removeClass("on");
		}
	}
	
	$("#animals li").mouseenter(function(){
		var pair = $(this).data("pair"), me = $(this).attr("id");
		lights("#"+me,"#"+pair,true);
	});
	
	$("#animals li").mouseleave(function(){
		var pair = $(this).data("pair"), me = $(this).attr("id");
		lights("#"+me,"#"+pair,false);
	});
	
	$("#butterflies").mouseenter(function(){lights("#7","#9",true)}); $("#butterflies").mouseleave(function(){lights("#7","#9",false)});
	
	$("#butterflies, #7, #9").click(function(e){
		e.preventDefault();
		
		$("#animals, #butterfly").fadeToggle();
	});
	
	
	$(window).scroll(function(e){
		$("div.consider").each(function(k,v){
			if ($(this).offset().top - $(window).scrollTop() < -300) {
				$(this).removeClass("consider").addClass("donotconsider");
			}
		});
		$("div.donotconsider").each(function(k,v){
			if ($(this).offset().top - $(window).scrollTop() > -300) {
				$(this).removeClass("donotconsider").addClass("consider");
			}
		});
		
		$("#animals li").removeClass("on");
		
		light("#"+$("div.consider").first().data('thumb'),true);
		
	});
	
	
	$("#animals li").click(function(e){
		e.preventDefault();
		var to = "#" + $(this).data("pair");
		console.log(to);
		$.scrollTo($(to),800);	
		
	});	
	

});  
