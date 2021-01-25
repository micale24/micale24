/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});
	//Contact Form function to stay on webpage
				window.addEventListener("DOMContentLoaded", function() {
				
					// get the form elements defined in your form HTML above
					
					var form = document.getElementById("my-form");
					// var button = document.getElementById("my-form-button");
					var status = document.getElementById("status");
				
					// Success and Error functions for after the form is submitted
					
					function success() {
					  form.reset();
					//   button.style = "display: none ";
					  status.innerHTML = "Thanks, I will contact you soon!";
					}
				
					function error() {
					  status.innerHTML = "Oops! There was a problem.";
					}
				
					// handle the form submission event
				
					form.addEventListener("submit", function(ev) {
					  ev.preventDefault();
					  var data = new FormData(form);
					  ajax(form.method, form.action, data, success, error);
					});
				  });
				  
				  // helper function for sending an AJAX request
				
				  function ajax(method, url, data, success, error) {
					var xhr = new XMLHttpRequest();
					xhr.open(method, url);
					xhr.setRequestHeader("Accept", "application/json");
					xhr.onreadystatechange = function() {
					  if (xhr.readyState !== XMLHttpRequest.DONE) return;
					  if (xhr.status === 200) {
						success(xhr.response, xhr.responseType);
					  } else {
						error(xhr.status, xhr.response, xhr.responseType);
					  }
					};
					xhr.send(data);
				  }
})(jQuery);