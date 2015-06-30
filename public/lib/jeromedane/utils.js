// declare "namesape" in JavaScript
var com = com || {};
com.jeromedane = com.jeromedane || {};

/** 
 * Collection of misc. utils to allow simple refactoring
 */
com.jeromedane.Utils = {
	
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