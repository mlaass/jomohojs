/**
 * 
 */

define([ "../core", "../Point", "./Constraint" ], 
		function(core, Point, Constraint) {

	var StaticConstraint = core.Class.extend({
		init : function(p1, p2, len, soft) {
			this.a = p1;
			this.b = p2;
			this.length = len;
			this.soft = 1;
			if (soft && soft < 1) {
				this.soft = soft;
			}
		},
		solve : function(p1, p2) {
			// d = b-a;
			var d = p2.p.dif(p1.p);

			var len = d.length();
			var dif = (this.length - len) / len;

			p2.p.add(d.mul(this.soft * dif));
		}

	});
	return StaticConstraint;
});