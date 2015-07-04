/**
 * Configure require.js and load main UI
 */

/**
* Force require.js to ignore cache during development. Should be removed for 
* deployment to production environments.
* 
* @type Boolean
*/
var IGNORE_CACHE = true;

// set up require.js configuration
require.config({
	
	// cache busting
	urlArgs: IGNORE_CACHE ? 'nocache=' +  (new Date()).getTime() : '',
	
	// paths to libraries
	paths: {
		'backbone': 'lib/backbone/backbone.min',
		'css': 'lib/require/css',
		'jquery': 'lib/jquery/jquery.min',
		'jquery-ui': 'lib/jquery-ui/jquery-ui.min',
		'json': 'lib/require/json',
		'l10n': 'lib/l10n',
		'localization': 'lib/jeromedane/localization',
		'masonry': 'lib/masonry/masonry.min',
		'jerome-utils': 'lib/jeromedane/utils',
		'text': 'lib/require/text',
		'ui': 'views/ui',
		'underscore': 'lib/underscore/underscore.min'
	},
	
	// dependencies
    shim: {
		'backbone': {
			exports: 'Backbone',
			deps: ['underscore']
		},
    	'jquery': {
    		exports: 'jQuery'
    	},
		'jquery-ui': {
			deps: ['jquery']
    	},
		'localization': {
			deps: ['l10n']
		},
		'ui': {
			deps: [
				'backbone',
				'css!styles/ui',
				'jquery-ui',
				'localization',
				'jerome-utils'
			]
		},
		'underscore': {
			exports: '_'
		}
    }
});

// load and render the main UI to the body element of the HTML page
require(["ui"], function(UiView) {
	
	var ui = new UiView({
		el: 'body'
	});
	
	ui.render();
	
});