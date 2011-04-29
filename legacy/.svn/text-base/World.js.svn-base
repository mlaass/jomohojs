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
        "./Grid",
        "./Level",
        "./effects",
        "./ParticleWorld"], 
        function(core, 
        		sys, 
        		Point,
        		collider,
        		Grid,
        		Level,
        		efx,
        		ParticleWorld){
	
	var screen= sys.screen, 
		input= sys.input, 
		res= sys.resources;

	
	var World = ParticleWorld.extend({
			Grid: Grid,
			entities: [],
			targets: [],
			orbits: [],
			level: null,
			init: function(){
				this._super();
			},
			setup: function(){
				this.clear();
				this.prepareStars();
			},
			clear: function(){
				this._super();
				this.entities= [];
				this.targets=[];
			},
			update: function(ticks){
				this.orbits=[];
				
				for(var i=0; i< this.parts.length; i++){					
					this.parts[i].update(ticks);
					this.parts[i].a.add(this.gravity);
				}

				for(var i=0; i< this.entities.length; i++){
					this.entities[i].update(ticks);	
				}
				
				for(var i=0; i< this.entities.length; i++){
					
					if(this.entities[i].orbit){
						this.orbits.push(this.entities[i].orbit);
					}
					if(this.entities[i].remove){
						this.removeEntity(i);
					}
				}
				
				for(var i=0; i< this.entities.length; i++){
					for(var j =0; j< this.orbits.length; j++){
						this.orbits[j].hitTest(this.entities[i]);
					}
				}
								
				this.handleConstraints(ticks, this.cons, 4);				
				
				this.collectCollisions(ticks, $crystal.game.state==='play');
				this.applyCollisions(ticks);
				if(this.level){
					this.level.update(ticks);
				}
				
				if(this.level){
					this.levelCollisions(ticks);
				}
				
				for(var i=0; i< this.parts.length; i++){
					this.applyBounds(this.parts[i]);
				}
				
			},
			editUpdate: function(ticks){
				for(var i=0; i< this.parts.length; i++){
					this.parts[i].lp.copy(this.parts[i].p);
					this.parts[i].update(ticks);
				}
				
				for(var i=0; i< this.entities.length; i++){
					this.entities[i].update(ticks);	
				}

				for(var i=0; i< this.entities.length; i++){
					if(this.entities[i].remove){
						this.removeEntity(i);
					}
				}
				
				this.handleConstraints(ticks, this.cons, 4);				
				
				this.getCollisions(ticks, false);
				this.handleCollisions(ticks);
				
				this.level.update(ticks);
				if(this.level){
					this.levelCollisions(ticks);
				}
				
				for(var i=0; i< this.parts.length; i++){
					this.applyBounds(this.parts[i]);
				}
				
			},
			draw: function(){
				
				this.drawStars();
				if(screen.debug){
					this.drawDebug();
				}
				if(this.level){
					this.level.draw(this.cam, screen.width, screen.height);
				}

				for(var i=0; i< this.entities.length; i++){
					this.entities[i].draw();					
				}				
			},
			drawDebug: function(){
				this.drawGrid(Tile.getW());				
				
				screen.stroke=screen.color(250,250,250);				
				for(var i=0; i< this.parts.length; i++){
					this.parts[i].draw(this);					
				}
				
				screen.stroke=screen.color(250,250,250);
				screen.fill= null;
				for(var i=0; i< this.cons.length; i++){
					
					var a = this.cam.toScreenPos(this.parts[this.cons[i].a].p);
					var b = this.cam.toScreenPos(this.parts[this.cons[i].b].p);
					
					screen.line(a, b);
				}
			},
			drawStars: function(){
				var tw=res.img['stars'].width, th=res.img['stars'].height;
				var off= this.cam.parrallax(0.7,tw,th);
				this.starmap.draw(screen, off);
			},
			prepareStars: function(){
				
				var tw=res.img['stars'].width, th=res.img['stars'].height;
				var w= Math.floor(screen.width/tw)+2;
				var h= Math.floor(screen.height/th)+2;
				
				this.starmap = new sys.Surface(w*tw, h*th);
				for(var i=0; i<w; i++){
					for(var j=0; j<h; j++){
						res.img['stars'].draw(this.starmap, new Point(i*tw,j*th));
					}
				}
			},
			levelCollisions: function(){
				var tw= Tile.getW();
				var th= Tile.getH();
				for(var i=0; i< this.parts.length; i++){
					var bb = this.parts[i].getBB();
					sx= Math.floor(Math.max(bb.x/tw, 0));
					sy= Math.floor(Math.max(bb.y/th, 0));
					
					w= Math.ceil(bb.w/tw +1);
					h= Math.ceil(bb.h/th +1);
					
					if(! this.parts[i].isStatic){					
						for(x=sx; x< Math.min(sx+w, this.level.width); x++){
							for(y=sy; y< Math.min(sy+h, this.level.height); y++){
								tile=this.level.getTile(x,y);							
								
								if(tile.proto.isSolid){
									tile.tile.tested=true;
									c= collider.particleTile(this.parts[i], tile);
									if(c.dir==="inside"){
										c.dir="top";
									}
									if(c){
										this.parts[i].collide({type: "tile", tile: tile, collision: c});
										//if(c.dir==="left" || c.dir==="right" || c.dir==="top" || c.dir==="bottom"){
											this.parts[i].p.add( collider.dir[c.dir].mul(c.depth));
										//}else{
										//	cc =new AxisConstraint(a.index, c.p, a.r );
										//}
										
									}
								}							
							}
						}
					}
				}			
			},
			addEntity: function(entity){
				if(typeof(entity) !== 'undefined' || !entity){				
					entity.parent = this;
					entity.world = this;
					entity.activate(this, this.entities.length);
					this.entities.push(entity);
				}
				return entity;
			},
			addEffect: function(effect, pos, more){
				return this.addEntity(efx[effect](pos, more));
			},
			removeEntity: function(index){
				this.entities[index].removeFn(this);
				
				var offpart = null;
				var offcon = null;	
				
				if(this.entities[index].isActor){
					var offpart = this.removeParticles(this.entities[index].parts);
					var offcon = this.removeConstraints(this.entities[index].cons);	
				}
				
				this.correctEntities(index, -1, offpart, offcon);
				this.entities.splice(index,1);
			},
			correctEntities: function(index, amount, offpart, offcon){
				for(var i= index; i< this.entities.length; i++){
						this.entities[i].correct(amount, offpart, offcon);
				}
			},
			pickEntity: function(point){
				for(var i=0; i< this.entities.length; i++){
					var bb= this.entities[i].getBB();
					if(collider.boxPoint(bb, bb.w, bb.h, point)){
						return this.entities[i];
					}					
				}
				return null;
			}
	});
	return World;	
});