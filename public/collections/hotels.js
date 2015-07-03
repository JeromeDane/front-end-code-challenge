define([
	'models/hotel'
], function(
		HotelModel
) {
	
	var baseUrl = 'api/hotels';
	
	var collection = {
		
		model: HotelModel,
		
		url: baseUrl,
		
		/**
		 * Clear any currently applied parameters so that future
		 * fetch calls will return ALL hotels
		 * 
		 * @returns {undefined}
		 */
		clearParams: function() {
			this.url = baseUrl;
		},
		
		/**
		 * Override standard backbone collection fetch call to
		 * fire a "fetch-start" event so that views can display
		 * loading message.
		 * 
		 * @returns {undefined}
		 */
		fetch: function() {
			this.trigger('fetch-start');
			this.constructor.__super__.fetch.apply(this, arguments);
		},
		
		/**
		 * Apply parameters, causing any future fetch calls to return
		 * only the hotels that match the given parameter string
		 * 
		 * @param {string} paramStr Serialized parameters in the form of a GET request
		 * @returns {undefined}
		 */
		setParams: function(paramStr) {
			this.url = baseUrl + '?' + paramStr;
		}
		
	};
	
	return Backbone.Collection.extend(collection);
	
});

