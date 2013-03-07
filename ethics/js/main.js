var currentSet = 0;
var questions = new Array(new Array(0, 1, 2), new Array(3, 4, 5), new Array(6, 7, 8), new Array(9, 10), new Array(11, 12), new Array(13, 14));
$(document).ready(function(){
	// $.easing.def = "easeInOutBounce";
	//$("li.question").first().fadeIn(500);

	// Set all result charts properly
	//display_result(0, 0);
	/*$(".results a#a-0").click(function(e){
		e.preventDefault();
		display_result(0);
	});
	$(".results a#a-1").click(function(e){
		e.preventDefault();
		display_result(1);
	});
	$(".results a#a-2").click(function(e){
		e.preventDefault();
		display_result(2);
	});*/
	
	
	$('.flexslider').flexslider({
		animation: "slide",
		slideshow: false,
		animationLoop: false
	});
});

// Set the result chart to current set of questions
function set_result(q_id){
	while (!search_q_id(q_id)) {
		currentSet++;
		if (currentSet >= questions.length)
			currentSet = 0;
	}
	//console.log(currentSet);
	//console.log(q_id);
	display_result(q_id, currentSet);
	
	// Set the result clicking behavior
	/*$(".results a#a-" + questions[currentSet][0]).unbind();
	$(".results a#a-" + questions[currentSet][0]).click(function(e){
		e.preventDefault();
		display_result(questions[currentSet][0]);
	});
	
	$(".results a#a-" + questions[currentSet][1]).unbind();
	$(".results a#a-" + questions[currentSet][1]).click(function(e){
		e.preventDefault();
		display_result(questions[currentSet][1]);
	});
	
	
	if (questions[currentSet].length == 3) {
		$(".results a#a-" + questions[currentSet][2]).unbind();
		$(".results a#a-" + questions[currentSet][2]).click(function(e){
			e.preventDefault();
			display_result(questions[currentSet][2]);
		});
	}*/
}

// Search if the given q_id is in the current set
function search_q_id(q_id){
	for (var i=0; i<questions[currentSet].length; i++){
		if (questions[currentSet][i] == q_id)
			return true;
	}
	
	return false;
}

// Submit an answer
function submit_answer(i){
	//$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	console.log("Show graph");
	
	// Send the form data via POST request
	var $form = $(".flex-active-slide #question-form-" + i),
		url = $form.attr("action");
	
	// Prepare the data to post
	var jsonStr = '{';
	jsonStr += '"q_id" : "' + $form.find('input[name="q_id-' + i + '"]').val() + '", ';
	jsonStr += '"answer" : "' + $form.find('input[name="answer_' + i + '"]:checked').val() + '", ';
	jsonStr += '"set_id" : "' + $form.find('input[name="set_id"]').val() + '", "count" : "' + $form.find('input[name="count"]').val() + '", "submit-answer" : "Submit your answer"}';
	//alert(jsonStr);
	
	// Insert the link
	if (currentSet != $form.find('input[name="set_id"]').val()-1){
		set_result(i);
	}
	
	currentSet = $form.find('input[name="set_id"]').val()-1;
	
	$.post("post_result.php", eval("(" + jsonStr + ")"), function(data){
		$(".flex-active-slide #question-form-" + i).css("display", "none");
		$(".flex-active-slide #question-li-" + (i+1)).fadeIn(500);
		display_result(i, currentSet);
		console.log(currentSet + " " + i + " " + questions[currentSet][questions[currentSet].length-1]);
		if (questions[currentSet][questions[currentSet].length-1] > i) {
			show_question(i, 1);
		}
	});
}

// Display the result chart for a specific question
function display_result(qid, chart){
	// Get the result via Ajax
	var url = "get_result.php?q_id=" + (qid+1);
	//console.log(url);
	var request = $.getJSON(url, function(result){
		var numbers = new Array("one", "two", "three");
		var counter = 0;
		var sum = 0;
		$.each(result, function(i, field){
			counter++;
			if ($(".flex-active-slide #result-" + chart + " .bar"+counter).length > 0){
				$(".flex-active-slide #result-" + chart + " .bar"+counter).attr("id", field["count"]);
				$(".flex-active-slide #result-" + chart + " .bar"+counter+" span").html(field["count"] + " people");
			} else {
				$(".flex-active-slide #chart-" + chart).append('<div class="bar' + counter + '" id="' + field["count"] + '"><span>' + field["count"] + ' people</span></div>');
			}
			sum += field["count"];
		});
		
		// Show the result bars
		//$(".results").show();
		$("#result-" + chart).show();
		var sum_per_unit = 280 / sum;
		if (sum == 0) sum_per_unit = 0;
		$(".flex-active-slide #result-" + chart + " .bar1").animate({height: sum_per_unit * parseInt($(".flex-active-slide #result-" + chart + " .bar1").attr("id")) + "px"}, 500, "easeOutBounce");
		$(".flex-active-slide #result-" + chart + " .bar2").animate({height: sum_per_unit * parseInt($(".flex-active-slide #result-" + chart + " .bar2").attr("id")) + "px"}, 500, "easeOutBounce");
	});
}

// Show the next question
function show_question(this_id, type){
	if (type == 1) {
		// Next question
		//$(".flex-active-slide #question-div-" + this_id).fadeOut(300, function(){
			$(".flex-active-slide #question-div-" + (this_id + 1)).fadeIn(300);
			$(".flex-active-slide #question-div-" + (this_id)).removeClass("active");
			$(".flex-active-slide #question-div-" + (this_id + 1)).addClass("active");


	//	});
	} else if (type == 0) {
		// Previous question
	//	$(".flex-active-slide #question-div-" + this_id).fadeOut(300, function(){
			$(".flex-active-slide #question-div-" + (this_id - 1)).fadeIn(300);
	//	});
	}
}