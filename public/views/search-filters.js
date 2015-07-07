define([
	'text!templates/search-filters.tpl'
], function(
	templateHtml
) {
	
	
	// initialize sort functionality
	function initSortBy(view) {
		
		var $sortBy = $('select[name="sort-by"]', view.$el);
		
		// resort the collection of found hotels on select change
		$sortBy.change(function() {
			view.hotels.sort({
				order: this.value
			});
		});
		
		// set currently selected sort order
		$sortBy.val(view.hotels.getSortOrder());
	}
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function(options) {
			
			if(!options || !options.hotels) throw "Search filters view must be initialized with a hotels collection";
			
			this.hotels = options.hotels;
			this.hotels.on('update', this.render, this);
			
		},
		
		render: function() {
			
			if(this.hotels.length > 0) {
				this.$el.html(this.template({
					hotels: this.hotels
				}));
			} else {
				// don't render anything if there are no hotel results
				this.$el.html("");
			}
			$('button', this.$el).button();
		}
	};
	
	return Backbone.View.extend(view);
	
});