<!-- TODO: Localization -->
<% if(numHotels === numHotelsFiltered) { %>
	Found 
<% } else { %>
	Showing <%= l(numHotelsFiltered) %> of 
<% } %>
<%= l(numHotels) %> hotels matching your search