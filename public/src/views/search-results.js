var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
var Masonry = require('masonry-layout');
var l =  require('../localization').l;

function renderHotels(view) {

	var $wrapper = $('.hotels', view.$el);

	// TODO: No hotels found UI message

	// render all hotels that match any currently applied custom filters
	_.each(view.hotels.getFiltered(), function(hotel) {
		var hotelView = new HotelPreviewView({
			model: hotel,
			appendTo: $wrapper
		});
		// listen for hotel preview click and tell parent view to show the hotel
		hotelView.on('click', function(hotelView) {
			view.trigger('show-hotel', hotelView);
		});
		hotelView.render();

	});

	// apply pinterest-style columns and update layout as images are loaded
	// TODO: Investigate/fix bug where Masonry sometimes does not align things properly
	var grid = new Masonry('.view-search-results .hotels', {
		gutter: 13,
		isFitWidth: true
	});
	$('img.thumbnail', $wrapper).load(function() {
		grid.layout();
	});

	// TODO: force thumbnail height via CSS and update grid 
	// layout sooner during loading using something like
	// http://stackoverflow.com/questions/23390393/get-image-height-before-its-fully-loaded
}

// show a no results found message
function renderNoResultsMessage(view) {

	$('.loading', this.$el).hide();

	// if there are actually results to display, then show message
	if(!view.hotels.hasNoResults()) {

		// if there are no results to display after filters, then show message
		if(view.hotels.length > 0 && view.hotels.getFiltered().length === 0) {
			$('.no-filtered-results', view.$el).show();
			return;
		}

		$('.no-results', view.$el).hide();
		return;
	}

	$('.no-results', view.$el).show();

	// get the error text once it's been localized through the template and substitute location and distance
	var $details = $('.no-results .details', view.$el);
	$details.text(l("NO_RESULTS")
		.replace(/MAXDIST/, view.hotels.getMaxDistance())
		.replace(/LOCATION/, view.hotels.getLocationName()));
}

var view = {

	template: _.template(require('../templates/search-results.tpl')),

	initialize: function(options) {

		if(!options || !options.hotels) throw "Search results view must be initialized with a hotels collection";

		var view = this;

		this.hotels = options.hotels;
		this.hotels.on('update', this.render, this);
		this.hotels.on('sort', this.render, this);
		this.hotels.on('filter', this.render, this);
		this.hotels.on('reset', this.render, this);
		this.hotels.on('no-results', function() {
			renderNoResultsMessage(view);
		});
		this.hotels.on('fetch-start', function() {
			$('.loading', view.$el).show();
			$('.hotels', view.$el).hide();
			$('.no-results', view.$el).hide();
		});

	},

	render: function() {

		this.$el.html(this.template({
			l:l
		}));

		$('.loading', this.$el).hide();

		renderHotels(this);
		renderNoResultsMessage(this);

	}
};

module.exports = Backbone.View.extend(view);