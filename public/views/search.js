define([
	'text!templates/search.tpl',
	'views/search-box',
	'views/search-results',
	'collections/locations'
], function(
	templateHtml,
	SearchBoxView,
	SearchResultsView,
	LocationsCollection
) {
	
	var renderSubView = com.jeromedane.Utils.renderSubView;
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			
			this.views = {
				'search-box': new SearchBoxView(),
				'search-results': new SearchResultsView()
			};
			
			this.collections = {
				locations: new LocationsCollection()
			};
			
			var locations = this.collections.locations;
			locations.on('update', function() {
				console.log(locations);
			});
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
			renderSubView(this, 'search-box');
			renderSubView(this, 'search-results');
			
			this.collections.locations.fetch();
			
		}
	};
	
	return Backbone.View.extend(view);
	
});