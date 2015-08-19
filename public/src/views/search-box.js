var _ = require('underscore');
var Backbone = require('backbone');
var LocationsCollection = require('../collections/locations');
var $ = require('jquery');
var l = require('../localization').l;
var delay = require('../utils').delay;

require('jquery-ui');

// TODO: Way to let user click "current location"

// TODO: Store field values and restore them on re-render (e.g. after locale change)

function handleHotelSearchError(view, response) {

	// clear out existing locations and hotels
	view.locations.reset();
	view.hotels.reset();

	// show invalid location warning
	if(response.responseText || response.responseText.match(/location/i)) {
		$('.invalid-location', view.$el).show();
	} else {
		alert("Unknown server error");
	}

}

function hideInvalidLocationMessage(view) {
	$('.invalid-location', view.$el).hide();
}

function initDatePickers(view) {

	// TODO: Fix display of calendar popups on mobile

	// TODO: Move code for date pickers into their own view and create one instance for checkin, one for checkout

	// get checkin/checkout fields
	var $checkinField = $('input[name="checkin"]', view.$el);
	var $checkoutField = $('input[name="checkout"]', view.$el);

	// convert a check in/out date to a string
	function _dateToStr(date) {
		var day = date.getDay();
		var d = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();

		return l("DATE_FORMAT")
				.replace(/WEEKDAY/, l("DAY_" + day))
				.replace(/MONTH/, l("MONTH_" + monthIndex))
				.replace(/DATE/, d)
				.replace(/YEAR/, year);
	}

	// update the displayed date
	function _updateDateDisplay() {
		var checkinDate = $checkinField.datepicker('getDate');
		$('.checkin .date', view.$el).text(_dateToStr(checkinDate));
		var checkoutDate = $checkoutField.datepicker('getDate');
		$('.checkout .date', view.$el).text(_dateToStr(checkoutDate));
		var nights = (checkoutDate-checkinDate)/(1000*60*60*24);
		// display number of nights
		$('.checkout .nights', view.$el).text(" (" + nights + " " + (nights > 1 ? l("nights") : l("night")) + ")");
	}

	// initialize both fields the same way
	_.each([$checkinField, $checkoutField], function($field) {
		$field.datepicker({
			minDate: 0,
			numberOfMonths: 2,
			slideshowAnim: "slideDown",
			dateFormat: "yy-mm-dd",
			onSelect: _updateDateDisplay
		});
	});

	// enable click on date display to open selector
	$('.checkin', view.$el).click(function() {
		$checkinField.datepicker("show");
	});
	$('.checkout', view.$el).click(function() {
		$checkoutField.datepicker("show");
	});

	// checking field specific settings
	$checkinField.datepicker("option", "onClose", function(selectedDate) {
		$checkoutField.datepicker( "option", "minDate", selectedDate );
	});
	$checkinField.datepicker('setDate', 'now');

	// checkout field specific settings
	$checkoutField.datepicker("option", "onClose", function(selectedDate) {
		$checkinField.datepicker( "option", "maxDate", selectedDate );
	});
	$checkoutField.datepicker('setDate', "+1d");

	_updateDateDisplay();

}

// initialize location search field autocomplete
function initLocationAutoComplete(view) {

	// TODO: ignore punctuation in matching and consider both abbreviated and full state names

	// TODO: automatically select first item in list on enter pressed if nothing highlighted using arrow keys

	// create autocomplete instance on search field
	view.$search.autocomplete({
		minLength: 3,
		select: function(evt, ui) {
			var itm = ui.item;
			$('input[name="lat"]', view.$el).val(itm.lat);
			$('input[name="lng"]', view.$el).val(itm.lng);
			view.currLocationLabel = itm.label;
			view.$form.submit();
		},
		source: []
	});
}

// initialize keyup event handler on location field
function initLocationKeyup(view) {

	var keyUpDelay = 500;	// millisecond delay to perform location search after key up

	// when the user finishes entering a keystroke in the location search
	view.$search.keyup(function(evt) {

		// TODO: Fix buggy application of results based on current location search (check timing)

		// make sure key pressed was a word character
		if((evt.which != 8 && evt.which != 846) && !String.fromCharCode(evt.which).match(/\w/)) {
			return;
		}

		// TODO: cache location search results (maybe)

		// if the search string is greater than 2 characters
		if(view.$search.val().length > 2) {
			// perform the actual search after the last keystroke was at least keyUpDelay ago
			view.$search.addClass('loading');
			delay(function(){
				searchLocations(view);
			}, keyUpDelay);
		}
	});
}

