define([
	'text!templates/ui.tpl'
], function(templateHtml) {
	
	var view = {
		
		template: _.template(templateHtml),
		
		render: function() {
			
			this.$el.html(this.template());
			
			$('#helloWorldDialog').dialog({
				title: "Hello World!"
			});
			
		}
	};
	
	return Backbone.View.extend(view);
	
});