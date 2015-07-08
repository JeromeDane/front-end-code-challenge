define([
	'text!templates/hotel-details.tpl'
], function(
	templateHtml
) {

	// dialog settings
	var width, height;			// automatically calculated within updateDialogDimensions()
	var animDuration = 300;

	// get where the dialog top should be
	function getDialogTop() {
		return $('body').scrollTop() + ($(window).height() / 2) - (height / 2);
	}

	// reposition dialog top if open
	function positionDialogTopIfOpen(view) {
		
		// don't do anything if the dialog isn't open
		if(!view.$dialog || !view.$dialog.dialog('isOpen')) return;
		
		console.log('os2');
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
				width: width,
				height: height + 'px'
			}, { duration: animDuration });
			
		// animate dialog widget fade in and position to center
		view.$dialog.dialog('widget').animate({
				opacity: 1,
				width: width,
				left: ($(window).width() / 2) - (width / 2),
				top: getDialogTop()
			}, 
			{ duration: animDuration });

		// close the dialog when clicking outside it
		$('.ui-widget-overlay').on('click', function() {
			view.$dialog.dialog('close');
		});
	}
	
	// update the dialog dimensions based on window size
	function updateDialogDimensions() {
		// TODO: calculate dialog dimensions based on current window size
		width = 500;
		height = 400;
	}
	
	// resize the dialog based on current size settings
	function resizeDialog(view) {
		// TODO: resize the dialog based on current size settings
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
			   resizeDialog(view);
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