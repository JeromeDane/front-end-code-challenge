define([
	'text!templates/search-box.tpl',
	'collections/locations'
], function(
	templateHtml,
	LocationsCollection
) {
	
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
	
	// initialize location search field
	function initLocationSearch(view) {
		
		var keyUpDelay = 500;	// millisecond delay to perform location search after key up
		
		view.$search = $('input.location', view.$el);
		
		// restore location text if previously set
		if(view.currLocationLabel) {
			view.$search.val(view.currLocationLabel);
		}
		
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
		
		// restore any current location to search field on blur
		view.$search.blur(function() {
			view.$search.val(view.currLocationLabel);
		});
		
		// TODO: cache location search results (maybe)
		
		// when the user finishes entering a keystroke in the location search
		view.$search.keyup(function(evt) {
			// make sure key pressed was a word character
			if((evt.which != 8 && evt.which != 846) && !String.fromCharCode(evt.which).match(/\w/)) {
				return;
			}
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
			view.hotels.fetch();
			return false;
		});
		
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
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function(options) {
			
			if(!options || !options.hotels) throw "Search box view must be initialized with a hotels collection";
			
			this.hotels = options.hotels;
			
			this.locations = new LocationsCollection();
			this.locations.on('update', parseLocationResults, this);
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
			initDatePickers(this);
			initLocationSearch(this);
			initMaxDist(this);
			initSubmit(this);
			
		}
	};
	
	return Backbone.View.extend(view);
	
});