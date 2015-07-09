define([], function() {
	
	var model = {
		
		initialize: function() {
			
			// translate JSON dimensions properties into height and width attributes
			var d = this.get('dimensions');
			this.set('width', d[0]);
			this.set('height', d[1]);
			this.set('ratio', this.get('width') / this.get('height'));
			this.unset('dimensions');
			
		},
		
		/**
		 * Get the height of the image based on any given width
		 * 
		 * @returns {int} The converted height of the image based on the supplied width
		 */
		getHeightFromWidth: function(width) {
			return Math.round(width / this.get('ratio'));
		}
	};
	
	return Backbone.Model.extend(model);
	
});