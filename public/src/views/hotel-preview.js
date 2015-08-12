var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
var l = require('../localization').l;

// TODO: Get browserify-shim working to inject jQuery into raty so jQuery doesn't need to be exposed globally
global.jQuery = require("jquery");	
require('raty');

// initialize clicking on the hotel preview
function initClick(view) {
	view.$el.click(function() {
		view.trigger('click', view);
	});
}

// render star value and guest ratings as stars
function renderStars(view) {
	var starConfig = {
		half: true,
		path: 'images/raty',
		readOnly: true
	};

	// render hotel star value
	// TODO: replace path to star images for this instance to a copy that has a small drop shadow to help with visibility when positioned over hotel thumbnail images
	starConfig.score = view.model.get('stars');
	starConfig.hints = [l('1_STAR_HOTEL'), l('2_STAR_HOTEL'), l('3_STAR_HOTEL'), l('4_STAR_HOTEL'), l('5_STAR_HOTEL')];
	$('.star-value', view.$el).raty(starConfig);

	// render guest rating star value
	starConfig.score = view.model.get('guest_rating');
	starConfig.hints = [l('RATING_1'), l('RATING_2'), l('RATING_3'), l('RATING_4'), l('RATING_5')];
	$('.rating .score', view.$el).raty(starConfig);
}

var view = {

	template: _.template(require('../templates/hotel-preview.tpl')),

	initialize: function(options) {

		// append the view to an element if supplied
		if(options && options.appendTo) {
			var wrapperId = 'hotel-preview-' + this.model.get('id');
			$(options.appendTo).append('<div class="view hotel-preview" id="' + wrapperId + '"></div>');
			this.setElement('#' + wrapperId);
		}

	},

	render: function() {

		var properties = this.model.toJSON();
		properties.l = l;
		
		this.$el.html(this.template(properties));

		renderStars(this);
		initClick(this);

	}
};

module.exports = Backbone.View.extend(view);
