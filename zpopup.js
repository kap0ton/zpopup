(function ($) {
	$.fn.extend({
		zpopup: function (onCloseCallback) {

			var callBack = onCloseCallback;

			//some code
			var zOverlay = $('<div id="zpopup-overlay"></div>');
			$('body').append(zOverlay);
			zOverlay.click(function (e) {
				e.stopPropagation();
			});

			return this.each(function () {

				var parent = $(this);
				var zWidth = parent.css("width");

				var self = $('.zpopup-select', $(this));
				self.hide();

				var header = $('<input type="text" class="zpopup-header" value=""></input>');
				header.css("width", parseInt(zWidth) - 4 + 'px');
				header.attr("readonly", "readonly");
				//parent.append(header);
				header.insertAfter(self);
				$(header).data("isOpen", false);

				var hidden = $('.zpopup-hidden', $(this)).val();
				var ids = hidden.length > 0 ? hidden.split(';') : new Array();

				//set header text
				var txtVals = '';
				$('option', self).each(function () {
					for (var idd in ids) {
						if ($(this).val() == ids[idd]) {
							txtVals += $(this).text() + ', ';
							break;
						}
					}
				});
				header.val(txtVals === '' ? '' : txtVals.substring(0, txtVals.length - 2));

				$(header).click(buildOverflow);
			});

			function onChckChng(wrp) {
				var txtIds = '';
				var txtVals = '';
				$('input[type=checkbox]', zOverlay).each(function (index, item) {
					if (item.checked) {
						txtIds += $(item).attr('tid') + ";";
						txtVals += $(item).attr('tval') + ', ';
					}
				});
				$('.zpopup-header', $(wrp)).val(txtVals === '' ? '' : txtVals.substring(0, txtVals.length - 2));
				$('.zpopup-hidden', $(wrp)).val(txtIds === '' ? '' : txtIds.substring(0, txtIds.length - 1));
			}

			function zHide() {
				zOverlay.data({ isOpen: false, idOpen: null });
				zOverlay.hide();
				zOverlay.children().remove();
				$(document).unbind('click', zHide);

				if (callBack != null)
					callBack();
			}

			function buildOverflow(e) {
				e.preventDefault();
				e.stopPropagation();

				var wrp = $(this).closest('.dropbox');
				var self = $('.zpopup-select', wrp);
				var selfId = self.attr("id");
				var header = $('.zpopup-header', wrp);
				var hidden = $('.zpopup-hidden', wrp).val();
				var ids = hidden.length > 0 ? hidden.split(';') : new Array();

				var isOpen = zOverlay.data("isOpen");
				var idOpen = zOverlay.data("idOpen");
				if (isOpen && idOpen == selfId) {
					zHide();
				} else {
					zOverlay.data({ isOpen: true, idOpen: selfId });
					zOverlay.css({
						width: parseInt(wrp.css("width")) + 30 + 'px',
						left: wrp.offset().left,
						top: parseInt(wrp.offset().top) + parseInt(wrp.css("height")) + 1 + 'px'
					});
					zOverlay.show();
					zOverlay.children().remove();

					var txtVals = '';
					$('option', self).each(function () {
						var div = $('<div class="zpopup-itemrow" />');
						var chb = $('<input type="checkbox" />').change(function () {
							onChckChng(wrp);
						});
						var chbId = self.attr('id') + '-' + $(this).val();
						chb.attr('id', chbId);
						chb.attr('tid', $(this).val());
						chb.attr('tval', $(this).text());

						for (var idd in ids) {
							if ($(this).val() == ids[idd]) {
								chb.attr('checked', 'checked');
								txtVals += $(this).text() + ', ';
								break;
							}
						}

						var lbl = $('<label />');
						lbl.attr('for', chbId);
						lbl.text($(this).text());
						div.append(chb);
						div.append(lbl);
						zOverlay.append(div);
					});
					header.val(txtVals === '' ? '' : txtVals.substring(0, txtVals.length - 2));
					$(document).click(zHide);
				}
			}
		}
	});
})(jQuery);
