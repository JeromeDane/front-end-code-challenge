define([
	'text!templates/locale-switcher.tpl'
], function(templateHtml) {
	
	var locales = ["en", "fr"];
	
	// local variable pointing to localization library
	var Localization = com.jeromedane.Localization;
	
	/**
	 * Initialize locale selector change handler
	 * 
	 * @param {type} view
	 * @returns {undefined}
	 */
	function initSelectorHandler(view) {
		
		var $selector = $('.locale-switcher-select', view.$el);
		
		$selector.on('change', function() {
			
			var newLocale = $selector.val();
			Localization.setLocale(newLocale);
			view.trigger('change', newLocale);
			
		});
		
	}
	
	var view = {
		
		template: _.template(templateHtml),
		
		render: function() {
			
			this.$el.html(this.template({
				locales: locales,
				currentLocale: Localization.getLocale()
			}));
			
			initSelectorHandler(this);
			
		}
	};
	
	return Backbone.View.extend(view);
	
});