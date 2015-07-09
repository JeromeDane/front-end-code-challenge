// TODO: Consider breaking this up into separate views. Lots of code here. :-(
define([
	'text!templates/hotel-details.tpl'
], function(
	templateHtml
) {

	// dialog settings
	var width, height;			// automatically calculated within updateDialogDimensions()
	var animDuration = 300;
	
	// initialize best rate tooltop and interaction
	function initBestRate(view) {
		if(!view.model.get('best_rate_guarantee')) return;
		
		// add link if found
		var content = view.model.get('best_rate_guarantee').description;
		if(view.model.get('best_rate_guarantee').url) {
			content += '<a href="' + view.model.get('best_rate_guarantee').url + '" target="_blank">' + 
					l('read more') + ' ...</a>';
		}
		
		$('.rate-guarantee', view.$dialog).tooltipster({
			maxWidth: 300,
			interactive: true,
			position: 'bottom', 
			content: content,
			contentAsHTML: true,
			theme: 'tooltipster-shadow'
		});
	}
	
	function initGallery(view) {
		
		var $photos = $('#tabs-photos a', view.$dialog);
		var $thumbStrip = $('.thumbnail-strip', view.$dialog);
		
		// initialize swipebox gallery
		$photos.swipebox({ loopAtEnd: true });
		
		var sly = new Sly($thumbStrip, {
			mouseDragging: true,
			touchDragging: true,
			horizontal: true,
			slidee: $('.photos', $thumbStrip),
			itemNav: 'centered',
			itemSelector: 'li',
			smart: true,
			elasticBounds: true
		}).init();
		
		// update thumbnail strip slidee width as images load
		// TODO: Fix width getting too large, which causes white space after last picture
		$('img', $thumbStrip).load(function() {
		   $(this).parent().parent().width($(this).width());
			sly.reload(); 
		});
	
		// activate swipebox gallery on thumbnail strip
		$('a', $thumbStrip).swipebox({ 
			loopAtEnd: true,
			afterClose: function() {
				// switch to tabs after viewing gallery from thumbnail strip
				view.$tabs.tabs( "option", "active", 1);
			}
		});
		
	}
	
	function initMap(view) {
		
		// use hotel latitude and longitude
		var latLng = new google.maps.LatLng(view.model.get('lat'), view.model.get('lng'));
		
		// perform actual map render within a given tab
		function _renderMap(tabName, zoomLevel, showUi) {
			
			var container = $('#tabs-' + tabName + ' .map-container', view.$dialog)[0];
			
			// render map
			var map = new google.maps.Map(container, {
				center: latLng,
				zoom: zoomLevel,
				disableDefaultUI: !showUi
			});
			
			// apply marker
			new google.maps.Marker({
				position: latLng,
				map: map
			});
		}
		
		function _renderOverviewMap() {
			_renderMap('overview', 11, false);
		}
		
		// render overview tab map once animations are complete
		view.on('animation-complete', function() {
			_renderOverviewMap();
		});
		
		// wait until switching to a tab before trying to render a map there
		view.$tabs.on("tabsactivate", function(event, ui) {
			
			var tabName = ui.newPanel.selector.match(/tabs-(.+)/)[1];
			
			switch(tabName) {
				case 'map':
					_renderMap('map', 13, true);
					break;
				case 'overview':
					_renderOverviewMap();
					break;
			}
			
		});
		
		// wait until switching to map tab before trying to render
		view.$tabs.on("tabsactivate", function(event, ui, showUi) {
			
			var container = $('#tabs-map .map-container', view.$dialog)[0];
			
			// use hotel latitude and longitude
			var latLng = new google.maps.LatLng(view.model.get('lat'), view.model.get('lng'));
			
			// render map
			var map = new google.maps.Map(container, {
				center: latLng,
				zoom: 13,
				disableDefaultUI: showUi
			});
			
			// apply marker
			new google.maps.Marker({
				position: latLng,
				map: map
			});
			
		});
		
		// render overview tab map once animations are complete
		view.on('animation-complete', function() {
			_renderOverviewMap();
		});
		
	}
	
	function isDialogOpen(view) {
		return (view.$dialog && view.$dialog.hasClass('ui-dialog-content') && view.$dialog.dialog('isOpen'));
	}

	// get where the dialog top should be
	function getDialogTop() {
		var offset = 25;
		return $('body').scrollTop() + ($(window).height() / 2) - ((height + offset) / 2);
	}
	
	// get where the dialog left edge should be
	function getDialogLeft() {
		return ($(window).width() / 2) - (width / 2) - 5;
	}

	// reposition dialog top if open
	function positionDialogTopIfOpen(view) {
		
		// don't do anything if the dialog isn't open
		if(!isDialogOpen(view)) return;
		
		view.$dialog.dialog('widget').css('top', getDialogTop());
	}

	// render star value and guest ratings as stars
	function renderStars(view) {
		
		var starConfig = {
			half: true,
			path: 'lib/raty/images',
			readOnly: true
		};

		// render hotel star value
		// TODO: replace path to star images for this instance to a copy that has a small drop shadow to help with visibility when positioned over hotel thumbnail images
		starConfig.score = view.model.get('stars');
		starConfig.hints = ["", "", "", "", ""];
		$('.star-value', view.$dialog).raty(starConfig);

		// render guest rating star value
		starConfig.score = view.model.get('guest_rating');
		starConfig.hints = [l('RATING_1'), l('RATING_2'), l('RATING_3'), l('RATING_4'), l('RATING_5')];
		$('.rating .score', view.$dialog).raty(starConfig);
		
		// render review stars
		delete starConfig.score;
		starConfig.score = function() {
			return $(this).attr('data-rating');
		};
		$('ul.reviews .rating .score', view.$dialog).raty(starConfig);
		
	}
	
	function renderTabs(view) {
		view.$tabs = $('#hotel-details-tabs', view.$dialog);
		view.$tabs.tabs();
	}
	
	// resize the dialog based on current size settings
	function resizeDialogIfOpen(view) {
		
		// don't do anything if the dialog isn't open
		if(!isDialogOpen(view)) return;
		
		updateDialogDimensions();
		
		// resize and re-center dialog
		view.$dialog.dialog('widget').css({
			height: height,
			width: width,
			left: getDialogLeft(),	// small offset to the left for better positioning
			top: getDialogTop(),
			closeOnEscape: false
		});
		view.$dialog.height(height);
	}
	
	// show view as a dialog that centers on hotel preview
	function showDialog(view, hotelPreviewView) {
		
		view.$dialog = $('.hotel-details', view.$el);

		// show hotel details as popup dialog
		view.$dialog.dialog({
			dialogClass: 'hotel-details-dialog',
			modal: true,
			height: hotelPreviewView.$el.height(),
			width: hotelPreviewView.$el.width(),
			hide: {
				effect: "scale",
				duration: animDuration
			},
			close: function() {
				view.$dialog.remove();
			},
			create: function() {
				// Don't close dialog if gallery open. Tip from  http://stackoverflow.com/questions/14853388/how-to-catch-esc-in-event-in-jquery-dialog
				$(window).on('keydown', function(evt) {
					if(isDialogOpen(view) && evt.keyCode === $.ui.keyCode.ESCAPE && $('#swipebox-slider:visible').size() === 0) {
						view.$dialog.dialog('close');
					}
				});
			},
			closeOnEscape: false
		});
		// start out the dialog as invisible/transparent
		view.$dialog.dialog("widget").css('opacity', 0);

		// start the dialog out centered on the originating hotel preview
		view.$dialog.dialog("widget").position({
			my: 'center',
			at: 'center',
			of: hotelPreviewView.$el
		});
		
		// animate grow dialog to full size
		view.$dialog.animate({
				height: height
			}, animDuration, function() {
				// tell other elements of the view that the animation is complete
				view.trigger('animation-complete');
			});
			
		// animate dialog widget fade in and position to center
		view.$dialog.dialog('widget').animate({
				opacity: 1,
				width: width,
				left: getDialogLeft(),	// small offset to the left for better positioning
				top: getDialogTop()
			}, 
			{ duration: animDuration });
		
		// fade the modal overlay in along with other animations
		$('.ui-widget-overlay').hide();
		$('.ui-widget-overlay').fadeIn(animDuration);

		// close the dialog when clicking outside it
		$('.ui-widget-overlay').on('click', function() {
			view.$dialog.dialog('close');
		});
		
		// fix dialog contents starting scrolled down
		view.$dialog.scrollTop(0);
		
	}
	
	// update the dialog dimensions based on window size
	function updateDialogDimensions() {
		// TODO: calculate dialog dimensions based on current window size
		width = Math.min(900, $(window).width() - 20);
		height = Math.min(700, $(window).height() - 35);
	}
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			
		   var _this = this;
		   
		   // reposition dialog on window scroll if open (i.e. pin the dialog in place)
		   $(window).scroll(function() {
			  positionDialogTopIfOpen(_this);
		   });
		   
		   // update dialog dimensions based on window size
		   $(window).resize(function() {
			   resizeDialogIfOpen(_this);
		   });
		   updateDialogDimensions();
		   
		},
		
		render: function(hotelPreviewView) {
			
			this.model = hotelPreviewView.model;
			
			var attr = this.model.toJSON();
			attr.ratingFrequencies = this.model.getRatingFrequencies();
			this.$el.html(this.template(attr));
			
			showDialog(this, hotelPreviewView);
			renderStars(this);
			renderTabs(this);
			initBestRate(this);
			initGallery(this);
			initMap(this);
			
			$('button', this.$dialog).button();
		}
	};
	
	return Backbone.View.extend(view);
	
});