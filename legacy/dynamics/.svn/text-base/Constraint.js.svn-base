/**
 * 
 */

define(["../core", "../Point"],function(core, Point){
	
	var Constraint= core.Class.extend({		
		init: function(p1, p2, len, soft){
			this.a=p1;
			this.b=p2;
			this.length = len;
			this.soft=1;
			if(soft && soft<1){
				this.soft=soft;
			}
		},
		solve: function(p1, p2){
			if(typeof(p1)==="undefined" || typeof(p2)==="undefined"){
				return ;
			}
			//d = b-a;
			var d = p2.p.dif(p1.p);
			
			var len = d.length();
			var dif =  (this.length- len)/len;
			
			p1.p.subtract( d.mul(0.5*this.soft*dif));
			p2.p.add( d.mul(0.5*this.soft*dif));	
		}
		
	});
	return Constraint;	
});