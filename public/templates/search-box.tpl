<form class="search-box">
	<div class="padding">
		<input type="hidden" name="lat"/>
		<input type="hidden" name="lng"/>
		<div class="search-field location">
			<div class="search-field-wrapper">
				<input type"text" value="<%= l("LOCATION_SEARCH_PROMPT") %>"/>
			</div>
		</div>
		<div class="search-field dist">
			<label><%= l("WITHIN_X_MILES") %></label>
			<div class="distSlider"></div>
			<input type="hidden" name="dist"/>
		</div>
		<div class="search-field checkin">
			<label><%= l("Check-In") %>:</label>
			<input type"text" name="checkin"/>
		</div>
		<div class="search-field checkout">
			<label><%= l("Check-Out") %>:</label>
			<input type"text" name="checkout"/>
		</div>
		<input type="submit" value="Search"/>
	</div>
</form>