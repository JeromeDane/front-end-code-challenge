define([
	'text!templates/search-box.tpl',
	'collections/locations'
], function(
	templateHtml,
	LocationsCollection
) {
	
	// TODO: Way to let user click "current location"
	
	// TODO: Store field values and restore them on render
	
	function initDatePickers(view) {
		
		// get checkin/checkout fields
		$checkinField = $('input[name="checkin"]', view.$el);
		$checkoutField = $('input[name="checkout"]', view.$el);
		
		// initialize both fields the same way
		_.each([$checkinField, $checkoutField], function($field) {
			$field.datepicker({
				minDate: 0,
				numberOfMonths: 2,
				slideshowAnim: "slideDown",
				dateFormat: "yy-mm-dd"
			});
		});
		
		// checking field specific settings
		$checkinField.datepicker("option", "onClose", function(selectedDate) {
			$checkoutField.datepicker( "option", "minDate", selectedDate );
		});
		$checkinField.datepicker('setDate', 'now');
		
		// checkout field specific settings
		$checkoutField.datepicker("option", "onClose", function(selectedDate) {
			$checkinField.datepicker( "option", "maxDate", selectedDate );
		});
		$checkoutField.datepicker('setDate', "+1d");
		
	}
	
	// initialize location search field autocomplete
	function initLocationAutoComplete(view) {
		
		// TODO: ignore punctuation in matching and consider both abbreviated and full state names
		
		// create autocomplete instance on search field
		view.$search.autocomplete({
			minLength: 3,
			select: function(evt, ui) {
				var itm = ui.item;
				$('input[name="lat"]', view.$el).val(itm.lat);
				$('input[name="lng"]', view.$el).val(itm.lng);
				view.currLocationLabel = itm.label;
				view.$form.submit();
			},
			source: []
		});
	}
	
	// initialize keyup event handler on location field
	function initLocationKeyup(view) {
		
		var keyUpDelay = 500;	// millisecond delay to perform location search after key up
		
		// when the user finishes entering a keystroke in the location search
		view.$search.keyup(function(evt) {
			
			// TODO: Fix buggy application of results based on current location search (check timing)
			
			// make sure key pressed was a word character
			if((evt.which != 8 && evt.which != 846) && !String.fromCharCode(evt.which).match(/\w/)) {
				return;
			}
			
			// TODO: cache location search results (maybe)
			
			var searchStr = this.value;
			// if the search string is greater than 2 characters
			if(searchStr.length > 2) {
				// perform the actual search after the last keystroke was at least keyUpDelay ago
				view.$search.addClass('loading');
				com.jeromedane.Utils.delay(function(){
					// apply search filter and get locations matching that filter
					view.locations.setFilter(searchStr);
					view.locations.fetch();
				}, keyUpDelay);
			}
		});
	}
	
	// initialize location search field
	function initLocationSearchField(view) {
		
		view.$search = $('.location input', view.$el);
		
		// remember original text to be able to conditionally style input 
		view._origSearchPrompt = view.$search.val();
		
		// restore location text if previously set
		if(view.currLocationLabel) {
			view.$search.val(view.currLocationLabel);
		}
		
		// handle search field gain focus
		view.$search.focus(function() {
			// remove original search prompt on focus
			if(this.value === view._origSearchPrompt) {
				this.value = "";
				styleLocationSearchInput(view);
			}
		});
		
		// handle search field lose focus
		view.$search.blur(function() {
			
			// restore any current location to search field on blur
			view.$search.val(view.currLocationLabel);
			
			// restore original prompt if field is empty
			if(this.value.replace(/\s/g, '') === "") {
				this.value = view._origSearchPrompt;
			}
			styleLocationSearchInput(view);
			
		});
		
		initLocationAutoComplete(view);
		initLocationKeyup(view);
		
		styleLocationSearchInput(view);
		
	}
	
	// initialize maximum distance input
	function initMaxDist(view) {
		
		var $slider = $('.distSlider');
		var initialDist = 10;
		
		function updateSliderDisplay(val) {
			if(val < 5) return false;
			var $label = $('.search-field.dist label');
			$label.text($label.text().replace(/MAXDIST|\d+/, val));
			$('input[name="dist"]').val(val);
			return true;
		}
		
		$slider.slider({
			range: 'min',
			min: 0,
			max: 50,
			step: 5,
			value: initialDist, 
			slide: function(evt, ui) {
				return updateSliderDisplay(ui.value);
			}
		});
		
		updateSliderDisplay(initialDist);
	}
	
	function initSubmit(view) {
		view.$form = $('form', view.$el);
		view.$form.submit(function() {
			view.hotels.setParams($(this).serialize());
			view.hotels.fetch({
				complete: function() {
					view.hotels.trigger('update');
				},
				error: function(e) {
					console.log('error', e);
					// TODO: error handling and UI message
				}
			});
			return false;
		});
		
		$('input[type="submit"]', view.$form).button();
		
		// TODO: show location not found message as appropriate
	}
	
	// map locations collection to autocomplete data and refresh options
	function parseLocationResults() {
		this.$search.autocomplete('option', 'source', this.locations.map(function(loc) {
			return {
				label: loc.get('city') + ', ' + l(loc.get('state')) + ' ' + loc.get('postal'),
				city: loc.get('city'),
				state: loc.get('state'),
				zip: loc.get('postal'),
				lat: loc.get('latitude'),
				lng: loc.get('longitude')
			};
		}));
		this.$search.removeClass('loading');	
		this.$search.keydown();					// force open autocomplete options
	}
	
	// style location search input based on whether original text is present or not
	function styleLocationSearchInput(view) {
		if(view.$search.val() === view._origSearchPrompt) {
			view.$search.addClass("prompt");
		} else {
			view.$search.removeClass("prompt");
		}
	}
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function(options) {
			
			if(!options || !options.hotels) throw "Search box view must be initialized with a hotels collection";
			
			this.hotels = options.hotels;
			
			this.locations = new LocationsCollection();
			this.locations.on('update', parseLocationResults, this);
			
			// preload cville hotels for easy preview during development 
			this.hotels.setParams('lat=38.035466&lng=-78.46289&dist=10&checkin=2015-07-03&checkout=2015-07-04');
			this.hotels.fetch();
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
			initDatePickers(this);
			initLocationSearchField(this);
			initMaxDist(this);
			initSubmit(this);
			
		}
	};
	
	return Backbone.View.extend(view);
	
});