define([
	'text!templates/search-results.tpl'
], function(templateHtml) {
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function(options) {
			
			if(!options || !options.hotels) throw "Search results view must be initialized with a hotels collection";
			
			this.hotels = options.hotels;
			this.hotels.on('update', function() {
				console.log(options.hotels);
			});
			this.hotels.on('fetch-start', function() {
				console.log('loading...');
			});
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
		}
	};
	
	return Backbone.View.extend(view);
	
});