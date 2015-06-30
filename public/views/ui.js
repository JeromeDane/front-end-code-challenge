/**
 * Lazy declaration of a global variable/function for easy 
 * localization calls throughout the rest of the application.
 * This is not really good practice, but it'll save me time
 * for the purposes of this coding challenge. 
 */
var l;

/**
 * Load dependencies for UI view
 */
define([
	'text!templates/ui.tpl',
	'json!../localization.json',
     'views/header',
     'views/search'
], function(
    templateHtml,
	localization,
    HeaderView,
    SearchView
) {

	// globalize localization function for simplicity (see comment abovce declaration of "l" var above)
	l = com.jeromedane.Localization.l;
	
	// define our localization strings
	com.jeromedane.Localization.define(localization);
	
	var renderSubView = com.jeromedane.Utils.renderSubView;

	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			
			// set local reference to this for use in handlers
			var _this = this;
			
			// define subviews
			this.views =  {
				header: new HeaderView(),
				search: new SearchView()
			};
			
			// re-render the user interface on locale change
			this.views.header.on('locale-change', function(locale) {
				_this.render();
			});
		
		},               
                
		render: function() {
			
			this.$el.html(this.template());
			
			renderSubView(this, 'header');
			renderSubView(this, 'search', 'body');
			
			
		}
	};
	
	return Backbone.View.extend(view);
	
});