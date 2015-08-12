require('l10n.js');

module.exports = (new function() {

	/**
	 * Replace the variables in a string
	 * 
	 * @param {type} str The string to be used as the source
	 * @param {type} depth The depth or number of replacements made
	 * @returns String
	 */
	function replaceVars(str, depth) {

		var replaceHappened = false;

		str = str.replace(/\{\{(.+?)\}\}/g, function(match, contents, offset, s) {
			var localized = contents.toLocaleString();
			replaceHappened = (localized != contents); 
			return localized;
		});

		return replaceHappened ? replaceVars(str) : str;
	}

	return {

		/**
		 * Define localization data string information
		 * 
		 * @param {type} localizationData Data object in the form {[langKey]: { [strKey]: [strVa] }}
		 * @returns {undefined}
		 */
		define: function(localizationData) {

			String.toLocaleString(localizationData);	

		},

		/**
		 * Get the current locale
		 * 
		 * @returns String
		 */
		getLocale: function() {
			return String.locale;
		},

		/**
		 * Localize a given string including {{varName}} style variable 
		 * replacement, allowing for nested localization replacements
		 * 
		 * @param {type} input The input value/string to be localized
		 * @returns String
		 */
		l: function(input) {

			String.defaultLocale = 'en';

			str = input.toLocaleString();

			return replaceVars(str);
		},

		/**
		 * Set the current locale
		 * 
		 * @param {type} locale The locale to use when appllying localization
		 * @returns {undefined}
		 */
		setLocale: function(locale) {

			String.locale = locale;

		}

	};
}());