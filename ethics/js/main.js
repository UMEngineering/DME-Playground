var currentSet = 0;
var questions = new Array(new Array(0, 1, 2), new Array(3, 4, 5), new Array(6, 7, 8), new Array(9, 10), new Array(11, 12), new Array(13, 14));
$(document).ready(function(){
	$('.flexslider').flexslider({
		animation: "slide",
		slideshow: false,
		animationLoop: false
	});

	$(".question-p").click(function(e){
		e.preventDefault();
		var $this = $(this);
		//if ($this.parent().hasClass("active")) return false;
		/*if (!$this.parent().hasClass("active")) {
			$("div#s" + ($this.data()["x"]+1) + " .question-div").removeClass("active");
			$this.parent().addClass("active");
		}*/
		
		display_result($this.data()["q"], $this.data()["x"]);
	});
	//console.log(short_ans);
});

// Set the result chart to current set of questions
function set_result(q_id){
	while (!search_q_id(q_id)) {
		currentSet++;
		if (currentSet >= questions.length)
			currentSet = 0;
	}
	
	display_result(q_id, currentSet);
	
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
	//console.log();

	// Send the form data via POST request
	var $form = $(".flex-active-slide #question-form-" + i),
		url = $form.attr("action");
	
	// Prepare the data to post
	var jsonStr = '{';
	jsonStr += '"q_id" : "' + $form.find('input[name="q_id-' + i + '"]').val() + '", ';
	jsonStr += '"answer" : "' + $form.find('input[name="answer_' + i + '"]:checked').val() + '", ';
	jsonStr += '"set_id" : "' + $form.find('input[name="set_id"]').val() + '", "count" : "' + $form.find('input[name="count"]').val() + '", "submit-answer" : "Submit your answer"}';
	
	// Insert the link
	if (currentSet != $form.find('input[name="set_id"]').val()-1){
		set_result(i);
	}
	
	currentSet = $form.find('input[name="set_id"]').val()-1;
	//console.log(currentSet);
	
	$.post("post_result.php", eval("(" + jsonStr + ")"), function(data){
		$(".flex-active-slide #question-form-" + i).fadeOut(500, function(){
			//Fade in "Next Question"
			$("#question-div-"+i+" span.next").fadeIn(500);
		});
		//$(".flex-active-slide #question-li-" + (i+1)).fadeIn(500);
		display_result(i, currentSet);
		if ($(window).width() < 800) {
			if (i == 3 || i == 6) {
				$("div#s" + (currentSet+1)).css({"height" : ($("div#s" + (currentSet+1)).height()+50) + "px"});
			} else if (i == 9){
				$("div#s" + (currentSet+1)).css({"height" : ($("div#s" + (currentSet+1)).height()+80) + "px"});
			}
		}
		//console.log(currentSet + " " + i + " " + questions[currentSet][questions[currentSet].length-1]);
		if (questions[currentSet][questions[currentSet].length-1] > i) {
			//show_question(i, 1);
		}
	});
}

// Display the result chart for a specific question
function display_result(qid, chart){
	// Get the result via Ajax
	var url = "get_result.php?q_id=" + (qid+1);
	$.ajaxSetup({cache : false});
	var request = $.getJSON(url, function(result){
		$.ajaxSetup({cache : true});
		var numbers = new Array("one", "two", "three");
		var counter = 0;
		var sum = 0;
		$.each(result, function(i, field){
			var ppl = (field["count"] == 1) ? " person" : " people";
			counter++;
			if ($(".flex-active-slide #result-" + chart + " .bar"+counter).length > 0){
				$(".flex-active-slide #result-" + chart + " .bar"+counter).attr("id", field["count"]);
				//console.log("Field count", field["count"])
				if (field["count"] != 0) { $(".flex-active-slide #result-" + chart + " .bar"+counter+" span").html(field["count"] + ppl); }
			} else {
				if (field["count"] != 0) {$(".flex-active-slide #chart-" + chart).append('<div class="bar' + counter + '" id="' + field["count"] + '"><span>' + field["count"] + ppl + '</span></div>'); }
			}
			sum += field["count"];
		});
		//console.log(result);
		// Show the result bars
		$("#result-" + chart).fadeIn(500);

		$("#result-" + chart + " .q").removeClass("active");
		//console.log("#result-" + chart + " .smallq"+qid);
		$("#result-" + chart + " #aspan-"+qid).addClass("active");

		// Active and deactive the question content
		$this = $("#question-div-" + qid);
		if (!$this.hasClass("active")) {
			$("div#s" + (chart+1) + " .question-div").removeClass("active");
			$this.addClass("active");
		}
		
		// Change the short answer text if necessary
		//console.log(short_ans[qid][0] + " " + short_ans[qid][1]);
		if (short_ans[qid][0] != "") {
			$("#result-" + chart + " .answer-text1").text(short_ans[qid][0]);
		} else {
			$("#result-" + chart + " .answer-text1").text("Yes");
		}
		if (short_ans[qid][1] != "") {
			$("#result-" + chart + " .answer-text2").text(short_ans[qid][1]);
		} else {
			$("#result-" + chart + " .answer-text2").text("No");
		}
		
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
		var next_id = this_id + 1;
		if ($(window).width() < 800) {
			if (this_id == 5 || this_id == 11) {
				$("div#s" + (currentSet+1)).css({"height" : ($("div#s" + (currentSet+1)).height()+350) + "px"});
			} else {
				$("div#s" + (currentSet+1)).css({"height" : ($("div#s" + (currentSet+1)).height()+240) + "px"});
			}
		}
		$(".flex-active-slide #question-div-" + (next_id)).fadeIn(300);
		$("#question-div-" + (this_id) + " span.next").fadeOut(700);
		$(".flex-active-slide #question-div-" + (this_id)).removeClass("active");
		$(".flex-active-slide #question-div-" + (next_id)).addClass("active");

		scrollTo($("#question-div-"+next_id), $("#question-div-"+next_id).parent());
	} else if (type == 0) {
		// Previous question
		$(".flex-active-slide #question-div-" + (this_id - 1)).fadeIn(300);
	}
}

function scrollTo(object, parent) {
	parent.animate({
		scrollTop: object.offset().top
	}, 2000);
}