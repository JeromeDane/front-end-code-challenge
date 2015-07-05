define([
	'text!templates/search-filters.tpl'
], function(
	templateHtml
) {
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function(options) {
			
			if(!options || !options.hotels) throw "Search filters view must be initialized with a hotels collection";
			
			this.hotels = options.hotels;
			this.hotels.on('update', this.render, this);
			
		},
		
		render: function() {
			
			if(this.hotels.length > 0) {
				this.$el.html(this.template());
			} else {
				// don't render anything if there are no hotel results
				this.$el.html("");
			}
		}
	};
	
	return Backbone.View.extend(view);
	
});