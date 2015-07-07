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
	<div class="filters">
		<h4>Filter Search Results</h4>
		<div class="clear-filters" title="Clear filters"></div>
		<p>Filters go here ...</p>
		<div class="buttons">
			<button class="close">Hide Filters</button>
		</div>
	</div>
	<button class="show-filters">Filter Search Results</button>
</div>