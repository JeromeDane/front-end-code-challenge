<div class="hotel-details">
	<h1><%= name %></h1>
	<div class="address">
		<%= address.line1 %>, <%= address.city %>, 
		<%= address.state %> <%= address.postal_code %>, <%= address.country_name %>
	</div>
	<% if(typeof(thumbnail) != 'undefined') { %>
		<img src="<%= thumbnail %>" class="thumbnail" alt="Hotel Thumbnail"/>
	<% } %>
	<% if(typeof(logo) != 'undefined') { %>
		<img src="<%= logo %>" class="logo"/>
	<% } %>
	<div class="name" title="<%= short_description %>"><%= name %></div>
	<div class="stars"><div class="star-value"></div></div>
	<div class="distance">Distance: <%= distance.toFixed(1) %> miles</div>
	<div class="rating"><%= l("Guest Rating") %>: <span class="score"></span></div>
	<% if(available) { %>
		<div class="rate">
			<div class="price">$<%= l(nightly_rate.toFixed(2)) %></div>
			<div class="qualifier"><%= l("per night") %><br/>+ <%= l("taxes & fees") %></div>
		</div>
	<% } else { %>
		<div class="unavailable"><%= l("No rooms available") %></div>
	<% } %>
</div>