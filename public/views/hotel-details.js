define([
	'text!templates/hotel-details.tpl'
], function(
	templateHtml
) {

	// dialog settings
	var width, height;			// automatically calculated within updateDialogDimensions()
	var animDuration = 300;
	
	function isDialogOpen(view) {
		return (view.$dialog && view.$dialog.hasClass('ui-dialog-content') && view.$dialog.dialog('isOpen'));
	}

	// get where the dialog top should be
	function getDialogTop() {
		var offset = 60;
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
			}
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
			}, { duration: animDuration });
			
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
	}
	
	// update the dialog dimensions based on window size
	function updateDialogDimensions() {
		// TODO: calculate dialog dimensions based on current window size
		width = Math.min(900, $(window).width() - 20);
		height = Math.min(700, $(window).height() - 70);
		
	}
	
	// resize the dialog based on current size settings
	function resizeDialogIfOpen(view) {
		
		// don't do anything if the dialog isn't open
		if(!isDialogOpen(view)) return;
		
		// resize and re-center dialog
		view.$dialog.dialog('widget').css({
			height: height,
			width: width,
			left: getDialogLeft(),	// small offset to the left for better positioning
			top: getDialogTop()
		});
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
			   updateDialogDimensions();
			   resizeDialogIfOpen(_this);
		   });
		   updateDialogDimensions();
		   
		},
		
		render: function(hotelPreviewView) {
			
			this.model = hotelPreviewView.model;
			
			this.$el.html(this.template(this.model.toJSON()));
			
			showDialog(this, hotelPreviewView);
		}
	};
	
	return Backbone.View.extend(view);
	
});