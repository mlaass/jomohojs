
define(['./jo', './Class' ], function(jo, Class){	
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
		 * @constructor
		 * all jo Objects take just one options argument with the constructor for easy serialisation
		 */
		init : function(options){
			this.options = options;
			this.obj = {};
			this.joObject = this.joObject;
			this.call={};
			
		},
		hasCall: function(name){
			return typeof this.call[name] === 'function';
		},
		/**
		 * adds a callback with a given name, overwrites existing ones with the same name
		 * @param name
		 * @param fn
		 */
		addCall: function(name, fn){
			if(typeof fn !== 'function'){
				throw 'expecting a function';
			}
			this.call[name] = fn;
		},
		removeCall: function(name){
			if(typeof this.call[name] !== 'undefined'){
				this.call[name]= undefined;		
			}
		},
		applyCall: function(name, args ){
			if(typeof this.call[name] === 'function'){
				this.call[name].apply(this, args);			
			}
		},
		draw: function(options, position, surface){
			for(var i in this.obj){
				this.obj[i].draw(options, position, surface);
			}
		},
		update: function(time){
			for(var i in this.obj){
				this.obj[i].update(time);
			}
		},
		addObject: function(name, obj){
			if(typeof this.obj[name] === 'undefined'){
				obj._parent = this;
				obj._name = name;
				this.obj[name] = obj;
			}else {
				this.obj[name].addObject(name, obj);
			}
		},
		getObject: function(id){
			return this.obj[id];
		},
		removeObject: function(name){
			delete this.obj[name];
			this.obj[name] = undefined;
		},
		removeAllObjects: function(){
			this.obj = {};
		},
		
		stringify: function(filter){
			return JSON.stringify(this, filter || jo.Object.replacer);
		},
		_postParse: function(){
			for(var i in this.obj){
				this.obj[i]._name = i;
				this.obj[i]._parent=this;
			}
		}
	});
	jo.Object.replacer = function(key, value) {
		if(key === '_parent'){
			value = key;
		}	    
	    return value;
	};
	jo.Object.revive = function(key, value){
		var val = 0;
		if(value && value.joObject ){
			val = new jo[value.joObject](value.options);
			val.adapt(value, true);
			value = val;
			jo.log(val);
			return val;
		}
		if(value){
	    	if(value.isPoint){
	    		return (new jo.Point().copy(value));
	    	}
	    }
		return value;
	};
	jo.Object.parse = function(text){
		var obj = JSON.parse(text, jo.Object.revive);
		obj._postParse();
		return obj;
	};
	return jo.Object;
});