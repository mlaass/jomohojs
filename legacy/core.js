/**
 * Core JavaScript Enhancements could prove to be awfully incompatible with
 * other libraries so they maybe should be implemented in some other way.
 */
/*
// array as set
Array.prototype.has = function(element) {
	for ( var i = 0; i < this.length; i++) {
		if (this[i] === element) {
			return true;
		}
	}
	return false;
};

// bind pattern bind a function to a certain object
Function.prototype.bind = function(obj) {
	var func = this;
	return function() {
		func.apply(obj, arguments);
	};
};
*/

// core object for logging and stuff like that
define([ './core/Class', './core/mersenne' ], function(Class, Mersenne) {
	var mersenne = new Mersenne();
	var core = {
		random : mersenne.random,
		seed : mersenne.seed,
		Class : Class,
		// logging into the firebug console
		log : function(txt) {
			if (typeof (console) !== 'undefined') {
				console.log(txt);
			}
		},
		// maps an index of range a to b to an index of x to y
		mapto : function(i, a, b, x, y) {
			var l1 = b - a;
			var l2 = y - x;

			return (((i - a) / l1) * l2) + x;
		},
		// maps an index of range a to b to an index of x to y
		mapto2 : function(i, a, b, x, y) {
			var l1 = b - a;
			var l2 = y - x;

			return (((i - a) / l1) * l2) + x;
		},
		// takes a member name string and returns
		// a comparison function, to be used with array.sort
		// Douglas Crockford in "JavaScript: The good parts"
		sortby : function(name) {
			return function(o, p) {
				var a, b;
				if (typeof o === 'object' && typeof p === 'object' && o && p) {
					a = o[name];
					b = p[name];
					if (a === b) {
						return 0;
					}
					if (typeof a === typeof b) {
						return a < b ? -1 : 1;
					}
					return typeof a < typeof b ? -1 : 1;
				} else {
					throw {
						name : 'Error',
						message : 'Expected an object when sorting by ' + name
					};
				}
			};
		},
		bind: function(fn, obj){
			return function() {
				fn.apply(obj, arguments);
			};
		},
		has: function(set, element) {

			for ( var i = 0; i < set.length; i++) {
				if (set[i] === element) {
					return true;
				}
			}
			return false;		
		}
	};
	
	return core;
});