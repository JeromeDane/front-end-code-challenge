<p><%= l("Language") %>: 
	<select class="locale-switcher-select">
		<% _.each(locales, function(locale) { %>
			<option value="<%= locale %>" <%= currentLocale == locale ? 'selected="selected"' : '' %>><%= l("LOCALE_" + locale) %></option>
		<% }); %>
	</select>
</p>