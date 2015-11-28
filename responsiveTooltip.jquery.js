(function ( $ ) {
/**
 * Tooltip plugin
 *Show tip on hover & slide in overlay in compact view
 */
	$.fn.responsiveTooltip = function(options) {
		var COMPACT_WIDTH = 768;
	 	var settings = $.extend({
			className: 'tooltip-tip',
			overlay: 'tooltip-overlay',
			xMargin: 10,
			yMargin: 10,
			zIndex: 1000
      }, options );

		var desktopAppend = function ($parent, tip) {
			// clean up first
			destroy();
			var	offset = $parent.offset(),
					xPos = Math.round(offset.left),
					yPos = Math.round(offset.top),
					$tooltip = $('<div/>')
			             	.attr('class', settings.className)
			             	.css({
				             	left: xPos - settings.xMargin,
				             	top: yPos,
											'z-index': settings.zIndex
			             	})
			             	.html($('<span/>').html(tip));

			$('body').append($tooltip);
			$tooltip.css('top', yPos - $tooltip.height() - settings.yMargin);
		}

		var compactAppend = function (tip) {
			// clean up first
			destroy();
			var	$tooltip = $('<div/>')
			             	.attr('class', settings.className + ' compact')
			             	.css({
											'z-index': settings.zIndex,
											position: 'fixed',
											bottom: 0
			             	})
			             	.html($('<span/>').html(tip));

			var $overlay = $('<div/>')
			             	.attr('class', settings.overlay)
			             	.css({
											'z-index': settings.zIndex -1,
											position: 'fixed',
											bottom: 0,
											top: 0,
											left: 0,
											right: 0
			             	})

				$('body')
					.append($overlay)
					.append($tooltip);

				var tipHeight = $tooltip.height();
				// animate the tip in from bottom of window
				$tooltip.height(0);
				$tooltip.animate({
					height: tipHeight
				}, 500);
			// remove on overlay interaction
			$overlay.bind('touchend click', function() {
		    $overlay
		    	.unbind('touchend click')
		    destroy();
			});
		}

		// remove it all
		var destroy = function () {
			$('.'+settings.className).fadeOut(function () {
				$(this).remove();
			});
			$('.'+settings.overlay).fadeOut(function () {
				$(this).remove();
			});
		}

		return this.each(function(){
			var $this = $(this),
					tip = $this.attr('title');
			 
			// mouse over for desktop browsers
			$this.mouseover(function() {
				if (window.innerWidth > COMPACT_WIDTH){
					desktopAppend($this, tip);
				}
			}).mouseout(function() {
				if (window.innerWidth >= COMPACT_WIDTH){
					destroy()
				}
			});

			$this.click(function (e) {
				if (window.innerWidth <= COMPACT_WIDTH){
					e.preventDefault();
					compactAppend(tip);
				}
			});
		});
	};
}( jQuery ));