/**
 * World System SuperClass.
 * this is the living heart of the Crystal Engine
 * Particles, Constraints, Entities, updating, 
 * drawing and colliding get handled here.
 */

define(["./core", 
        "./system", 
        "./Point", 
        "./dynamics/collider", 
        "./dynamics/Particle", 
        "./dynamics/Constraint", 
        "./dynamics/StaticConstraint",
        "./dynamics/Collision",
        "./Camera"], 
        function(core, 
        		sys, 
        		Point, 
        		collider, 
        		Particle, 
        		Constraint, 
        		StaticConstraint,
        		Collision,
        		Camera){
	
	var screen= sys.screen, 
		input= sys.input, 
		res= sys.resources;	

	var ParticleWorld = core.Class.extend({
		Particle : Particle,
		Constraint : Constraint,
		StaticConstraint : StaticConstraint,
		Point : Point,
		parts : [],
		cons : [],
		gravity : new Point(0, 0),
		drag : 0.99,
		bounds : {
			x : 0,
			y : 0,
			w : 2040,
			h : 480
		},
		cam : new Camera(),

		init : function() {
			this.clear();
		},
		setup : function() {
			this.clear();
		},
		clear : function() {
			this.parts = [];
			this.cons = [];
			this.cam = new Camera();
		},
		addParticle : function(p) {
			p.index = this.parts.length;
			this.parts.push(p);
			return this.parts[p.index];
		},
		getParticle : function(index) {
			return this.parts[index];
		},
		addConstraint : function(c) {
			this.cons.push(c);
		},
		update : function(ticks) {

			for( var i = 0; i < this.parts.length; i++){
				this.parts[i].update(ticks);
				if(!this.parts[i].resting){
					this.parts[i].a.add(this.gravity);
				}
				
			}

			this.handleConstraints(ticks, this.cons, 4);

			this.collectCollisions(ticks, $crystal.game.state === 'play');
			this.applyCollisions(ticks);

			for ( var i = 0; i < this.parts.length; i++) {
				this.applyBounds(this.parts[i]);
			}
		},
		draw : function() {
			this.drawDebug();
		},
		drawDebug : function() {
			this.drawGrid(30);

			screen.stroke = screen.color(250, 250, 250);
			for ( var i = 0; i < this.parts.length; i++) {
				this.parts[i].draw(this);
			}

			screen.stroke = screen.color(250, 250, 250);
			screen.fill = null;
			for ( var i = 0; i < this.cons.length; i++) {

				var a = this.cam.toScreenPos(this.parts[this.cons[i].a].p);
				var b = this.cam.toScreenPos(this.parts[this.cons[i].b].p);

				screen.line(a, b);
			}
		},
		drawGrid : function(size) { // draws a grid, given a cell size
			var xva = this.bounds.x - this.cam.p.x;
			var xvb = (this.bounds.w - this.bounds.x) / size;

			var yva = this.bounds.y - this.cam.p.y;
			var yvb = (this.bounds.h - this.bounds.y) / size;
			var i = 0;
			screen.stroke = screen.color(25, 25, 25);
			for ( var i = 0; i <= xvb; i++) {
				screen.line({x: xva + i * size, y: yva},
							{x: xva + i * size, y: yva + this.bounds.h});
			}
			for ( var i = 0; i <= yvb; i++) {
				screen.line({x: xva, y: yva + i * size}, 
							{ x: xva + this.bounds.w, y: yva + i * size});
			}
		},
		centerCam : function(p) { // centers the cam on a given point,
									// while not going over the
									// boundaries;
			var half = new Point(screen.width / 2, screen.height / 2);
			this.cam.p = p.dif(half);
			this.cam.p.x = Math.min(this.bounds.w - screen.width, Math
					.max(this.bounds.x, this.cam.p.x));
			this.cam.p.y = Math.min(this.bounds.h - screen.height, Math
					.max(this.bounds.y, this.cam.p.y));
		},
		handleConstraints : function(ticks, cons, recurse) {
			for ( var i = 0; i < cons.length; i++) {
				this.solveConstraint(cons[i]);
			}
			if (recurse && recurse > 0) {
				this.handleConstraints(ticks, recurse - 1);
			}
		},
		solveConstraint : function(c) {
			if (c.isVirtual) {// virtual Constraints are used for some
								// kinds of collision, not yet
				c.solve(c.a, this.parts[c.b]);
			} else {
				c.solve(this.parts[c.a], this.parts[c.b]);
			}
		},
		applyBounds : function(p) {
			// bounds
			if (p.p.y - p.r < this.bounds.y) {
				p.p.y = p.r;
				p.collide({
					type : "border",
					dir : "top",
					other: {isStatic: true}
				});
			} else if (p.p.y + p.r >= this.bounds.y + this.bounds.h) {
				p.p.y = this.bounds.y + this.bounds.h - p.r;
				p.collide({
					type : "border",
					dir : "bottom",
					other: {isStatic: true}
				});
			}
			if (p.p.x + p.r >= this.bounds.x + this.bounds.w) {
				p.p.x = this.bounds.x + this.bounds.w - p.r;
				p.collide({
					type : "border",
					dir : "right",
					other: {isStatic: true}
				});
			} else if (p.p.x - p.r < this.bounds.x) {
				p.p.x = p.r;
				p.collide({
					type : "border",
					dir : "left",
					other: {isStatic: true}
				});
			}
		},
		applyCollisions : function(ticks) {
			for ( var i = 0; i < this.collisions.length; i++) {
				this.collisions[i].apply(ticks);
			}
			for ( var j = 0; j < 3; j++) {
				for ( var i = 0; i < this.collisions.length; i++) {
					this.collisions[i].relax(ticks);
				}
			}
		},
		collectCollisions : function() {
			this.collisions = [];
			this.collisions.tested = 0;
			for ( var i = 0; i < this.parts.length; i++) {
				for ( var j = i + 1; j < this.parts.length; j++) {
					var collision = 0;
					if(!this.parts[i].resting || !this.parts[j].resting){
						collision = this.getCollision(this.parts[i], this.parts[j]);
						this.collisions.tested += 1;
					}					
					if (collision) {
						this.collisions.push(collision);
						this.parts[i].collide({
							type : "particle",
							other : this.parts[j],
							collision : collision
						});
						this.parts[j].collide({
							type : "particle",
							other : this.parts[i],
							collision : collision
						});
					}
				}
			}
		},
		getCollision : function(a, b) {
			if (collider.boxbox(a.getMotionBB(), b.getMotionBB())) {
				return collider.circlesMoving(a, b);
			} else {
				return null;
			}
		},

		addParticles : function(parts) {
			var r = [];
			for ( var i = 0; i < parts.length; i++) {
				r.push(this.parts.length);
				this.addParticle(parts[i]);
			}
			return r;
		},
		addConstraints : function(cons, parts) {
			var r = [];
			for ( var i = 0; i < cons.length; i++) {
				r.push(this.cons.length);
				//correcting the indices
				cons[i].a = parts[cons[i].a];
				cons[i].b = parts[cons[i].b];
				this.cons.push(cons[i]);
			}
			return r;
		},
		removeParticles : function(parts) {
			var s = parts[0];
			var am = parts.length;
			if (parts && parts.length > 0) {
				this.parts.splice(s, am);
			}
			return {
				start : s,
				amount : am
			};
		},
		removeConstraints : function(cons) {
			if (cons && cons.length > 0) {
				this.cons.splice(cons[0], cons.length);
			}
			return -cons.length;
		}
	});	
	return ParticleWorld;	
});