var Backbone = require('backbone');
var _ = require('underscore');
var renderSubView = require('../utils').renderSubView;
var HotelsCollection = require('../collections/hotels');
var HotelDetailsView = require('../views/hotel-details');
var SearchBoxView = require('../views/search-box');
var SearchFiltersView = require('../views/search-filters');
var SearchResultsView = require('../views/search-results');
var l = require('../localization').l;

// show a hotel's detailed view
function showHotelDetails(view, hotelView) {
	// render the hotel details view, passing in the hotel view so details view knows where to display from and which hotel to show
	view.views['hotel-details'].render(hotelView);
}

var view = {

	template: _.template(require('../templates/search.tpl')),

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

		this.$el.html(this.template({
			l: l
		}));

		renderSubView(this, 'search-box');
		renderSubView(this, 'search-filters');
		renderSubView(this, 'search-results');

	}
};

module.exports = Backbone.View.extend(view);