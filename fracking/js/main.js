$(document).ready(function(){
	
	var $window = $(window), scrollTop, elementOffset, distance, opacityOne;


	$window.resize(function(){

	});

	$window.bind('scroll', function () {
		scrollTop = $window.scrollTop();
		if (scrollTop < 700) {
			
		    elementOffset = $('section.two').offset().top;
		    distance      = (elementOffset - scrollTop);

		    opacityOne = distance / 646;

			console.log(distance + " / " + 646);
			console.log("Opacity: ", opacityOne);

			$("section.one").css("opacity", opacityOne);
		}

	});

	$('section.three img').bind('inview', function(event, visible) {
      if (visible) {
        $(this).stop().animate({ opacity: 1 });
      } else {
        $(this).stop().animate({ opacity: 0 });
      }
    });


});
