// declare "namesape" in JavaScript
var com = com || {};
com.jeromedane = com.jeromedane || {};

/** 
 * Collection of misc. utils to allow simple refactoring
 */
com.jeromedane.Utils = {
	
	/**
	 * Perform an action only after a certain amount of
	 * time has passed. Useful for performing a search based
	 * on an input field on key up, but only if the user hasn't
	 * entered a new key in a certain amount of time.
	 * 
	 * Source: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
	 */
	delay: (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})(),
	
	/**
	 * Render a subview of a given view
	 * 
	 * @param {type} view The view instance into which the subview will be rendered
	 * @param {type} viewName The name/key of the view to be rendered
	 * @param {type} targetWrapper [optional] The target view wrapper element into which to render the subview
	 * @returns null
	 */
	renderSubView: function (view, viewName, targetWrapper) {
		targetWrapper = targetWrapper || viewName;
		var subView = view.views[viewName];
		subView.setElement('.view-' + targetWrapper, view.$el);
		subView.render();
	}
	
};