/**
 * @name jo
 * @namespace the namespace of the the jomoho library
 */

define(['./Class', './Mersenne'],function(Class, Mersenne){
	return {
		/**
		 * @constant 
		 * @description version string
		 */
		version: '0.1 alpha',
		
		Class: Class,
		
		Mersenne: Mersenne,
		
		/**
		 * logs into the console if available
		 * @param what
		 */
		log : function(what) {
			if (typeof (console) !== 'undefined') {
				console.log(what);
			}
		},
		/**
		 * 
		 * @param r
		 * @param g
		 * @param b
		 * @param a
		 * @returns {String}
		 */
		color : function(r, g, b, a){
			r = Math.floor(r);
			g = Math.floor(g);
			b = Math.floor(b);
			

			if (typeof (a) === 'undefined'){
				return 'rgb(' + r + ',' + g + ',' + b + ')';
			} else {
				a = Math.floor(a);
				return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
			}
		},
		/**
		 * maps an index of range a to b to an index of x to y
		 * @param i
		 * @param a
		 * @param b
		 * @param x
		 * @param y
		 * @returns
		 */
		mapto : function(i, a, b, x, y) {
			var l1 = b - a;
			var l2 = y - x;

			return (((i - a) / l1) * l2) + x;
		},
		/**
		 * takes a member name string and returns a comparison function, to be used with array.sort
		 * @param name
		 * @returns
		 */
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
		/**
		 * binds fn to an object
		 * @param {Function} fn
		 * @param object
		 * @returns {Function}
		 */
		bind: function(fn, obj){
			return function() {
				fn.apply(obj, arguments);
			};
		},
		/**
		 * returns true if set contains element
		 * @param {Array} set
		 * @param element
		 * @returns {Boolean}
		 */
		includes: function(set, element) {

			for ( var i = 0; i < set.length; i++) {
				if (set[i] === element) {
					return true;
				}
			}
			return false;		
		}
	};
	
});