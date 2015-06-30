define([
	'text!templates/header.tpl',
	'views/locale-switcher'
], function(
	templateHtml,
	LocaleSwitcherView
) {
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			
			var _this = this;
			
			this.views = {
				localeSwitcher: new LocaleSwitcherView()
			};
			
			// bubble locale change up to any parent views that will handle re-rendering
			this.views.localeSwitcher.on('change', function(locale) {
				_this.trigger('locale-change', locale);
			});
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
			this.views.localeSwitcher.setElement($('.view-locale-switcher', this.$el));
			this.views.localeSwitcher.render();
			
			
		}
	};
	
	return Backbone.View.extend(view);
	
});