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
		
		view.hotels.each(function(hotel) {
			
			(new HotelPreviewView({
				model: hotel,
				appendTo: $wrapper
			})).render();
			
		});
		
		// apply pinterest-style columns
		new Masonry('.view-search-results .hotels');
	}
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function(options) {
			
			if(!options || !options.hotels) throw "Search results view must be initialized with a hotels collection";
			
			this.hotels = options.hotels;
			this.hotels.on('update', this.render, this);
			this.hotels.on('fetch-start', function() {
				$('.loading', this.$el).show();
			});
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
			$('.loading', this.$el).hide();
			
			renderHotels(this);
			
			
		}
	};
	
	return Backbone.View.extend(view);
	
});