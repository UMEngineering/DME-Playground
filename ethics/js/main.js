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
		
		// Send the form data via POST request
		var $form = $("#question-form"),
			url = $form.attr("action");
		
		// Prepare the data to post
		var jsonStr = '{';
		for (var i=0; i<count_total; i++){
			jsonStr += '"q_id-' + i + '" : "' + $form.find('input[name="q_id-' + i + '"]').val() + '", ';
			jsonStr += '"answer_' + i + '" : "' + $form.find('input[name="answer_' + i + '"]').val() + '", ';
		}
		jsonStr += '"set_id" : "' + $form.find('input[name="set_id"]').val() + '", "count" : "' + $form.find('input[name="count"]').val() + '", "submit-answer" : "Submit your answer"}';
		alert(jsonStr);
		
		$.post("post_result.php", eval("(" + jsonStr + ")"), function(data){
			display_result(count_total, 0);
		});
		
	});

	$("#results a#one").click(function(e){
		e.preventDefault();
		display_result(count_total, 0);
		/*$("#results #bar1").animate({height:"200px"}, 500, "easeOutBounce");
		$("#results #bar2").animate({height:"140px"}, 500, "easeOutBounce");

		$("#results #bar1 span").html("40 people");
		$("#results #bar2 span").html("23 people");*/
	});

	$("#results a#two").click(function(e){
		e.preventDefault();
		display_result(count_total, 1);
		/*$("#results #bar1").animate({height:"100px"}, 500, "easeOutBounce");
		$("#results #bar2").animate({height:"280px"}, 500, "easeOutBounce");

		$("#results #bar1 span").html("20 people");
		$("#results #bar2 span").html("53 people");*/
	});
});

function display_result(count_total, answer){
	// Get the result via Ajax
	var url = "get_result.php?answer=" + answer + "&count=" + count_total + "";
	for (var i=0; i<count_total; i++){
		var value = $("input[name='q_id-" + i + "']").attr("value");
		url += "&q_id-" + i + "=" + value;
	}
	var request = $.getJSON(url, function(result){
		var numbers = new Array("one", "two", "three");
		var counter = 0;
		var sum = 0;
		$.each(result, function(i, field){
			//$("#result-choice").append('<a href="#" id="' + numbers[counter] + '">Result ' + numbers[counter] + '</a>');
			counter++;
			
			// If the total questions are three, then adjust the position of three bars
			var style = "";
			if (count_total == 3) {
				var new_pos = 60 * counter + 80 * (counter-1);
				style = 'style="left: ' + new_pos + 'px"';
			}
			
			if ($("#bar"+counter).length > 0){
				$("#bar"+counter).attr("class", field["count"]);
				$("#bar"+counter+" span").html(field["count"] + " people");
			} else {
				$("#chart").append('<div id="bar' + counter + '" ' + style + ' class="' + field["count"] + '"><span>' + field["count"] + ' people</span></div>');
			}
			sum += field["count"];
		});
		
		// Show the result bars
		$("#results").show();
		var sum_per_unit = 290 / sum;
		$("#results #bar1").animate({height: sum_per_unit * parseInt($("#results #bar1").attr("class")) + "px"}, 500, "easeOutBounce");
		$("#results #bar2").animate({height: sum_per_unit * parseInt($("#results #bar2").attr("class")) + "px"}, 500, "easeOutBounce");
		$("#results #bar3").animate({height: sum_per_unit * parseInt($("#results #bar3").attr("class")) + "px"}, 500, "easeOutBounce");
	});
}