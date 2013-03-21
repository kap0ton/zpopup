/// <reference path="jquery-1.5.1.min.js" />


(function ($) {
	$.fn.zselecttablerow = function (options) {

		var ctrlPressed = false;

		var settings = $.extend({
			stop: null
		}, options);

		return this.each(function () {

			var parent = $(this);

			$('body').keydown(function (evt) {
				if (evt.ctrlKey)
					ctrlPressed = true;
			});
			$('body').keyup(function () {
				ctrlPressed = false;
			});

			$('tbody tr', parent).each(function () {

				var self = $(this);
				$(this).click(function () {

					if (!ctrlPressed) {
						$('tr', parent).each(function () {
							$(this).removeClass('ui-selected');
						});
					}

					if ($(self).hasClass('ui-selected'))
						$(self).removeClass('ui-selected');
					else
						$(self).addClass('ui-selected');

					if (settings.stop != null)
						settings.stop();

				});
			});
		});
	};
})(jQuery);
