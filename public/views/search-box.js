define([
	'text!templates/search-box.tpl'
], function(templateHtml) {
	
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
	
	var view = {
		
		template: _.template(templateHtml),
		
		render: function() {
			
			this.$el.html(this.template());
			
			initDatePickers(this);
		}
	};
	
	return Backbone.View.extend(view);
	
});