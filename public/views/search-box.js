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
	
	function initLocationSearch(view) {
		
		var keyUpDelay = 500;
		
		// when the user finishes entering a keystroke in the location search
		$('input[name="location"]', view.$el).keyup(function() {
			var searchStr = this.value;
			if(searchStr.length > 3) {
				com.jeromedane.Utils.delay(function(){
					console.log(searchStr);
					// apply search filter and get locations matching that filter
					view.locations.setFilter(searchStr);
					view.locations.fetch();
				}, keyUpDelay);
			}
		});
	}
	
	function initSubmit(view) {
		$('form', view.$el).submit(function() {
			console.log($(this).serialize());
			return false;
		});
	}
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			this.locations = new LocationsCollection();
			
			this.locations.on('update', function(locations) {
				console.log(locations);
			});
			
		},
		
		render: function() {
			
			this.$el.html(this.template());
			
			initDatePickers(this);
			initLocationSearch(this);
			initSubmit(this);
			
		}
	};
	
	return Backbone.View.extend(view);
	
});