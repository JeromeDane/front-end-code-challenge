<form class="search-box">
	<input type="hidden" name="lat"/>
	<input type="hidden" name="lng"/>
	<div class="search-field location">
		<div class="search-field-wrapper">
			<input type"text" value="<%= l("LOCATION_SEARCH_PROMPT") %>"/>
		</div>
	</div>
	<div class="invalid-location ui-state-error">
		<!-- TODO: Localization -->
		Please first select a location from the drop-down menu as you type.
		If you are unable to find your destination, please <a href="javascript:alert('not implemented in this coding challenge')">contact us</a>.
	</div>
	<div class="search-field checkin">
		<label><%= l("Check-In") %>:</label>
		<input type="text" name="checkin"/>
		<span class="date"></span>
		<span class="icon"></span>
	</div>
	<div class="search-field checkout">
		<label>
			<%= l("Check-Out") %><span class="nights"></span>:
		</label>
		<input type="text" name="checkout"/>
		<span class="date"></span>
		<span class="icon"></span>
	</div>
	<div class="search-field dist">
		<label><%= l("WITHIN_X_MILES") %></label>
		<div class="distSlider"></div>
		<input type="hidden" name="dist"/>
	</div>
	<input type="submit" value="Search"/>
</form>