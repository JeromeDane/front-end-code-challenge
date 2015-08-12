var Backbone = require('backbone');
var _ = require('underscore');
var LocaleSwitcherView = require('./locale-switcher');
var $ = require('jquery');

var view = {

	template: _.template(require('../templates/header.tpl')),

	initialize: function() {

		var _this = this;

		this.views = {
			localeSwitcher: new LocaleSwitcherView()
		};

		// bubble locale change up to any parent views that will handle re-rendering
		this.views.localeSwitcher.on('change', function(locale) {
			_this.trigger('locale-change', locale);
		});

	},

	render: function() {

		this.$el.html(this.template({
			l: require('../localization').l
		}));

		this.views.localeSwitcher.setElement($('.view-locale-switcher', this.$el));
		this.views.localeSwitcher.render();


	}
};

module.exports = Backbone.View.extend(view);

