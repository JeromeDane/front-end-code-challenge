define([
	'text!templates/search.tpl',
	'views/search-box',
	'views/search-filters',
	'views/search-results',
	'collections/hotels'
], function(
	templateHtml,
	SearchBoxView,
	SearchFiltersView,
	SearchResultsView,
	HotelsCollection
) {
	
	var renderSubView = com.jeromedane.Utils.renderSubView;
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			
			this.hotels = new HotelsCollection();
			
			this.views = {
				'search-box': new SearchBoxView({ hotels: this.hotels }),
				'search-filters': new SearchFiltersView({ hotels: this.hotels }),
				'search-results': new SearchResultsView({ hotels: this.hotels })
			};
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
			renderSubView(this, 'search-box');
			renderSubView(this, 'search-filters');
			renderSubView(this, 'search-results');
			
		}
	};
	
	return Backbone.View.extend(view);
	
});