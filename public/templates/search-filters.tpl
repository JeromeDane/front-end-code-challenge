<div class="search-filters-wrapper">
	<div class="view view-search-numresults"></div>
	<div class="sort">
		<%= l("Sort by") %>
		<select name="sort-by">
			<% _.each(sortOrders, function(order) { %>
				<option value="<%= order %>"><%= l('SORT_BY_' + order) %></option>
			<% }) %>
		</select>
	</div>
	<div class="filter availability">
		<label>
			<input name="availability" type="checkbox"/>
			<%= l("Only show available") %>
		</label>
	</div>
	<div class="map-container"></div>
	<div class="filters">
		<h4><%= l("Filter Search Results") %></h4>
		<div class="clear-filters" title="Clear filters"></div>
		<div class="filter name">
			<label><%= l("Hotel Name Contains") %></span></label>
			<input name="name"/>
		</div>
		<div class="filter rate">
			<label><%= l("Nightly Rate") %>: <span class="values"></label>
			<div class="slider"></div>
		</div>
		<div class="filter amenities">
			<label><%= l("Amenities") %></label>
			<ul>
				<% _.each(amenities, function(amenity) { %>
					<li>
						<label>
							<input type="checkbox" name="<%= amenity.code %>"/> <%= l(amenity.name) %>
							<span class="count">(<%= amenity.count %>)</span>
						</label>
					</li>
				<% }) %>
			</ul>
			<a class="toggle">
				<span class="more"><%= l("show all") %></span>
				<span class="less"><%= l("show less") %></span>
				...
			</a>
		</div>
		<div class="buttons">
			<button class="close">Hide Filters</button>
		</div>
	</div>
	<button class="show-filters">Filter Search Results</button>
</div>