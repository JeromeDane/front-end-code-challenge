define([
	'text!templates/search-filters.tpl'
], function(
	templateHtml
) {
	
	function initOpenCloseToggle(view) {
		
		// open if currently closed
		$('button.show-filters', view.$el).click(function() {
			toggleOpenClosed(view);
		});
		
		// initialize close button click
		$('button.close', view.$el).click(function() {
			toggleOpenClosed(view);
		});
		
		// apply correct open/closed state
		$('.search-filters-wrapper', view.$el).addClass(view.isOpen ? 'open' : 'closed');
	}
	
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
	
	function toggleOpenClosed(view) {
		view.isOpen = !view.isOpen;
		view.render();
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
			
			initOpenCloseToggle(this);
			initSortBy(this);
			
			$('button', this.$el).button();
		}
	};
	
	return Backbone.View.extend(view);
	
});