// initialize location search field
function initLocationSearchField(view) {

	view.$search = $('.location input', view.$el);

	// remember original text to be able to conditionally style input 
	view._origSearchPrompt = view.$search.val();

	// restore location text if previously set
	if(view.currLocationLabel) {
		view.$search.val(view.currLocationLabel);
	}

	// handle search field gain focus
	view.$search.focus(function() {
		// remove original search prompt on focus
		if(this.value === view._origSearchPrompt) {
			this.value = "";
			styleLocationSearchInput(view);
		}

		hideInvalidLocationMessage(view);

		// TODO: Fix having to tap on search field twice on iPhones (and other mobiles?)

	});

	// handle search field lose focus
	view.$search.blur(function() {

		// restore any current location to search field on blur
		view.$search.val(view.currLocationLabel);

		// restore original prompt if field is empty
		if(this.value.replace(/\s/g, '') === "") {
			this.value = view._origSearchPrompt;
		}
		styleLocationSearchInput(view);

	});

	initLocationAutoComplete(view);
	initLocationKeyup(view);

	styleLocationSearchInput(view);

}

// initialize maximum distance input
function initMaxDist(view) {

	var $slider = $('.distSlider');
	var initialDist = 10;

	function updateSliderDisplay(val) {
		if(val < 5) return false;
		var $label = $('.search-field.dist label');
		$label.text($label.text().replace(/MAXDIST|\d+/, val));
		$('input[name="dist"]').val(val);
		return true;
	}

	$slider.slider({
		range: 'min',
		min: 0,
		max: 50,
		step: 5,
		value: initialDist, 
		slide: function(evt, ui) {
			return updateSliderDisplay(ui.value);
		}
	});

	updateSliderDisplay(initialDist);
}

function initSubmit(view) {
	view.$form = $('form', view.$el);
	view.$form.submit(function() {
		searchHotels(view);
		return false;
	});

	// don't submit form on enter pressed
	$('input', view.$form).keydown(function(event){
		if(event.keyCode === 13) {
		  event.preventDefault();
		  return false;
		}
	});

	$('input[type="submit"]', view.$form).button();

	// TODO: show location not found message as appropriate
}

// map locations collection to autocomplete data and refresh options
function parseLocationResults() {
	this.$search.autocomplete('option', 'source', this.locations.map(function(loc) {
		return {
			label: loc.get('city') + ', ' + l(loc.get('state')) + ' ' + loc.get('postal'),
			city: loc.get('city'),
			state: loc.get('state'),
			zip: loc.get('postal'),
			lat: loc.get('latitude'),
			lng: loc.get('longitude')
		};
	}));
	this.$search.removeClass('loading');	
	
	// hack to force open autocomplete list when locations are ready. from https://community.oracle.com/thread/2451338
	//preserve the minLength option
	var lMinLength = this.$search.autocomplete("option","minLength");
	//set minLength to 0 so a search can trigger
	this.$search.autocomplete("option","minLength", 0);      
	this.$search.autocomplete("search",'');
	//reset the minlength option
	this.$search.autocomplete("option","minLength", lMinLength);
}

// perform hotel search
function searchHotels(view) {

	// TODO: Check to make sure lat/long fields are filled out BEFORE allowing search and display invalid location message as necessary

	hideInvalidLocationMessage(view);

	// TODO: Apply search parameters to URL in order to allow bookmarking and page refresh

	view.hotels.setParams(view.$form.serialize());
	view.hotels.setLocationName($('.search-field input', view.$el).val());
	view.hotels.fetch({
		complete: function() {
			// tell other views to re-render as necessary
			if(view.hotels.length > 0) {
				view.hotels.trigger('update');
			} else {
				view.hotels.trigger('no-results');
			}
		},
		error: function(collection, response) {
			handleHotelSearchError(view, response);
		}
	});
}

// apply search filter and get locations matching that filter
function searchLocations(view) {
	view.locations.setFilter(view.$search.val());
	view.locations.fetch({
		complete: function() {
			// tell other views to re-render as necessary
			view.locations.trigger('update');
		}
	});
}

// style location search input based on whether original text is present or not
function styleLocationSearchInput(view) {
	if(view.$search.val() === view._origSearchPrompt) {
		view.$search.addClass("prompt");
	} else {
		view.$search.removeClass("prompt");
	}
}

var view = {

	template: _.template(require('../templates/search-box.tpl')),

	initialize: function(options) {

		if(!options || !options.hotels) throw "Search box view must be initialized with a hotels collection";

		this.hotels = options.hotels;

		this.locations = new LocationsCollection();
		this.locations.on('update', parseLocationResults, this);

		// preload cville hotels for easy preview during development 
		/*
		this.hotels.setParams('lat=38.035466&lng=-78.46289&dist=10&checkin=2015-07-03&checkout=2015-07-04');
		this.hotels.fetch();
		*/
	},

	render: function() {

		this.$el.html(this.template({
			l: l
		}));

		initDatePickers(this);
		initLocationSearchField(this);
		initMaxDist(this);
		initSubmit(this);

	}
};

module.exports = Backbone.View.extend(view);