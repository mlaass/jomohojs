

define(['./jo'], function(){
	
	jo.Object = jo.Object.extend(
		/**
		 * @lends jo.Object.prototype
		 */	
		{
		/**
		 * holds the type of the object, for serialisation reviving from JSON
		 * must be the official name without the 'jo.'
		 */
		joObject : 'Object',
		/**
		 * an object can have sub objects
		 */
		objects: {},
		
		/**
		 * constructor
		 */
		init : function(){
			obthis.objects = {};
		},
		draw: function(surface){			
			for(obj in this.objects){
				obj.draw(surface);
			}
		},
		update: function(time){
			for(obj in this.objects){
				obj.update(time);
			}
		},
		addObject: function(id, obj){
			if(typeof this.objects[id] === 'undefined'){
				this.objects[id] = obj;
			}else {
				this.objects[id].addObject(id, obj);
			}
		},
		getObject: function(id){
			return this.objects[id];
		},
		removeObject: function(id){
			delete this.objects[id];
		}		
	});
	
	jo.Object.revive = function(key, value){
		if(typeof value === 'object' && typeof value.joObject === 'string'){
			var obj = new jo[value.joObject]();
			obj.adapt(value, true, false);			
			return obj;
		}		
		return value;
	};
	jo.Object.parse = function(text){
		return JSON.parse(text, jo.Object.revive);
	};

});