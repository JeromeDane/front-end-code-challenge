define([
	'models/location'
], function(
		LocationModel
) {
	
	var collection = {
		
		model: LocationModel,
		
		url: 'api/locations/'
		
		
	};
	
	return Backbone.Collection.extend(collection);
	
});

