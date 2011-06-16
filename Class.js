/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype



define( function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  /**
   * @class Base Class, featuring inheritance
   */
  var Class = function(){};
 
  // Create a new Class that inherits from this class
  /**
   * extending is really easy
   */
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);       
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    /**
     * copies all the members of obj into the class
     * @param obj the object which holds the variables we want to adapt
     * @param recoursive true if we want to copy recoursively into Objects. default: false
     * @param func true if we want to copy functions. default: false
     */
    Class.prototype.adapt = function(obj, recursive, func){    	
    	var adaptAtoB = function(a, b, recursive, func){
    		for ( var name in a){
    			if(recursive === true && a[name] instanceof Array){
    				b[name] = [];
    				for(var i in a[name]){
    					b[name].push(a[name][i]);
    					adaptAtoB(b[name][i], a[name][i], recursive, func);
    				}
    			}else if(recursive === true && typeof a[name] === 'object'){ 
        			b[name]={};
        			adaptAtoB(a[name], b[name], recursive, func);
        		}else if( func === true || typeof a[name] !== 'function' ){
        			b[name] = a[name];
        		}      		
        	}
    	};
    	
    	if(typeof obj === 'object'){
    		adaptAtoB(obj, this, recursive, func);
    	}    	    	
    };
    
    return Class;
  };

  return Class;
});