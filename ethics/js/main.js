var currentSet = 0;
var questions = new Array(new Array(0, 1, 2), new Array(3, 4, 5), new Array(6, 7, 8), new Array(9, 10), new Array(11, 12), new Array(13, 14));
$(document).ready(function(){
	// $.easing.def = "easeInOutBounce";
	$("li.question").first().fadeIn(500);

	$("#results a#one").click(function(e){
		e.preventDefault();
		display_result(0);
	});

	$("#results a#two").click(function(e){
		e.preventDefault();
		display_result(1);
	});

	$("#results a#three").click(function(e){
		e.preventDefault();
		display_result(2);
	});
});

// Submit an answer
function submit_answer(i){
	$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	console.log("Show graph");
	
	// Send the form data via POST request
	var $form = $("#question-form-" + i),
		url = $form.attr("action");
	
	// Prepare the data to post
	var jsonStr = '{';
	jsonStr += '"q_id" : "' + $form.find('input[name="q_id-' + i + '"]').val() + '", ';
	jsonStr += '"answer" : "' + $form.find('input[name="answer_' + i + '"]:checked').val() + '", ';
	jsonStr += '"set_id" : "' + $form.find('input[name="set_id"]').val() + '", "count" : "' + $form.find('input[name="count"]').val() + '", "submit-answer" : "Submit your answer"}';
	//alert(jsonStr);
	
	// Insert the link
	if (currentSet != $form.find('input[name="set_id"]').val()-1){
		$("#results a#one").unbind();
		$("#results a#two").unbind();
		$("#results a#three").unbind();
		$("#results a#one").click(function(e){
			e.preventDefault();
			display_result(questions[currentSet][0]);
		});
		$("#results a#two").click(function(e){
			e.preventDefault();
			display_result(questions[currentSet][1]);
		});
		$("#results a#three").click(function(e){
			e.preventDefault();
			if (questions[currentSet].length == 3)
				display_result(questions[currentSet][2]);
		});
	}
	if (i/3 < 3) {
		$("#three").fadeIn(500);
	} else {
		$("#three").fadeOut(500);
	}
	
	currentSet = $form.find('input[name="set_id"]').val()-1;
	
	$.post("post_result.php", eval("(" + jsonStr + ")"), function(data){
		$("#question-form-" + i).css("display", "none");
		$("#question-li-" + (i+1)).fadeIn(500);
		display_result(i);
	});
}

// Display the result chart for a specific question
function display_result(qid){
	// Get the result via Ajax
	var url = "get_result.php?q_id=" + $('input[name="q_id-' + qid + '"]').attr("value");
	var request = $.getJSON(url, function(result){
		var numbers = new Array("one", "two", "three");
		var counter = 0;
		var sum = 0;
		$.each(result, function(i, field){
			//$("#result-choice").append('<a href="#" id="' + numbers[counter] + '">Result ' + numbers[counter] + '</a>');
			counter++;
			if ($("#bar"+counter).length > 0){
				$("#bar"+counter).attr("class", field["count"]);
				$("#bar"+counter+" span").html(field["count"] + " people");
			} else {
				$("#chart").append('<div id="bar' + counter + '" class="' + field["count"] + '"><span>' + field["count"] + ' people' + field["q_id"] + '</span></div>');
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