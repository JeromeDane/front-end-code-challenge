<form>
	<div class="search-field">
		<label><%= l("WHERE_STAY?") %></label>
		<input type"text" name="location"/>
		<input type="text" name="locationId"/>
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