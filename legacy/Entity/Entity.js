/**
 * Entity is an object which resides in the world space
 * but does not necessarily possess physical properties
 */

define(['../core', 
        '../system', 
        '../Point', 
        './Orbit'],
		function(core, sys, Point, Orbit){
	
    var screen= sys.screen;
	var entityStats={
			created:[],
			activated:[],
			removed:[]
	};

	
	var Entity = core.Class.extend({
		index: 0,
		lifeTime: 0,
		activated: false,
		remove: false,
		bb: null,
		orbit: null,
		onActivate: function(){},
		onRemove: function(){},
		init: function(type, pos){
			this.remove = false;
			this.lifeTime = 0;
			this.type = type;
			this.p = new Point(0,0);
			this.lp = new Point(0,0);
			entityStats.created[this.type] = entityStats.created[this.type]? entityStats.created[this.type] + 1: 1;
			if(typeof(pos) !== 'undefined'){
				this.moveTo(pos);
			}			
		  },
		  update: function(ticks){
		    this.lifeTime += ticks;
		    this.lp.copy(this.p);
		  },
		  draw: function(){
			  this.sp = this.world.cam.toScreenPos(this.p);
			  if(sys.debug){
				  if(this.getBB()){
					  screen.stroke=screen.color(200,0,255);
					  screen.fill=0;					  
					  var bp = this.world.cam.toScreenPos(new Point(this.bb.x, this.bb.y));
					  screen.rect(bp, this.bb.w, this.bb.h);
					  this.sp=bp;
					  
				  }
				  
				  screen.fill = screen.color(255,255,0);
				  if(this.color){
					  screen.fill=this.color;
				  }
				  screen.stroke=0;
				  screen.text(this.sp, this.type);
			  }
		  },
		  activate: function(index){
			  if(! this.activated){
				   entityStats.activated[this.type] =  entityStats.activated[this.type]?  entityStats.activated[this.type]+1: 1;
				  this.activated=true;				  
				  this.index = index;				  
				  this.onActivate();
			  }
			  return this;
		  },
		  removeFn: function(world){
			  entityStats.created[this.type] -= 1;
			  entityStats.removed[this.type] =entityStats.removed[this.type]?  entityStats.removed[this.type]+1: 1;
			  this.onRemove();
		  },
		  correct: function(amount){
			  this.index +=amount;
		  },
		  moveTo: function(pos){
			  var d = this.p.dif(this.lp);
			  this.p.copy(pos);
			  this.lp.copy(pos);
			  this.lp.add(d);
		  },
		  getBB: function(){
			  return this.bb;
		  }
	}); 
	Entity.Orbit=Orbit;
	return Entity;
});