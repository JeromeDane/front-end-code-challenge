var Backbone = require('backbone')	;

var model = {

	initialize: function() {

		// translate JSON dimensions properties into height and width attributes
		var d = this.get('dimensions');
		this.set('width', d[0]);
		this.set('height', d[1]);
		this.unset('dimensions');

	}
};

module.exports = Backbone.Model.extend(model);