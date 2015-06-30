define([
	'text!templates/search.tpl',
	'views/search-box',
	'views/search-results'
], function(
	templateHtml,
	SearchBoxView,
	SearchResultsView
) {
	
	var renderSubView = com.jeromedane.Utils.renderSubView;
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			
			this.views = {
				'search-box': new SearchBoxView(),
				'search-results': new SearchResultsView()
			};
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
			renderSubView(this, 'search-box');
			renderSubView(this, 'search-results');
			
		}
	};
	
	return Backbone.View.extend(view);
	
});