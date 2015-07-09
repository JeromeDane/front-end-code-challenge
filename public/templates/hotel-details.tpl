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
			<li><a href="#tabs-reviews"><%= l("Reviews") %></a></li>
		</ul>
		<div id="hotel-details-tabs">
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
				<p class="description"><%= description %></p>
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
				<p>Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>
				<p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>
			</div>
			<div id="tabs-reviews">
				<p>Masdasdauris eleifend estas et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.</p>
				<p>Duis cursus. Maecenas ligula eros, blandit nec, pharetra at, semper at, magna. Nullam ac lacus. Nulla facilisi. Praesent viverra justo vitae neque. Praesent blandit adipiscing velit. Suspendisse potenti. Donec mattis, pede vel pharetra blandit, magna ligula faucibus eros, id euismod lacus dolor eget odio. Nam scelerisque. Donec non libero sed nulla mattis commodo. Ut sagittis. Donec nisi lectus, feugiat porttitor, tempor ac, tempor vitae, pede. Aenean vehicula velit eu tellus interdum rutrum. Maecenas commodo. Pellentesque nec elit. Fusce in lacus. Vivamus a libero vitae lectus hendrerit hendrerit.</p>
			</div>
		</div>
	</div>
</div>