define([
	'text!templates/search-filters.tpl',
	'views/search-numresults'
], function(
	templateHtml,
	SearchNumResultsView
) {

	// TODO: Include filters as parameters in document location to allow bookmarking
	
	// TODO: Store filters as they change to re-apply them on re-render (such as after language change)

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

	function initClearFilters(view) {
		$('.clear-filters', view.$el).click(function() {
			view.hotels.clearFilters();
			view.render();
		});
	}

	function initFilterByAmenities(view) {
		
		var $amenities = $('.amenities input', view.$el);
		var selectedAmenities = [];
		
		// for each checkbox, perform filter by amenities when it changes
		$amenities.each(function() {
			$(this).change(function() {
				// update amenities currently selected
				var itemName = this.name;
				if(this.checked) {
					selectedAmenities.push(itemName);
				} else {
					selectedAmenities = _.reject(selectedAmenities, function(item) {
						return item === itemName; 
					});
				}
				// perform filter
				view.hotels.filterBy('amenities', selectedAmenities);
			});
		});
		
		// initialize amenities toggle
		$('.amenities .toggle', view.$el).click(function() {
			toggleAmenitiesShowMore(view);
		});
		
		toggleAmenitiesShowMore(view);
	}

	function initFilterByAvailability(view) {
		var $input = $('.search-filters-wrapper .availability input', view.$el);
		$input.on('change', function() {
			view.hotels.filterBy("availability", this.checked);
		});
	}
	
	function initFilterByRate(view) {
		// get the maximum price for all hotels founr
		var max = view.hotels.max(function(hotel) {
			return hotel.get('nightly_rate');
		}).get('nightly_rate');
		
		var $slider = $('.rate .slider', view.$el);
		
		function _updateRateValueDisplay(values) {
			values = values || $slider.slider('values');
			$('.rate .values', view.$el).text("$" + l(values[0]) + " - $" + l(values[1]));
		}
		
		// create slider
		$slider.slider({
			range: true,
			min: 0,
			max: max,
			values: [0, max],
			step: 5,
			slide: function(evt, ui) {
				_updateRateValueDisplay(ui.values);
			},
			change: function(evt, ui) {
				view.hotels.filterBy("rate", ui.values);
			}
		});	
		_updateRateValueDisplay();
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
		
		var largeWidth = 800;
		
		view.isOpen = $(window).width() >= largeWidth;
		
		// open if currently closed
		$('button.show-filters', view.$el).click(function() {
			toggleOpenClosed(view);
		});
		
		// initialize close button click
		$('button.close', view.$el).click(function() {
			toggleOpenClosed(view);
		});

		// automatically toggle filters on resize when appropriate
		$(window).resize(function() {
			// open filters when moving to large view
			if(!view.isOpen && $(window).width() >= largeWidth) {
				toggleOpenClosed(view);
			}
			// hide filters when moving to small view
			if(view.isOpen && $(window).width() < largeWidth) {
				toggleOpenClosed(view);
			}
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
	
	function toggleAmenitiesShowMore(view) {
		
		var numMin = 10;
		
		var showMore = $('.amenities li:visible', view.$el).size() === numMin;
		
		if(showMore) {
			$('.amenities .toggle .more', view.$el).hide();
			$('.amenities .toggle .less', view.$el).show();
		} else {
			$('.amenities .toggle .more', view.$el).show();
			$('.amenities .toggle .less', view.$el).hide();
		}
		
		$('.amenities li', view.$el).each(function(i, amenity) {
			if(showMore) {
				$(amenity).show();
			} else if(i > numMin - 1) {
				$(amenity).hide();	
			}
		});
		
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
			this.hotels.on('no-results', this.render, this);
			
			// hide/clear filters when a hotel fetch starts
			var _this = this;
			this.hotels.on('fetch-start', function() {
				_this.$el.html("");
			});
			
			this.views = {
				"search-numresults": new SearchNumResultsView({
					hotels: this.hotels
				})
			};
			
		},
		
		render: function() {
			
			// if there are no results, then clear out the container element and don't render
			if(this.hotels.length === 0) {
				this.$el.html("");
				return;
			}
			
			this.$el.html(this.template({
				amenities: this.hotels.getAmenitiesWithFrequency(),
				sortOrders: this.hotels.getSortOrders()
			}));
			
			initOpenCloseToggle(this);
			initSortBy(this);
			initFilterByAmenities(this);
			initFilterByAvailability(this);
			initFilterByName(this);
			initFilterByRate(this);
			initClearFilters(this);
			
			// render jquery-ui buttons
			$('button', this.$el).button();
			
			com.jeromedane.Utils.renderSubView(this, 'search-numresults');
		}
	};
	
	return Backbone.View.extend(view);
	
});