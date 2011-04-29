/**
 * @name jo
 * @namespace the namespace of the the jomoho library
 */

define(['./core', './system'],function(core, sys){
	return {
		/**
		 * @constant 
		 * @description version string
		 */
		version: '0.1 alpha',
		core: core,
		system: sys
	};
	
});