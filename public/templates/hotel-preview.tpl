<div class="hotel-preview">
	<% if(typeof(logo) != 'undefined') { %>
		<img src="<%= logo %>" class="logo"/>
	<% } %>
	<% if(typeof(thumbnail) != 'undefined') { %>
		<img src="<%= thumbnail %>" class="image"/>
	<% } %>
	<div class="name"><%= name %></div>
	<div class="description"><%= short_description %></div>
	<div class="stars">Stars: <%= stars %>/5</div>
	<div class="rating">Guest Rating: <%= guest_rating %>/5</div>
	<div class="distance">Distance: <%= distance.toFixed(1) %> miles</div>
	<% if(available) { %>
		<div class="rate">$<%= l(nightly_rate.toFixed(2)) %> per night</div>
	<% } else { %>
		<div class="unavailable">No rooms available</div>
	<% } %>
</div>