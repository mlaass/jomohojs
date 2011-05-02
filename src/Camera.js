/**
 * Camera class keeps track of the current 
 * drawing position
 */


define(['./jo','./Point'], 
        function(jo, 
        		Point){

	jo.Camera = Point.extend({
		init: function(){
			this._super(0,0);
		},
		toScreen: function(p){
			if(typeof p =='undefined'){
				return this.neg();
			}
			return p.minus(this);
		},
		toWorld: function(p){
			if(typeof p =='undefined'){
				return this;
			}
			return p.plus(this);
		},

		toMap: function(p){
			if(typeof p =='undefined'){
				return null;
			}
			var p= this.toWorld(p);
			p.x/=jo.game.map.tileSet.width;
			p.y/=jo.game.map.tileSet.height;
			return p.floor();
		},
		parrallax: function(val, width, height){
			var para = this.mul(val);
			para.x = para.x % width;
			para.y = para.y % height;
			return para.negate();
		}
	});
	return jo.Camera;
});