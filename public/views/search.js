define([
	'text!templates/search.tpl'
], function(templateHtml) {
	
	var view = {
		
		template: _.template(templateHtml),
		
		render: function() {
			
			this.$el.html(this.template());
			
		}
	};
	
	return Backbone.View.extend(view);
	
});