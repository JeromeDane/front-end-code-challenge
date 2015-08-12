var Backbone = require('backbone');
var _ = require('underscore');
var PhotosCollection = require('../collections/photos');

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

	/**
	 * Get an array of objects with count and percentage
	 * of ratings at each of the 5 levels
	 * 
	 * @returns {array}
	 */
	getRatingFrequencies: function() {
		var levels = [0, 0, 0, 0, 0];
		var total = 0;
		_.each(this.get('guest_reviews'), function(review) {
			var rating = Math.ceil(review.rating);
			levels[rating - 1]++;
			total++;
		});

		var frequencies = [];
		for(var i = 0; i < levels.length; i++) {
			frequencies[i] = {
				count: levels[i],
				percent: total > 0 ? levels[i] / total * 100 : 0
			};
		}
		return frequencies;
	},

	hasAmenity: function(code) {
		return _.findWhere(this.get('amenities'), { code: code });
	},

	/**
	 * Override standard Backbone toJSON method to
	 * JSONify photos as well
	 * 
	 * @returns {object} Object with model properties
	 */
	toJSON: function() {
		var attributes = this.constructor.__super__.toJSON.apply(this, arguments);
		attributes.photos = this.photos.toJSON();
		return attributes;
	}

};

module.exports = Backbone.Model.extend(model);