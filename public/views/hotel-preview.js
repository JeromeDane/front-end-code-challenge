define([
	'text!templates/hotel-preview.tpl'
], function(
	templateHtml
) {
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function(options) {
			
			// append the view to an element if supplied
			if(options && options.appendTo) {
				var wrapperId = 'hotel-preview-' + this.model.get('id');
				$(options.appendTo).append('<div class="view hotel-preview" id="' + wrapperId + '"></div>');
				this.setElement('#' + wrapperId);
			}
			
		},
		
		render: function() {
			
			this.$el.html(this.template(this.model.toJSON()));
			
		}
	};
	
	return Backbone.View.extend(view);
	
});