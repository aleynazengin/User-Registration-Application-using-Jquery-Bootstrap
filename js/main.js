(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$("#eyeField1").click(function() {

	  $(this).toggleClass("fa-eye fa-eye-slash");
	  var input = $('input[name=password1]');
	  if (input.attr("type") == "password") {
	    input.attr("type", "text");
	  } else {
	    input.attr("type", "password");
	  }
	});

	$("#eyeField2").click(function() {

		$(this).toggleClass("fa-eye fa-eye-slash");
		var input = $('input[name=password2]');
		if (input.attr("type") == "password") {
		  input.attr("type", "text");
		} else {
		  input.attr("type", "password");
		}
	  });

	  $("#spann").click(function() {

		$(this).toggleClass("fa-eye fa-eye-slash");
		var input = $('#password-field');
		if (input.attr("type") == "password") {
		  input.attr("type", "text");
		} else {
		  input.attr("type", "password");
		}
	  });

})(jQuery);
