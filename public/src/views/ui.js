var Backbone = require('backbone');
var _ = require('underscore');
var HeaderView = require('./header');
var SearchView = require('./search');
var $ = require('jquery');
var renderSubView = require('../utils').renderSubView;
var Localization = require('../localization');

var localizationData = require('../localization.json');

Localization.define(localizationData);

var view = {

	template: _.template(require('../templates/ui.tpl')),

	resize: function() {

		var cardWidth = 230;
		var cardGutter = 13;

		// figure out how many hotel previews could fit on one row for the current window size
		var numCards = Math.floor($(window).width() / (cardWidth + cardGutter));

		if(numCards > 1) {
			// make the UI container wide enough to fit the most possible hotel previews for window size
			$('.ui-container', this.$el).width(numCards * 
					(cardWidth + cardGutter)
					- cardGutter);
		} else {
			$('.ui-container', this.$el).width($(window).width() - 40);
		}
	},

	initialize: function() {

		// set local reference to this for use in handlers
		var _this = this;

		// define subviews
		this.views =  {
			header: new HeaderView(),
			search: new SearchView()
		};

		// re-render the user interface on locale change
		this.views.header.on('locale-change', function(locale) {
			_this.render();
		});

		// resize the UI as needed
		$(window).resize(function() {
			_this.resize();
		});

	},               

	render: function() {
		this.$el.html(this.template({
			l: require('../localization').l
		}));

		renderSubView(this, 'header');
		renderSubView(this, 'search', 'body');

		this.resize();

	}
};

module.exports = Backbone.View.extend(view);