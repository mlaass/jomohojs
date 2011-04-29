/**
 * Particle is the most primitive physical Object,
 * it is a circle with physical properties like velocity, bounce and friction
 */

define([ '../core', 
         '../system', 
         '../Point' ],
	function(core, sys, Point) {
	// default drag that slows down particles makes everything more smooth
	var defaultDrag = 0.979;
	
	//restPrecision and frames are used for optimise 
	//by leaving out the resting particles
	var restPrecision = 0.375,
		restFrames = 30;
	var screen = sys.screen;

	var Particle = core.Class.extend({
		isStatic : false,
		drag : defaultDrag,
		ctype : 'circle', // means collision type can be box or circle for now
		color : screen.color(255, 0, 0),
		fillcolor : 0,
		r : 4,
		p : new Point(0, 0),
		lp : new Point(0, 0),
		a : new Point(0, 0),
		mass : 1,
		maxSpeed : 50,
		bounce : 0.8,
		friction: 0.95,
		resting: false,
		restCount: 0,
		init : function(x, y, r, _static) {
			this.p = new Point(x, y);
			this.lp = new Point(x, y);
			this.r = r;
			this.a = new Point(0, 0);

			if (typeof (_static) !== 'undefined') {
				this.isStatic = _static;
			}
		},
		update : function(ticks) {			
			if( this.checkMovement() <= restPrecision){
				this.restCount += 1;
			}else{
				this.unRest();
			}
			if(this.restCount >= restFrames){
				this.rest();
			}
			if (this.isStatic || this.resting) {
				return;
			}

			// x += x-oldx+a*fTimeStep*fTimeStep;
			var dtime = ticks / 100;

			this.a.multiply(dtime * dtime);

			var dv = this.p.dif(this.lp);
			dv.add(this.a);

			var len = dv.lengthSqr();
			if (len > this.maxSpeed && !this.isFast) {
				dv.multiply(this.maxSpeed / len);
			}
			// copy
			this.lp.copy(this.p);

			dv.multiply(this.drag);

			this.p.add(dv);

			// reset frame values
			this.a.x = this.a.y = 0;
		},
		v : function() {
			return this.p.dif(this.lp);
		},
		accelerate: function(accel){
			this.unRest();
			this.a.add(accel);
		},
		draw : function(world) {
			if (screen.debug) {
				screen.fill = this.fillcolor;
				screen.stroke = this.color;
				var sp = world.cam.toScreenPos(this.p);
				screen.circle(sp, this.r);
				this.color = screen.color(255, 0, 0);
				this.fillcolor = 0;
			}
		},
		moveTo : function(pos) {
			var d = pos.dif(this.p);
			this.p.copy(pos);
			this.lp.add(d);
		},
		move : function(amount) {
			this.p.add(amount);
			this.lp.add(amount);
		},
		getBB : function() {
			return {
				x : this.p.x - this.r,
				y : this.p.y - this.r,
				w : 2 * this.r,
				h : 2 * this.r
			};
		},
		getMotionBB : function() {
			var x = Math.min(this.p.x - this.r, this.lp.x - this.r),
				y = Math.min(this.p.y - this.r, this.lp.y - this.r);
			var w = Math.max(this.p.x + this.r, this.lp.x + this.r) - x, 
				h = Math.max(this.p.x + this.r, this.lp.x + this.r)	- y;

			return { x : x, y : y, w : w, h : h };
		},
		collide : function(event) {
			if(!event.other.isStatic && !event.other.resting ){
				this.checkRest();
			}
			
			if (typeof (this.collisionCall) === 'function') {
				this.collisionCall(event);
			}
			if (sys.debug) {
				//this.color = screen.color(200, 150, 0);
				if (event.type === 'tile') {
					this.fillcolor = screen.color(20, 155, 0);
				}
			}
		},
		onCollide : function(call) {
			this.collisionCall = call;
		},
		checkMovement: function(){
			return Math.max(Math.abs(this.p.x-this.lp.x), Math.abs(this.p.y-this.lp.y));
		},
		rest: function(){
			this.fillcolor = screen.color(30, 200, 0);
			this.resting = true;
		},
		unRest: function(){
			this.resting = false;
			this.restCount = 0;
		},
		checkRest: function(){
			if(this.checkMovement() > restPrecision){
				this.unRest();
			}
		}
	});
	return Particle;
});