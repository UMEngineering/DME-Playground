$(document).ready(function(){
	/*var request = $.getJSON("get_questions.php", function(result){
		var appendstr = "<form method=\"POST\" action=\"post_result.php\">";
		$.each(result, function(i, field){
			appendstr += "<div class=\"question\"><p>q_id: " + field["q_id"] + "</p>""<p>set_id: " + field["set_id"] + "</p>""<p>question: " + field["question"] + "</p><p>" + field["answer1"] + "<input type=\"radio\" name=\"a_" + field["q_id"] + "\" value=\"0\" \> " + field["answer2"] + "<input type=\"radio\" name=\"a_" + field["q_id"] + "\" value=\"1\" \></p></div>";
			
		})
		appendstr += "<input type=\"submit\" name=\"answer\" value=\"Submit your answers\" /></form>";
		alert(appendstr);
		$("#questions").append(appendstr);
	});*/
	
	// $.easing.def = "easeInOutBounce";
	
	$("li.question").first().fadeIn(500);

	$('li.question input[type="radio"]').click(function(){
		var next = $(this).parent().parent().next();
		next.fadeIn(500);
		if (next[0].nodeName != "LI") {
			console.log("Show input");
			$('input[name="submit-answer"]').fadeIn(600);
		}
	});

	$('input[name="submit-answer"]').click(function(e){
		e.preventDefault();
		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
		console.log("Show graph");
		$("#results").show();
		$("#results #bar1").animate({height:"200px"}, 500, "easeOutBounce");
		$("#results #bar2").animate({height:"140px"}, 500, "easeOutBounce");
	})

	$("#results a#one").click(function(e){
		e.preventDefault();
		$("#results #bar1").animate({height:"200px"}, 500, "easeOutBounce");
		$("#results #bar2").animate({height:"140px"}, 500, "easeOutBounce");

		$("#results #bar1 span").html("40 people");
		$("#results #bar2 span").html("23 people");
	})

	$("#results a#two").click(function(e){
		e.preventDefault();
		$("#results #bar1").animate({height:"100px"}, 500, "easeOutBounce");
		$("#results #bar2").animate({height:"280px"}, 500, "easeOutBounce");

		$("#results #bar1 span").html("20 people");
		$("#results #bar2 span").html("53 people");
	})

});