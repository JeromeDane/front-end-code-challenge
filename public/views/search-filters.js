define([
	'text!templates/search-filters.tpl'
], function(
	templateHtml
) {

	// TODO: Include filters as parameters in document location to allow bookmarking

	// apply correct open/closed state
	function applyOpenClosedClasses(view) {
		var $elem = $('.search-filters-wrapper', view.$el);
		if(view.isOpen) {
			$elem.addClass('open');	
			$elem.removeClass('closed');	
		} else {
			$elem.addClass('closed');	
			$elem.removeClass('open');	
		}
	}

	function initFilterByName(view) {
		var $input = $('input[name="name"]');
		$input.keyup(function(e) {
			// clear name filter if escape key pressed
			if(e.which === 27) $input.val("");
			view.hotels.filterBy("name", $input.val());
		});
	}
	
	function initOpenCloseToggle(view) {
		
		// open if currently closed
		$('button.show-filters', view.$el).click(function() {
			toggleOpenClosed(view);
		});
		
		// initialize close button click
		$('button.close', view.$el).click(function() {
			toggleOpenClosed(view);
		});
		
		applyOpenClosedClasses(view);
		
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
		applyOpenClosedClasses(view);
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
			initFilterByName(this);
			
			// render jquery-ui buttons
			$('button', this.$el).button();
		}
	};
	
	return Backbone.View.extend(view);
	
});