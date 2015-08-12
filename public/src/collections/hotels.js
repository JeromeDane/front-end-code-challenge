var Backbone = require('backbone');
var _ = require('underscore');
var HotelModel = require('../models/hotel');

var baseUrl = 'api/hotels';
var sortOrderDefault = "guest_rating";

var collection = {

	model: HotelModel,

	url: baseUrl,

	/**
	 * Clear any currently applied custom filters
	 * 
	 * @returns {undefined}
	 */
	clearFilters: function() {
		this._filters = {};
		this.trigger('filter');
	},

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
	 * Apply a custom filter to the hotels
	 * 
	 * @param {string} field The type
	 * @param {mixed} value The value or values to be used in the custom sorting
	 * @returns {undefined}
	 */
	filterBy: function(field, value) {
		this._filters[field] = value;
		this.trigger('filter');
	},

	/**
	 * Get array of unique ammenities featured in the hotels in this collection
	 * 
	 * @returns {array}
	 */
	getAmenities: function() {
		var uniqueAmenities = {};
		_.each(this.pluck('amenities'), function(amenities) {
			_.each(amenities, function(amenity) {
				uniqueAmenities[amenity.code] = amenity;
			});
		});
		return _.toArray(uniqueAmenities);
	},

	/**
	 * Get array of unique amenities including the number of
	 * hotels that have each one
	 * 
	 * @returns {array}
	 */
	getAmenitiesWithFrequency: function() {

		// make it easy to look up amenities
		var amenities = _.indexBy(this.getAmenities(), 'code');

		// reset hotel count for each amenity
		_.each(amenities, function(amenity) {
			amenity.count = 0;
		});

		// count the number of hotels that are using each amenity
		_.each(this.pluck('amenities'), function(amenityList) {
			_.each(amenityList, function(amenity) {
				amenities[amenity.code].count++;
			});
		});

		// sort the amenities by the number of hotels that have them (descending)
		amenities = _.sortBy(_.toArray(amenities), function(amenity) {
			return -1 * amenity.count;
		});

		return amenities;
	},

	/**
	 * Get the hotels in the collection that match any custom
	 * filters applied using the custom filterBy() method
	 * 
	 * @returns {undefined}
	 */
	getFiltered: function() {
		var filters = this._filters;
		return this.filter(function(hotel) {
			var hotelMatches = true;
			// check each custom filter to see if hotel matches
			_.each(filters, function(value, field) {
				// TODO: Break this into separate functions for readibility
				switch(field) {
					case 'amenities':
						_.each(value, function(code) {
							if(!hotel.hasAmenity(code)) {
								hotelMatches = false;
							}
						});
						break;
					case 'availability':
						if(value && !hotel.get('available')) {
							hotelMatches = false;
						}
						break;
					case 'name':
						// if name filter not empty, make sure the hotel's name contains search string
						if(value.replace(/\s/g, "") !== "" && 
							hotel.get('name').toLowerCase().indexOf(value.toLowerCase()) === -1
						) {
							hotelMatches = false;
						}
						break;
					case 'guest_rating': 
					case 'stars':
						if(hotel.get(field) < value) {
							hotelMatches = false;
						}
						break;
					case 'rate':
						if(hotel.get('nightly_rate') < value[0] || hotel.get('nightly_rate') > value[1]) {
							hotelMatches = false;
						}
						break;
				}
			});
			return hotelMatches;
		});
	},

	/**
	 * Get the maximum distance used in the last search
	 * 
	 * @returns {float} The maximum distance used in the last search
	 */
	getMaxDistance: function() {
		var matches = this.url.match(/dist=((\d|\.)+)/);
		if(matches) {
			return parseFloat(matches[1]);
		}
	},

	/**
	 * Get the latitude used in the last search
	 * 
	 * @returns {float} The latitude used in the last search
	 */
	getLatitude: function() {
		var matches = this.url.match(/lat=((-|\d|\.)+)/);
		if(matches) {
			return parseFloat(matches[1]);
		}
	},

	/**
	 * Get name of the location used to perform search
	 * 
	 * @returns {string} Name of the location used to perform search
	 */
	getLocationName: function() {
		return this._locationName || l("unknown location");
	},

	/**
	 * Get the longitudeused in the last search
	 * 
	 * @returns {float} The longitude used in the last search
	 */
	getLongitude: function() {
		var matches = this.url.match(/lng=((-|\d|\.)+)/);
		if(matches) {
			return parseFloat(matches[1]);
		}
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
	 * Determine whether or not a search was run resulting in no results
	 * 
	 * @returns {boolean} Whether or not a search was run resulting in no results
	 */
	hasNoResults: function() {
		return (this.getMaxDistance() && this.length === 0);
	},

	initialize: function() {

		// create a container for custom filters
		this._filters = {};

	},

	/**
	 * Override standard backbone collection reset call to
	 * clear out existing search parameters.
	 * 
	 * @returns {undefined}
	 */
	reset: function() {
		this.clearFilters();
		this.clearParams();
		this.constructor.__super__.reset.apply(this, arguments);
	},

	/**
	 * Set the location name for retrieval later
	 * 
	 * @param {sting} locationName
	 * @returns {undefined}
	 */
	setLocationName: function(locationName) {
		this._locationName = locationName;
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

module.exports = Backbone.Collection.extend(collection);