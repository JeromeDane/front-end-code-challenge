<!-- TODO: Localization -->
<span class="num-results">
	<% if(numHotels !== numHotelsFiltered) { %>
		Showing <%= l(numHotelsFiltered) %> of 
	<% } %>
	<%= l(numHotels) %> hotels 
	<% if(numHotels === numHotelsFiltered) { %>
		match your search
	<% } %>
</span>