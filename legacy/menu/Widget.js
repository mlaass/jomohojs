/**
 * @author Moritz Laass
 * 
 */

define([ '../core', '../system', '../Point' ], function(core, sys, Point) {

	var screen = sys.screen;

	/**
	 * @name Widget
	 * @class A basic widget
	 * @augments Class
	 * 
	 */
	var Widget = core.Class.extend({
		pos : new Point(0, 0),
		text : '',
		textStroke : 0,
		textFill : screen.color(0, 0, 0),
		init : function(position, text) {
			this.pos = position;
			this.text = text;
		},
		draw : function(surface) {
			screen.stroke = this.textStroke;
			screen.fill = this.textFill;
			screen.text(this.p, this.text);
		},
		update : function(ticks) {

		}
	});
	return Widget;
});