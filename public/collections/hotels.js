define([
	'models/hotel'
], function(
		HotelModel
) {
	
	var baseUrl = 'api/hotels';
	var sortOrderDefault = "guest_rating";
	
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
		
		comparator: function(hotel) {
			switch(this._sortOrder) {
				case 'guest_rating':
					// sort guest rating descending
					return -1 * hotel.get('guest_rating');
				case 'rate':
					return hotel.get('nightly_rate');
				case 'rate-desc':
					// sort rate descending
					return -1 * hotel.get('nightly_rate');
				case 'stars-desc':
					// sort stars descenging
					return -1 * hotel.get('stars');
				default:
					// return specified property by default
					return hotel.get(this._sortOrder);
			};
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
		 * Get the collection's current sort order
		 * 
		 * @returns {string} Current sort order
		 */
		getSortOrder:function() {
			return this._sortOrder || sortOrderDefault;
		},
		
		/**
		 * Get an array of valid sort order string values
		 * 
		 * @returns {Array} valid sort order string values
		 */
		getSortOrders: function() {
			return ["distance", "guest_rating", "name", "rate", "rate-desc", "stars", "stars-desc"];
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
		},
		
		/**
		 * Override standard backbone collection sort call toallow 
		 * self-sorting by a given set of search keys.
		 * 
		 * @param {object} options Specify the sort order by setting the 'order' property of the options object to a string
		 * @returns {undefined}
		 * 
		 * @example myCollection.sort({ order: "distance" });
		 */
		sort: function() {
			
			// determine default sort order or use value given as a parameter option
			var order = sortOrderDefault;
			if(arguments[0] && arguments[0].order) {
				order = arguments[0].order;
			}
			
			// make sure a valid sort key is supplied
			if(_.indexOf(this.getSortOrders(), order) === -1) {
				throw "Invalid sort order '" + order + "' passed to HotelsCollection.sort()";
			}
			
			// set a flag so the collection's comparator knows how to sort
			this._sortOrder = order;

			// perform normal Backbone collection sort
			this.constructor.__super__.sort.apply(this, arguments);
		}
		
	};
	
	return Backbone.Collection.extend(collection);
	
});

