define([
	'text!templates/ui.tpl',
     'views/header',
     'views/search'
], function(
    templateHtml,
    HeaderView,
    SearchView
) {

	/**
	 * Render a subview of the main UI view 
	 * 
	 * @param {type} view The UI view instance into which the subview will be rendered
	 * @param {type} viewName The name/key of the view to be rendered
	 * @param {type} targetWrapper [optional] The target view wrapper element into which to render the subview
	 * @returns null
	 */
	function renderSubView(view, viewName, targetWrapper) {
		targetWrapper = targetWrapper || viewName;
		var subView = view.views[viewName];
		subView.setElement('.view-' + targetWrapper, view.$el);
		subView.render();
	}
	
	var view = {
		
		template: _.template(templateHtml),
		
		initialize: function() {
			
			this.views =  {
				header: new HeaderView(),
				search: new SearchView()
			};
		
		},               
                
		render: function() {
			
			this.$el.html(this.template());
			
			renderSubView(this, 'header');
			renderSubView(this, 'search', 'body');
			
			
		}
	};
	
	return Backbone.View.extend(view);
	
});