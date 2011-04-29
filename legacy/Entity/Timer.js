/**
 * Timer, which can take two events :
 * endEvent: which gets fired after the time has run up
 * updateEvent: which gets fired every frame
 */

define(['../core', '../system','./Entity'],function(core, sys, Entity){
	
	var Timer = Entity.extend({
		endEvent: function(){},
		updateEvent: function(){},
		time: 1000,
		init: function(world, type, time, updateEvent, endEvent ){
			this._super(world,type);
			
			this.time= time;
			if(typeof(endEvent)==='function'){
				this.endEvent= endEvent;
			}
			
			if(typeof(updateEvent)==='function'){
				this.updateEvent= updateEvent;
			}
		},
		update: function(ticks){			
			this._super(ticks);
			
			this.updateEvent({percent: this.lifeTime/this.time,lifeTime: this.lifeTime, time: this.time, type: 'update'});

			if(this.lifeTime>= this.time){
				this.endEvent({time: this.time, type: 'end'});
			}
		},
		draw: function(){}
	});
});