define(['jo', 'Class'],function(jo, Class){
	
	jo.Behaviour = Class.extend({
		joObject: 'Behaviour',
		isBehaviour: true,
		init: function(){
			this.joObject = this.joObject;
			this.arguments = arguments;
		},		
		setup: function(obj){
			
		},
		update: function(time){
			
		},
		postUpdate: function(time){
			
		},
		draw: function(opt, pos, srf){
			
		},
		postDraw: function(opt, pos, srf){
			
		}
	});
	
	return jo.Behaviour;
});