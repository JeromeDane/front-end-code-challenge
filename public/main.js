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
		'raty': 'lib/raty/jquery.raty',
		'text': 'lib/require/text',
		'tooltipster': 'lib/tooltipster/jquery.tooltipster.min',
		'touchpunch': 'lib/touchpunch/touchpunch.min',
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
			deps: [
				'jquery',
				'css!lib/jquery-ui/jquery-ui.min'
			]
    	},
		'masonry': {
			deps: ['jquery']
		},
		'localization': {
			deps: ['l10n']
		},
		'raty': {
			deps: [
				'jquery',
				'css!lib/raty/jquery.raty'
			]
		},
		'tooltipster': {
			deps: [
				'jquery',
				'css!lib/tooltipster/css/tooltipster',
				'css!lib/tooltipster/css/themes/tooltipster-shadow'
			]
		},
		'touchpunch': {
			deps: ['jquery-ui']
		},
		'ui': {
			deps: [
				'backbone',
				'css!styles/ui',
				'jquery-ui',
				'localization',
				'jerome-utils',
				'raty',
				'tooltipster',
				'touchpunch'
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