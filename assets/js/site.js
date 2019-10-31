
if (typeof console === "undefined" || typeof console.log === "undefined") {
	console = {};
	console.log = function() {};
}

jQuery(document).ready(function($){
	var w = 760,
		h = 520,
		menu = $('#masthead');

	$('html').removeClass('no-js');

	$('.hamburger').on('click', function (e){
		e.preventDefault();

		$('body').toggleClass('menu-open');
	});

	if ($('#splash').length) {
		$('#splash').height($(window).height());
	}

	$( ".tabs" ).tabs();

	// Ascensor Settings
	var ascensor = jQuery('#content').ascensor({
		time: 1000,
		childType: 'section',
		swipeNavigation: false,
		easing: 'easeInOutQuint',
		loop: false,
		direction: 'y',
		keyNavigation: false
	});
	var ascensorInstance = jQuery('#content').data('ascensor');

	// Add class to the active menu item
	jQuery(".links-to-floor-li a:eq(" + ascensor.data("current-floor") + ")").addClass("active");

	// Menu click event
	jQuery('body')
		.find('.links-to-floor-li a')
		.on("click", function (e) {
			"use strict";

			e.preventDefault();

			// Get the id of the floor
			var floornumber = jQuery(this).data('id');

			// Remove class from all menu items
			jQuery('body').find('.links-to-floor-li a').removeClass("active");

			// Add class to the active menu item
			jQuery(this).addClass("active");

			// Close modal menu
			jQuery("body").removeClass("menu-open");

			// Scroll the page
			ascensorInstance.scrollToFloor(floornumber - 1);

			// Set page hash - this needs to be last!
			window.location.hash = jQuery(this).attr('href').replace('#', '');
		});

	var hash = window.location.hash.substr(1);

	if (window.location.hash) {
		// Get the active page information from the page link and add/remove required classes
		var smenu = jQuery(".menu a").filter('[href="#' + hash + '"]');

		jQuery('body').find('.menu a').removeClass("active");

		smenu.addClass("active");

		// Scroll the page
		var floornumber = jQuery(".active").data('id');
		ascensorInstance.scrollToFloor(floornumber - 1);
	}
});
