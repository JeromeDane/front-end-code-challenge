({
    baseUrl: "./",
	appDir: './',
	removeCombined: true,
	optimizeCss: 'standard',
	optimize: 'uglify2',
    dir:'./dist',
	wrapShim: true,
	fileExclusionRegExp: /^(\..+|docs|(r|build)\.(js|bat)|yuidoc\.json|.+\.(zip|bat|map)|nbproject)$/,
	modules: [
        {
            name: 'main'
        }
    ],
	paths: {
		'backbone': 'lib/backbone/backbone.min',
		'css': 'lib/require/css',
		'css-builder': 'lib/require/css-builder',
		'jerome-utils': 'lib/jeromedane/utils',
		'jquery': 'lib/jquery/jquery.min',
		'jquery-ui': 'lib/jquery-ui/jquery-ui.min',
		'json': 'lib/require/json',
		'l10n': 'lib/l10n',
		'localization': 'lib/jeromedane/localization',
		'masonry': 'lib/masonry/masonry.min',
		'normalize': 'lib/require/css-normalize',
		'raty': 'lib/raty/jquery.raty',
		'sly': 'lib/sly/sly.min',
		'swipebox': 'lib/swipebox/js/jquery.swipebox.min',
		'text': 'lib/require/text',
		'tooltipster': 'lib/tooltipster/jquery.tooltipster.min',
		'touchpunch': 'lib/touchpunch/touchpunch.min',
		'ui': 'views/ui',
		'underscore': 'lib/underscore/underscore.min'
	},
    shim: {
		'backbone': {
			exports: 'Backbone',
			deps: ['underscore', 'jquery']
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
		'sly': {
			expords: 'Sly',
			deps: [
				'jquery'
			]
		},
		'swipebox': {
			deps: [
				'jquery',
				'css!lib/swipebox/css/swipebox.min'
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
				'sly',
				'swipebox',
				'tooltipster',
				'touchpunch'
			]
		},
		'underscore': {
			exports: '_'
		}
	}
})