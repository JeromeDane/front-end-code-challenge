define([
	'text!templates/search-box.tpl'
], function(templateHtml) {
	
	function initDatePickers(view) {
		
		$checkinField = $('input[name="checkin"]', view.$el);
		$checkoutField = $('input[name="checkout"]', view.$el);
		
		_.each([$checkinField, $checkoutField], function($field) {
			$field.datepicker({
				minDate: 0,
				numberOfMonths: 2,
				slideshowAnim: "slideDown"
			});	
			$field.change(function() {
				$field.datepicker( "option", "dateFormat", "yy-mm-dd");
			});
		});
		
		$checkinField.datepicker("option", "onClose", function(selectedDate) {
			$checkoutField.datepicker( "option", "minDate", selectedDate );
		});
		$checkinField.datepicker('setDate', 'now');
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