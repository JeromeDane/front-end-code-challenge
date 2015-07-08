define([
	'text!templates/search.tpl',
	'views/hotel-details',
	'views/search-box',
	'views/search-filters',
	'views/search-results',
	'collections/hotels'
], function(
	templateHtml,
	HotelDetailsView,
	SearchBoxView,
	SearchFiltersView,
	SearchResultsView,
	HotelsCollection
) {
	
	var renderSubView = com.jeromedane.Utils.renderSubView;
	
	// show a hotel's detailed view
	function showHotelDetails(view, hotelView) {
		// render the hotel details view, passing in the hotel view so details view knows where to display from and which hotel to show
		view.views['hotel-details'].render(hotelView);
	}
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			
			this.hotels = new HotelsCollection();
			
			this.views = {
				'hotel-details': new HotelDetailsView({ hotels: this.hotels }),
				'search-box': new SearchBoxView({ hotels: this.hotels }),
				'search-filters': new SearchFiltersView({ hotels: this.hotels }),
				'search-results': new SearchResultsView({ hotels: this.hotels })
			};
			
			// listen for requests to show a hotel
			var _this = this;
			this.views["search-results"].on('show-hotel', function(hotelView) {
				showHotelDetails(_this, hotelView);
			});
			
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