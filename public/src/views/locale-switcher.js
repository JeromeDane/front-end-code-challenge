var Backbone = require('backbone');
var _ = require('underscore');
var Localization = require('../localization');
var $ = require('jquery');

var locales = ["en", "fr"];

/**
 * Initialize locale selector change handler
 * 
 * @param {type} view
 * @returns {undefined}
 */
function initSelectorHandler(view) {

	var $selector = $('.locale-switcher-select', view.$el);

	$selector.on('change', function() {

		var newLocale = $selector.val();
		Localization.setLocale(newLocale);
		view.trigger('change', newLocale);

	});

}

var view = {

	template: _.template(require('../templates/locale-switcher.tpl')),

	render: function() {

		this.$el.html(this.template({
			locales: locales,
			currentLocale: Localization.getLocale(),
			l: require('../localization').l
		}));

		initSelectorHandler(this);

	}
};

module.exports = Backbone.View.extend(view);
