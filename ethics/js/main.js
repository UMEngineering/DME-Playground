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
});