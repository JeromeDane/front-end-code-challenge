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
		
		view.hotels.each(function(hotel) {
			
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
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function(options) {
			
			if(!options || !options.hotels) throw "Search results view must be initialized with a hotels collection";
			
			this.hotels = options.hotels;
			this.hotels.on('update', this.render, this);
			this.hotels.on('sort', this.render, this);
			this.hotels.on('fetch-start', function() {
				$('.loading', this.$el).show();
				$('.hotels', this.$el).hide();
			});
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
			$('.loading', this.$el).hide();
			
			if(this.hotels.length > 0) {
				renderHotels(this);
			}
			
			
		}
	};
	
	return Backbone.View.extend(view);
	
});