$(document).ready(function(e) {
	var curr_y = $(document).scrollTop();
	var height = $(document).height();
    $(document).scroll(function(e) {
		// Calculate and change the current progress (max 100.0, min 0.00, for percentage in #progressBar)
		curr_y = $(document).scrollTop();
        var progress = 100.0 * curr_y / (height - $(window).height());
		//console.log(progress);
		$("div#progressBar").css({"width" : progress + "%"});
    });
});