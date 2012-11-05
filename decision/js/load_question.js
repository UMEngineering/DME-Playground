// JavaScript Document
// Load the qeustions
var qid = 1;
var questions = 5;
$(document).ready(function(){
	get_question(qid);
});

function get_question(qid){
	var urlAjax = "load_question.php?qid=" + qid;
	var response = $.ajax({url: urlAjax, success: function(){
		$("#top_title").html(questions+" Quick Qs: Question "+qid);
		$("#question_content").html(response.responseText);
		if (questions-qid > 0){
			$(".only").html("Only "+(questions-qid)+" more to go!");
		} else {
			$(".only").remove();
			$(".next").html("RESULTS");
			$(".next").attr("onclick", "goto('result.php');");
		}
	}});
}

function goto(url){
	// Save the last question's cookie
	save_cookie();
	window.location.href=url;
}



function next_question(){
	if (qid < questions){
		// If there are more questions
		// Save the cookie
		save_cookie();
		
		// Go to next question
		qid++;
		get_question(qid);
	} else {
		// If no questions
		
	}
}

// Save the data into cookie
// Cookie format: "q1=123; q2=24; q3=2" etc.
function save_cookie(){
	// Get the checked items and save them into a cookie
	var answer = "";
	$(".choices").each(function(index, element) {
		if ($(this).attr("checked")){
			answer += (index+1);
		}
    });
	if (answer == "") answer = "0";
	
	// Save the cookie, format: "q1=123" etc.
	document.cookie = "q"+qid+"="+answer;
}