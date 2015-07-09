/**
 * Configure require.js and load main UI
 */

// set up require.js configuration
require.config({
	// cache busting
	urlArgs: IGNORE_CACHE ? 'nocache=' +  (new Date()).getTime() : ''
});

// load and render the main UI to the body element of the HTML page
// TODO: Figure out why require.js optimizer doesn't understand the ui deps defined in config.js shim
require([
	'backbone',
	'css!styles/ui',
	'jquery-ui',
	'localization',
	'jerome-utils',
	'raty',
	'sly',
	'swipebox',
	'tooltipster',
	'touchpunch',
	'ui'
], function(
	Backbone, 
	css, 
	jQuery, 
	Localization, 
	Utils, 
	Raty, 
	Sly,
	Swipebox, 
	Tooltipster, 
	Touchpunch, 
	UiView
) {

	var ui = new UiView({
		el: 'body'
	});

	ui.render();

});