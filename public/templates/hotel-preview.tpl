<!-- TODO: Localize text -->
<% if(typeof(thumbnail) != 'undefined') { %>
	<img src="<%= thumbnail %>" class="thumbnail" alt="Hotel Thumbnail"/>
<% } %>
<% if(typeof(logo) != 'undefined') { %>
	<img src="<%= logo %>" class="logo"/>
<% } %>
<div class="name" title="<%= short_description %>"><%= name %></div>
<div class="stars"><div class="star-value"></div></div>
<div class="distance">Distance: <%= distance.toFixed(1) %> miles</div>
<div class="rating">Rating: <span class="score"></span></div>
<% if(available) { %>
	<div class="rate">$<%= l(nightly_rate.toFixed(2)) %> per night</div>
<% } else { %>
	<div class="unavailable">No rooms available</div>
<% } %>