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
	<div class="filter availability">
		<label>
			<input name="availability" type="checkbox"/>
			Only show available
		</label>
	</div>
	<div class="filters">
		<h4>Filter Search Results</h4>
		<div class="clear-filters" title="Clear filters"></div>
		<div class="filter name">
			<label>Hotel Name Contains</span></label>
			<input name="name"/>
		</div>
		<div class="filter rate">
			<label>Nightly Rate: <span class="values"></label>
			<div class="slider"></div>
		</div>
		<div class="buttons">
			<button class="close">Hide Filters</button>
		</div>
	</div>
	<button class="show-filters">Filter Search Results</button>
</div>