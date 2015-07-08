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
		
		resize: function() {
			
			var cardWidth = 230;
			var cardGutter = 13;
			
			// figure out how many hotel previews could fit on one row for the current window size
			var numCards = Math.floor($(window).width() / (cardWidth + cardGutter));
			
			if(numCards > 1) {
				// make the UI container wide enough to fit the most possible hotel previews for window size
				$('.ui-container', this.$el).width(numCards * 
						(cardWidth + cardGutter)
						- cardGutter);
			} else {
				$('.ui-container', this.$el).width($(window).width() - 40);
			}
		},
		
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
		
			// resize the UI as needed
			$(window).resize(function() {
				_this.resize();
			});
		
		},               
                
		render: function() {
			
			this.$el.html(this.template());
			
			renderSubView(this, 'header');
			renderSubView(this, 'search', 'body');
			
			this.resize();
			
		}
	};
	
	return Backbone.View.extend(view);
	
});