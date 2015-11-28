(function ( $ ) {
	/**
	* plugin for responsive tab panels
	* tab layout in desktop & collapse in compact view
	*/
	$.fn.tabPanel = function() {
		var COMPACT_WIDTH = 768;

		return this.each(function() {
			var $panel = $(this),
			$panels = $panel.find('.panel')
			$tab_btns = $panel.find('.panel-title');

			$tab_btns.click(function (e){
				$this = $(this);
				$target = $panel.find('.' + $this.find('a').attr('href'));
				$tab_btns.toggleClass('active');
				if (window.innerWidth <= COMPACT_WIDTH){
	 				// compact behaviour
	 				$target.find('.panel-content').slideToggle(400, function () {
	 					$target.toggleClass('open')
	 					// remove these so they don't interfere with desktop view
	 					$(this).removeAttr('style');
	 				});
	 			} else {
	 				//desktop behaviour
	 				$panels.removeClass('active');
	 				$target.addClass('active');
	 			}
	 			e.preventDefault();
	 		});
		});
	};
}( jQuery ));