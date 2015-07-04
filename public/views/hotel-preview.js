define([
	'text!templates/hotel-preview.tpl'
], function(
	templateHtml
) {
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			
		},
		
		render: function() {
			
			this.$el.html(this.template(this.model.toJSON()));
			
		}
	};
	
	return Backbone.View.extend(view);
	
});