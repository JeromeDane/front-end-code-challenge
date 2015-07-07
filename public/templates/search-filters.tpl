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
	<label class="show">Click to filter search results</label>
	<div class="filters">
		filters here ...
		<div class="buttons">
			<button class="clear">Clear Filters</button>
			<button class="close">Hide Filters</button>
		</div>
	</div>
</div>