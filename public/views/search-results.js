define([
	'text!templates/search-results.tpl',
	'views/hotel-preview',
	'masonry'
], function(
	templateHtml,
	HotelPreviewView,
	Masonry
) {
	
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
	}
	
	// show a no results found message
	function renderNoResultsMessage(view) {
		
		$('.loading', this.$el).hide();
		
		// if there are actually results to display, then 
		if(!view.hotels.hasNoResults()) {
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
		
		template: _.template(templateHtml),
		
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
			
			this.$el.html(this.template());
			
			$('.loading', this.$el).hide();
			
			renderHotels(this);
			renderNoResultsMessage(this);
			
		}
	};
	
	return Backbone.View.extend(view);
	
});