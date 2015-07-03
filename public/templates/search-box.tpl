<form class="search-box">
	<div class="search-field">
		<label><%= l("WHERE_STAY?") %></label>
		<div class="search-field-wrapper">
			<input type"text" class="location"/>
		</div>
		<input type="hidden" name="lat"/>
		<input type="hidden" name="lng"/>
	</div>
	<div class="search-field">
		<label><%= l("Check-In") %></label>
		<input type"text" name="checkin"/>
	</div>
	<div class="search-field">
		<label><%= l("Check-Out") %></label>
		<input type"text" name="checkout"/>
	</div>
	<input type="submit" value="Search"/>
</form>