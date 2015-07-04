<div class="hotel-preview">
	<% if(typeof(logo) != 'undefined') { %>
		<img src="<%= logo %>" class="logo"/>
	<% } %>
	<div class="name"><%= name %></name>
	<div class="description"><%= short_description %></name>
	<div class="stars">Stars: <%= stars %>/5</div>
	<div class="rating">Guest Rating: <%= guest_rating %>/5</div>
	<div class="distance">Distance: <%= distance.toFixed(1) %> miles</div>
	<% if(available) { %>
		<div class="rate">$<%= l(nightly_rate.toFixed(2)) %></name>
	<% } else { %>
		<div class="unavailable">No rooms available</div>
	<% } %>
</div>