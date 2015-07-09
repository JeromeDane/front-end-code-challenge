define([
	'collections/photos'
], function(
	PhotosCollection
) {
	
	var model = {
		
		initialize: function() {
			
			// translate photos to collection from JSON data
			this.photos = new PhotosCollection(this.get('photos'));
			this.unset('photos');
			
			// set thumbnail image if hotel has photos
			if(this.photos.length) {
				this.set('thumbnail', this.photos.at(0));
			}
			
		},
		
		hasAmenity: function(code) {
			return _.findWhere(this.get('amenities'), { code: code });
		},
		
		/**
		 * Override standard Backbone toJSON method to
		 * JSONiff thumbnail as well
		 * 
		 * @returns {object} Object with model properties
		 */
		toJSON: function() {
			var attributes = this.constructor.__super__.toJSON.apply(this, arguments);
			attributes.thumbnail = this.get('thumbnail') ? this.get('thumbnail').get('thumbnail') : null;
			return attributes;
		}
		
	};
	
	return Backbone.Model.extend(model);
	
});