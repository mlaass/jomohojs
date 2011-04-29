/**
 * 
 */

define([ '../core', '../system', '../Point', './Widget', './Button' ],
function(core, sys, Point, Widget, Button) {

	var Menu = core.Class.extend({
		widgets : [],
		active : -1,
		init : function() {
		},
		draw : function() {
			for ( var i = 0; i < widgets.length; i++) {
				this.widgets[i].draw();
			}
		},
		update : function(ticks) {
			for ( var i = 0; i < widgets.length; i++) {
				this.widgets[i].update(ticks);
				if (i === this.active) {
					this.widgets[i].hover();
				}
			}
		},
		selectNext : function() {
			this.active = (this.active + 1) % this.widgets.length;
		},
		selectPrev : function() {
			this.active = (this.active - 1) % this.widgets.length;
		}
	});
	Menu.Widget = Widget;
	Menu.Button = Button;

	return Menu;
});