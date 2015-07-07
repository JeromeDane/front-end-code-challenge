<!-- TODO: Localization -->
<div class="search-filters-wrapper">
	<div class="num-results">Found <%= l(hotels.length) %> hotels matching your search</div>
	<div class="sort">
		Sort by
		<select name="sort-by">
			<% _.each(hotels.getSortOrders(), function(order) { %>
				<option value="<%= order %>"><%= l('SORT_BY_' + order) %></option>
			<% }) %>
		</select>
	</div>
	<button class="show-filters">Show Filters</button>
	<div class="filters">
		<h4>Filters</h4>
		<p>Filters go here ...</p>
		<div class="buttons">
			<button class="close">Hide Filters</button>
		</div>
	</div>
</div>