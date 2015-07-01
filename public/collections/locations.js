define([
	'models/location'
], function(
		LocationModel
) {
	
	var baseUrl = 'api/locations';
	
	var collection = {
		
		model: LocationModel,
		
		url: baseUrl,
		
		/**
		 * Clear any currently applied filters so that future
		 * fetch calls will return ALL locations
		 * 
		 * @returns {undefined}
		 */
		clearFilter: function() {
			this.url = baseUrl;
		},
		
		/**
		 * Apply a filter, causing any future fetch calls to return
		 * only the locations that match the given filter string
		 * 
		 * @param {string} filterStr
		 * @returns {undefined}
		 */
		setFilter: function(filterStr) {
			this.url = baseUrl + '/search/' + encodeURIComponent(filterStr);
		}
		
	};
	
	return Backbone.Collection.extend(collection);
	
});

