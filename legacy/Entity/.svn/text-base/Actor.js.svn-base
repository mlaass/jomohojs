/**
 * actor is an entity which is constructed out of particles and constraints
 * and therefore shows 'physical' properties
 */

define(['../core', 
        '../system',
        '../dynamics/Particle',
        '../dynamics/RotationParticle',
        '../dynamics/Constraint', 
        './Entity'],
        function(core, sys, Particle, RotationParticle, Constraint, Entity){
	
	var screen= sys.screen;
	
	var Actor = Entity.extend({
		isActor: true, 
		collide: function(event){},
		init: function(type, pos, parts, cons){
			this.parts = parts;
			this._super('actor:'+type, pos);			
			this.p.copy(parts[0].p);
			
			for(var i=0; i<parts.length; i++){
				parts[i].type=type;
				parts[i].onCollide(core.bind(this.collide,this) );
			}
			
			if(typeof(cons)!== 'undefined'){
				this.cons = cons;			
			}else{
				this.cons=[];
			}		
		},
		activate: function(index){
			if(!this.activated){
				this._super(index);
				this.parts =this.world.addParticles(this.parts);
				this.cons = this.world.addConstraints(this.cons, this.parts);
			}
			return this;
		},
		moveTo: function(pos){
			if(this.activated){
				this.p.copy(this.world.parts[this.parts[0]].p);				
				var d= pos.dif(this.p);
				for(var i=0; i<  this.parts.length; i++){
					this.world.parts[this.parts[i]].move(d);
				}
				this.p.copy(this.world.parts[this.parts[0]].p);	
			}else{
				var d= pos.dif(this.p);
				for(var i=0; i<  this.parts.length; i++){
					this.parts[i].move(d);
				}
				this.p.copy(this.parts[0].p);
			}
		},
		update: function(ticks){
			this._super(ticks);
			this.p.copy( this.world.parts[this.parts[0]].p);
		},
		draw: function(){
			this._super();
		},
		getPart: function(n){
			return this.world.parts[this.parts[n]];
		},
		correct: function(amount, offpart, offcon){
			this._super(amount);
			if(!offpart){
				return;
			}
			for(var i=0; i<  this.parts.length; i++){
				this.parts[i] -= offpart.amount;			
			}
			for(var i=0; i<  this.cons.length; i++){
				this.cons[i] += offcon;
				this.cons[i].a -=offpart.amount;
				this.cons[i].b -=offpart.amount;
			}			
		},
		getBB: function(){
			this.bb= {x: this.p.x, y: this.p.y, w:this.p.x, h:this.p.y};
			for(var i=0; i<  this.parts.length; i++){
				pb=this.world.parts[this.parts[i]].getBB();
				this.bb.x= Math.min(this.bb.x, pb.x);
				this.bb.y= Math.min(this.bb.y, pb.y);
				this.bb.w= Math.max(this.bb.w, pb.w+pb.x);
				this.bb.h= Math.max(this.bb.h, pb.h+pb.y);
			}
			this.bb.w-=this.bb.x;
			this.bb.h-=this.bb.y;
			return this.bb;
		}
	});
	Actor.Particle = Particle,
	Actor.RotationParticle = RotationParticle,
	Actor.Constraint = Constraint;
	
	$crystal.Actor = Actor;
	return Actor;
});