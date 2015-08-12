var Backbone = require('backbone');
var PhotoModel = require('../models/photo');
		
var collection = {

	model: PhotoModel

};

module.exports = Backbone.Collection.extend(collection);