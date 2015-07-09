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
	mainConfigFile: 'config.js'
})