

define(['./jo', './Class', '../lib/JSON/json2'], function(jo, Class, json2){
	
	jo.Object = jo.Class.extend(
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
		 * @constructor
		 */
		init : function(options){
			this.options= options;
			this.objects = [];
			this.joObject= this.joObject;
		},
		draw: function(surface){
			for(obj in this.objects){
				this.objects[obj].draw(surface);
			}
		},
		update: function(time){
			for(obj in this.objects){
				this.objects[obj].update(time);
			}
		},
		add: function(obj, id){
			id = typeof id === 'undefined'? this.objects.length: id+'';
			if(typeof this.objects[id] === 'undefined'){
				this.objects[id] = obj;
			}else {
				this.objects[id].addObject(id, obj);
			}
		},
		get: function(id){
			return this.objects[id];
		},
		removeObject: function(id){
			delete this.objects[id];
		},
		stringify: function(){
			return JSON.stringify(this, jo.Object.replacer);
		}

	});
	jo.Object.replacer = function(key, value) {
	    if(key === 'objects'){
	    	return  '';
	    }
	    
	    return value;
	};
	jo.Object.revive = function(key, value){
		if(typeof value !== 'undefined' && typeof value.joObject !== 'undefined'){
			var obj = new jo[value.joObject](value.options);
			value = obj;//.adapt(value, true, false);			
			return obj;
		}
		if(typeof value!== 'undefined'){
	    	if(value.isPoint){
	    		return (new jo.Point().copy(value));
	    	}
	    	
	    }
		return value;
	};
	jo.Object.parse = function(text){
		return JSON.parse(text, jo.Object.revive);
	};

});