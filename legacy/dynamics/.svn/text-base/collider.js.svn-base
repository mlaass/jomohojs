/**
 * collider is a collection of collision related functions
 * 
 */
define(['../core', '../Point', './Collision'], function(core, Point, Collision){
	return {
		dir:{
			top: new Point(0, -1),
			bottom: new Point(0, 1), 
			left: new Point(-1, 0),
			right: new Point(1, 0),
			topleft: (new Point(-1, -1)).normalize(),
			topright: (new Point(1, -1)).normalize(),
			bottomleft: (new Point(-1, 1)).normalize(),
			bottomright: (new Point(1, 1)).normalize()
			},
			
		circleIntersect: function(c1, r1, c2, r2){
			var d= c1.dif(c2);
			var dl= (r1+r2)*(r1+r2)-d.lengthSqr();
			return dl > 0 ? d: false;
		},
		circles: function(p1, p2){
			if(this.circleIntersect(p1.p, p1.r, p2.p,p2.r)){
				return new Collision(p1, p2, 0);
			} else {
				return null;
			}			
		},
		circlesMoving: function(p1, p2){
			var d1 = p1.v(), d2 = p2.v(),
				rs = p1.r + p2.r;
			rs = rs*rs;			
			
			//quadratic equation: alpha*t^2 + beta*t + gamma = 0			
			
			//  alpha = |d1|^2 + |d2|^2 + 2 * d1 . d2
			var alpha = d1.lengthSqr()+ d2.lengthSqr() - 2*(d1.dot(d2));			
			//  beta = 2 * (p1.d1 - p1.d2 + p2.d2 - p2.d1)
			var beta = 2 * (p1.lp.dot(d1) - p1.lp.dot(d2) + p2.lp.dot(d2) - p2.lp.dot(d1));
			//  gamma = |p2 - p1|^2 - (r1 + r2)^2
			var gamma = (p2.lp.dif(p1.lp)).lengthSqr() - rs;
			
			//t1/t2 = (-beta +- sqrt(beta^2 - 4*alpha*gamma))/(2*alpha)
			
			var subroot = beta*beta - 4*alpha*gamma;
			
			if(subroot < 0){
				return this.circles(p1,p2);
			}else{
				var root = Math.sqrt(subroot);
				
				var t1 = (-beta + root) / (2 * alpha);
				var t2 = (-beta - root) / (2 * alpha);
				
				var realt = Math.min(t1,t2);
				
				if(realt >= 0 && realt <= 1){
					//core.log("t1: "+t1+"  t2: "+t2);
					return new Collision(p1, p2, realt);
				} else {
					return this.circles(p1, p2);
				}			
			}
		},		
		boxbox: function(b1, b2){			
			var r1 = b1.x + b1.w,
				b1 = b1.y + b1.h,
				r2 = b2.x + b2.w,
				b2 = b2.y + b2.h;
			
			if(r1 > b2.x || r2 < b1.x)
				return false;
			if(b1 < b2.y || b2 < b1.y)
				return false;
			
			return true;
		},
		circleBox: function(c, r, p, w, h){		
			if( c.x > p.x && c.x < p.x+w){ 		//vertical voronois
				
				if(c.y < p.y ){					//above
					return c.y+r >= p.y? {dir: 'top', depth: c.y+r - p.y}: false;
				}else if(c.y > p.y+h ){			//below
					return c.y-r <= p.y+h? {dir: 'bottom',depth:(p.y+h)- (c.y-r)} : false;
				}
			}else if( c.y > p.y && c.y < p.y+h){//horizontal voronois
				
				if(c.x < p.x ){					//left
					return c.x+r >= p.x? {dir:'left',depth: c.x+r - p.x} : false;;
				}else if(c.x > p.x+w ){			//right
					return c.x-r <= p.x+w? {dir:'right',depth:(p.x+w) - (c.x-r)} : false;;
				}
				
			}else{								//nearest point test
				var direction= false, 
					corner= null;
				
				if(c.x < p.x && c.y < p.y){		//top left
					corner= new Point(p.x, p.y);			
					direction= 'topleft';
				}
				if(c.x > p.x+w && c.y < p.y){	//top right	
					corner= new Point(p.x+w, p.y);	
					direction='topright';
				}
				if(c.x < p.x && c.y > p.y+h){	//bottom left
					corner= new Point(p.x, p.y+h);	
					direction= 'bottomleft';
				}
				if(c.x > p.x+w && c.y > p.y+h){	//bottom right
					corner= new Point(p.x+w, p.y+h);	
					direction= 'bottomright';
				}	
				
				if(direction && corner){
					var d= c.dif(corner);
					var ls= d.lengthSqr();
					
					return ls <= r*r ? {dir: direction , depth: r-Math.sqrt(ls)} : false;
				}
			}
			//point is inside
			return this.boxPoint(p,w,h,c)? {dir: 'inside', depth: c.y-p.y} : false;	
		},
		circlePoint: function(c, r, p){
			var d= c.dif(p);
			return d.lengthSqr()<= r*r;
		},
		boxPoint: function(t, w, h, p){
			return (p.x > t.x && p.x < t.x+w) && (p.y > t.y && p.y < t.y+h) ; 
		},
		
		particleTile: function(part, tile){
			//var c= null;
			//var p= new Point(part.p.x, part.p.y);			
			c = this.circleBox(part.p, part.r, tile.p, tile.w, tile.h);				
			return c;
		}
	};
});