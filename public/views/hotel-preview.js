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
			
			// render hotel star value
			// TODO: replace path to star images for this instance to a copy that has a small drop shadow to help with visibility when positioned over hotel thumbnail images
			$('.star-value', this.$el).raty({
				hints: [l('1_STAR_HOTEL'), l('2_STAR_HOTEL'), l('3_STAR_HOTEL'), l('4_STAR_HOTEL'), l('5_STAR_HOTEL')],
				path: 'lib/raty/images',
				readOnly: true,
				score: this.model.get('stars')
			});
			
		}
	};
	
	return Backbone.View.extend(view);
	
});