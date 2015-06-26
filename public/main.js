/**
 * Configure require.js and load main UI
 */

require.config({
	urlArgs: IGNORE_CACHE ? "nocache=" +  (new Date()).getTime() : '',
	paths: {
		'backbone': 'lib/backbone/backbone-min',
		'css': 'lib/require/css',
		'jquery': 'lib/jquery/jquery-min',
		'jquery-ui': 'lib/jquery-ui/jquery-ui.min',
		'text': 'lib/require/text',
		'ui': 'views/ui',
		'underscore': 'lib/underscore/underscore-min'
	},
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
		'ui': {
			deps: ['backbone', 'jquery-ui']
		},
		'underscore': {
			exports: '_'
		}
    }
});

require(["ui"]);