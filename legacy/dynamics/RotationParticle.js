/**
 * Rotation Particle is a particle with Rotation
 * it is a little more complicated then the normal Particle
 */

define([ '../core', 
         '../system', 
         '../Point',
         './Particle'],
	function(core, sys, Point, Particle) {
	
	var Rotator = Particle.extend({
		angle: 0,
		lastAngle: 0,
		update: function(ticks){
			this._super(ticks);
			var ad = this.angle-this.lastAngle;	
			
			this.lastAngle = this.angle;
			//maximum one rotation per frame or stuff will get weird
			ad = Math.min(2*Math.PI, Math.max(ad, -2*Math.PI));
			this.angle += ad*Rotator.angularDrag;
			
		},
		addRotation: function(rotation){
			this.unRest();
			this.angle += rotation;
		},
		getRotation: function(){
			return this.angle-this.lastAngle;
		},
		draw: function(world){
			this._super(world);
			if(sys.debug){
				var sp1 = world.cam.toScreenPos(this.p),
				sp2 = world.cam.toScreenPos(this.p).add(((new Point(0,0)).fromAngle(this.angle)).mul(this.r));
				sys.screen.line(sp1, sp2);
			}

		},
		checkMovement: function(){
			return Math.max(Math.abs(this.p.x-this.lp.x), Math.abs(this.p.y-this.lp.y), Math.abs(this.getRotation()));
		}
		
	});
	
	Rotator.angularDrag = 0.99;
	
	return Rotator;
});