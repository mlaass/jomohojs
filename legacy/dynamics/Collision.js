/**
*Collision stores and computes a single collision
*between two circular Particles
*lifetime: one Frame
*/

define(['../core', '../Point'], function(core, Point){
	
	var Collision = core.Class.extend({		
		soft: 1, //softness when overlapping gets relaxed
		init: function(p1, p2, t){
			this.a = p1;
			this.b = p2;
			this.t = t;
		},
		apply: function(ticks){		
			if(this.t !== 0){			
				//get the speed of the particle				
				var va = this.a.v(),
					vb = this.b.v();
				
				//changing the position
				if(!this.a.isStatic){
					this.a.p = this.a.lp.sum(va.mul(this.t));
				}
				if(!this.b.isStatic){
					this.b.p = this.b.lp.sum(vb.mul(this.t));
				}
				
				//save them for relaxing later
				this.ap = this.a.p.getCopy();
				this.bp = this.b.p.getCopy();
				
				//calculate and normalize the normal
				var normal = this.b.p.dif(this.a.p);
				this.distance= normal.length();
				normal.divide(this.distance);
				
				//tangent from normal
				var tangent = normal.rightNormal();
				
				//normal speeds, tangential speeds and masses
				var va_n = va.dot(normal), vb_n = vb.dot(normal),
					va_t = va.dot(tangent), vb_t = vb.dot(tangent),
					ma = this.a.mass, mb= this.b.mass;
				
				//the impulse http://de.wikipedia.org/wiki/Sto%C3%9F_%28Physik%29
				var imp_a = ma*va_n+mb*(2*vb_n-va_n)/(ma+mb) ;
				var imp_b = mb*vb_n+ma*(2*va_n-vb_n)/(ma+mb);
				
				//the new speed
				va = (normal.mul(imp_a * this.a.bounce)).add( tangent.mul(va_t*this.a.friction));
				vb = (normal.mul(imp_b * this.b.bounce)).add( tangent.mul(vb_t*this.b.friction));				
				
				//adding the speed to the particles	
				var dtime = ticks / 100;	
				
				if(!this.a.isStatic){
					this.a.lp = this.a.p.dif(va);
					va.multiply(dtime * dtime);
					this.a.a.add(va);
				}
				if(!this.b.isStatic){
					this.b.lp = this.b.p.dif(vb);
					vb.multiply(dtime * dtime);
					this.b.a.add(vb);
				}
				this.applyRotation(va_n, va_t, vb_n, vb_t);
			}
		},
		applyRotation: function(va_n, va_t, vb_n, vb_t){
			
			if(typeof this.a.angle != 'undefined'){
				var angv_a = this.a.friction * vb_t / this.a.r;
				var imp = angv_a;
				this.a.addRotation(-angv_a);
			}
			
			if(typeof this.b.angle != 'undefined'){
				var angv_b = this.b.friction  *va_t / this.b.r;
				this.b.addRotation(-angv_b);
			}
		},
		//relax works like constraint.solve() and is used to
		// just separate two particles that intersect
		relax: function(){
			//distance
			var d = this.b.p.dif(this.a.p);			
			
			var len = d.length();			
			
			var dif = ((this.a.r+this.b.r)- len);
			if(dif > 0.01){
				dif= dif/len;				
				if(this.a.isStatic){
					this.b.p.add( d.mul(0.99*this.soft*dif));	
				} else if(this.b.isStatic){
					this.a.p.subtract( d.mul(0.99*this.soft*dif));
				} else {
					this.a.p.subtract( d.mul(0.5*this.soft*dif));
					this.b.p.add( d.mul(0.5*this.soft*dif));		
				}
			}

		}
	});
	return Collision;	
});