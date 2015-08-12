define([
	'models/photo'
], function(
		PhotoModel
) {
	
	var collection = {
		
		model: PhotoModel
		
	};
	
	return Backbone.Collection.extend(collection);
	
});

