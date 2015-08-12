var _ = require('underscore');
var Backbone = require('backbone');

var view = {

	template: _.template(require('../templates/search-numresults.tpl')),

	initialize: function(options) {

		if(!options || !options.hotels) throw "Search number of results view must be initialized with a hotels collection";

		this.hotels = options.hotels;
		this.hotels.on('update', this.render, this);
		this.hotels.on('filter', this.render, this);

	},

	render: function() {

		this.$el.html(this.template({
			numHotels: this.hotels.length,
			numHotelsFiltered: this.hotels.getFiltered().length
		}));

	}
};

module.exports = Backbone.View.extend(view);
