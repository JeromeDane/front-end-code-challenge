<div class="hotel-details">
	<div class="overview-block">
		<h1><%= name %></h1>
		<div class="address">
			<%= address.line1 %>, <%= address.city %>, 
			<%= address.state %> <%= address.postal_code %>, <%= address.country_name %>
		</div>
		<div>
			<% if(stars) { %>
				<div class="stars"><div class="star-value"></div> <%= l(stars + "_STAR_HOTEL") %></div>
			<% } %>
			<div class="rating">
				<span class="score"></span>
				<!-- TODO: localization -->
				(<%= guest_reviews.length %> guest reviews)
			</div>
		</div>
	</div>
	<div class="rate-block">
		<% if(available) { %>
			<div class="rate">
				<div class="price">$<%= l(nightly_rate.toFixed(2)) %></div>
				<div class="qualifier"><%= l("per night") %><br/>+ <%= l("taxes & fees") %></div>
			</div>
			<!-- TODO: localization -->
			<button onclick="javascript:alert('not implemented in this coding challenge')">
				Book Now
				<% if(typeof(logo) != 'undefined') { %>
					<img src="<%= logo %>" class="logo"/>
				<% } %>
			</button>
		<% } else { %>
			<div class="unavailable"><%= l("No rooms available") %></div>
		<% } %>
	</div>
	<div>
		<% if(typeof(thumbnail) != 'undefined') { %>
			<img src="<%= thumbnail %>" class="thumbnail" alt="Hotel Thumbnail"/>
		<% } %>
		<div class="name" title="<%= short_description %>"><%= name %></div>
		<div class="distance">Distance: <%= distance.toFixed(1) %> miles</div>
	</div>
</div>