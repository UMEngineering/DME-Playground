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
			$(".next").attr("onclick", "goto('students.html');");
		}
	}});
}

function goto(url){
	// Save the last question's cookie
	save_cookie();
	
	var param = split_cookie();
	window.location.href=url+"?"+param;
}

// Split the cookie to get data from each one of cookie
function split_cookie(){
	// All cookies are in one string, and break them apart by ";"
	var str_cookie = document.cookie;
	
	alert(str_cookie);
	
	var arr_cookie = str_cookie.split("; ");
	var result = "";
	for (var i=0; i<arr_cookie.length-2; i++){
		//var arr_temp = arr_cookie[i].split("=");
		result += arr_cookie[i]+"&";
	}
	
	result += arr_cookie[i];
	return result;
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