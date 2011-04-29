/**
 * Orbit is used by entities to detect if other entities are near
 * orbit also has two angles which can be used to create something 
 * like a field of view for enemies. ***not tested yet
 */

define(['../core', 
        '../system', 
        '../Point', 
        '../dynamics/collider'],
		function(core, sys, Point, col){
	
    var screen= sys.screen;
	var entityStats={
			created:[],
			activated:[],
			removed:[]
	};
	
	var Orbit= core.Class.extend({
		r: 20,
		angleA: 0,
		angleB: 2*Math.PI,
		init: function(entity, r){
			this.entity= entity;
			this.r=r;
			this.isOrbit=true;
		},
		hitTest: function(other){
			if(other.isActor){				
				if(col.circleIntersect(this.entity.p, this.r, other.getPart(0).p, other.getPart(0).r)){
					var d = this.entity.p.dif(other.p);
					var angle = d.toAngle();
					this.normalizeAngles();
					if(angle >= angleA && angle <= angleB){
						this.onHit(other);
						return true;
					}
				}
			}
			return false;
		},
		onHit: function(other){
			core.log('orbit hit '+ other.type);
		},
		normalizeAngles: function(){
			this.angleA= this.nangle(this.angleA);
			this.angleB= this.nangle(this.angleB);
			
			if(this.angleB< this.angleA){
				this.angleB+= 2*Math.PI;
			}
		},
		nangle: function(a){
			if(a> 2*Math.PI){
				var m = Math.Floor(a/(2*Math.PI));
				a-= m*Math.PI;
			}else if(a<0){
				var m = Math.Ceil((-a)/(2*Math.PI));
				a+= m*Math.PI;
			}
			return a;
		}
		
	});
	
	return Orbit;
});