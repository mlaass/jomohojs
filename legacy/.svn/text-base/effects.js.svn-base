/**
 * is a factory to assemble effects
 * this is to be updated
 */

define(["./core", "./system", "./Entity/Effect"],function(core, sys, Effect){
	var white= {r:255,g:255,b:255,a:1};
	var transparent= {r:255,g:255,b:255,a:0};
	return {
		
		ping: function(pos){
			var e= new Effect("ping", pos, true);
			e.parts.push(new Effect.Circular(pos, {r:0,g:64,b:64, a:0.2}, {r:255,g:255,b:255, a: 1}, 800, 0, 30, false));
			return e;
		},
		
		found: function(pos, radius){			
			var e= new Effect("found", pos, true);
			e.parts.push(new Effect.Circular(pos, {r:25,g:255,b:25}, {r:255,g:255,b:255}, 800, radius, radius+30, false));
			return e;
		},
		
		splode: function(pos, radius){			
			var e= new Effect("splode", pos,true);
			e.parts.push(new Effect.Circular(pos, {r:255,g:255,b:16, a:1.0}, {r:255,g:64,b:0, a:0.0}, 600, radius, radius+60, true));
			return e;
		}
	
	};
});