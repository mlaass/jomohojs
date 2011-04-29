/**
 * Camera class keeps track of the current 
 * drawing position
 */


define(['./core', 
        './system', 
        './Point'], 
        function(core, 
        		sys, 
        		Point){

	var Camera = Point.extend({
		init: function(){
			this._super(0,0);
		},
		toScreenPos: function(p){
			return p.dif(this);
		},
		toWorldPos: function(p){
			return p.sum(this);
		},
		parrallax: function(val, width, height){
			var para = this.mul(val);
			para.x = para.x % width;
			para.y = para.y % height;
			return para.negate();
		}
	});
	return Camera;
});