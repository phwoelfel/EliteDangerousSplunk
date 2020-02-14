
require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {

    var BorderHighlightRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            return _(['IsInteresting']).contains(cell.field);
        },
        render: function($td, cell) {
        	var value=cell.value;
            if (cell.field === 'IsInteresting') {
        		console.log("value: "+value)
                if (value == "true") {
                	console.log("adding highlight to ", $td)
                    $td.addClass('highlight-border');
                }
            }
            $td.text(value).addClass('string');
        }
    });

    mvc.Components.get('highlight').getVisualization(function(tableView) {
        tableView.on('rendered', function() {
            // Apply class of the cells to the parent row in order to color the whole row
            setTimeout(function(){
	            tableView.$el.find('td.highlight-border').each(function() {
	                $(this).parents('tr').addClass('highlight-border');
	            })
	        }, 100);

        });
        tableView.addCellRenderer(new BorderHighlightRenderer());
    });

});