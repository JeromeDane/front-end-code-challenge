<!-- TODO: Localization -->
<div class="search-filters-wrapper">
	<div class="view view-search-numresults"></div>
	<div class="sort">
		Sort by
		<select name="sort-by">
			<% _.each(sortOrders, function(order) { %>
				<option value="<%= order %>"><%= l('SORT_BY_' + order) %></option>
			<% }) %>
		</select>
	</div>
	<div class="filters">
		<h4>Filter Search Results</h4>
		<div class="clear-filters" title="Clear filters"></div>
		<div class="filter">
			<label>Name</label>
			<input name="name"/>
		</div>
		<div class="buttons">
			<button class="close">Hide Filters</button>
		</div>
	</div>
	<button class="show-filters">Filter Search Results</button>
</div>