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
				this.set('thumbnail', this.photos.at(0).get('thumbnail'));
			}
			
		},
		
		hasAmenity: function(code) {
			return _.findWhere(this.get('amenities'), { code: code });
		} 
		
	};
	
	return Backbone.Model.extend(model);
	
});