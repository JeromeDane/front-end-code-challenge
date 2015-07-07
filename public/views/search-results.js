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
			(new HotelPreviewView({
				model: hotel,
				appendTo: $wrapper
			})).render();
			
		});
		
		
		// apply pinterest-style columns and update layout as images are loaded
		// TODO: Investigate/fix bug where Masonry sometimes does not align things properly
		var grid = new Masonry('.view-search-results .hotels');
		$('img.thumbnail', $wrapper).load(function() {
			grid.layout();
		});
		
		// TODO: force thumbnail height via CSS and update grid 
		// layout sooner during loading using something like
		// http://stackoverflow.com/questions/23390393/get-image-height-before-its-fully-loaded
	}
	
	// show a no results found message
	function showNoResults(view) {
		
		$('.loading', this.$el).hide();
		
		$('.no-results', view.$el).show();
		
		// get the error text once it's been localized through the template and substitute location and distance
		var $details = $('.no-results .details', view.$el);
		$details.text($details.text()
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
				showNoResults(view);
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
			
			if(this.hotels.length > 0) {
				renderHotels(this);
			}
			
			// show no results if search has been run but no hotels in collection
			if(this.hotels.getMaxDistance() && this.hotels.length === 0) {
				showNoResults(this);
			}
			
			
		}
	};
	
	return Backbone.View.extend(view);
	
});