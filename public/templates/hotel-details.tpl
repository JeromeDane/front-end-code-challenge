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
	<div class="rate-block<% if(best_rate_guarantee) { %> bestrate<% } %>">
		<% if(available) { %>
			<div class="group">
				<div class="rate">
					<div class="price">$<%= l(nightly_rate.toFixed(2)) %></div>
					<div class="qualifier"><%= l("per night") %><br/>+ <%= l("taxes & fees") %></div>
				</div>
				<% if(best_rate_guarantee) { %>
					<div class="rate-guarantee">
						<%= best_rate_guarantee.heading %>
					</div>
				<% } %>
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
	<div id="hotel-details-tabs">
		<ul>
			<li><a href="#tabs-overview"><%= l("Overview") %></a></li>
			<li><a href="#tabs-photos"><%= l("Photos") %> (<%= photos.length %>)</a></li>
			<li><a href="#tabs-map"><%= l("Map") %></a></li>
			<li><a href="#tabs-reviews"><%= l("Reviews") %> (<%= guest_reviews.length %>)</a></li>
		</ul>
		<div id="tabs-overview">
			<div class="thumbnail-strip">
				<ul class="photos">
					<% _.each(photos, function(photo) { %>
						<li>
							<a href="<%= photo.url %>" title="<%= photo.caption %>">
								<img src="<%= photo.thumbnail %>"/>
							</a>
						</li>
					<% }) %>
				</ul>
			</div>
			<div class="description closed">
				<div class="text"><%= description %></div>
				<a class="toggle">
					<span class="more"><%= l("show all") %></span>
					<span class="less"><%= l("show less") %></span>
					...
				</a>
			</div>
			<div class="amenities">
				<h4><%= l("Amenities") %></h4>
				<ul>
					<% _.each(amenities, function(amenity) { %>
						<li>
							<%= l(amenity.name) %>
						</li>
					<% }) %>
				</ul>
			</div>
			<div class="map-wrapper">
				<div class="map-container"></div>
			</div>
		</div>
		<div id="tabs-photos">
			<div class="photos">
				<% _.each(photos, function(photo) { %>
					<a href="<%= photo.url %>" title="<%= photo.caption %>">
						<img src="<%= photo.thumbnail %>"/>
					</a>
				<% }) %>
			</div>
		</div>
		<div id="tabs-map">
			<div class="map-container"></div>
			<!-- TODO: implement embedded get directions -->
		</div>
		<div id="tabs-reviews">
			<div class="frequencies">
				<h4><%= l("Guest Ratings") %></h4>
				<% _.each(ratingFrequencies.reverse(), function(frequency, i) { %>
					<div class="level">
						<label><%= l("RATING_" + ((4 - i) + 1)) %></label>
						<div class="count"><%= frequency.count %></div>
						<div class="bar">
							<div class="value" style="width: <%= frequency.percent %>%">&nbsp;</div>
						</div>
					</div>
				<% }) %>
			</div>
			<div class="reviews">
				<h4><%= l("What guests have to say") %></h4>
				<ul>
					<% _.each(guest_reviews, function(review) { %>
						<li class="review">
							<div class="rating"><div class="score" data-rating="<%= review.rating %>"></div></div>
							<div class="title"><%= review.title %></div>
							<div class="summary"><%= review.summary %></div>
						</li>
					<% }) %>
				</ul>
			</div>
		</div>
	</div>
</div>