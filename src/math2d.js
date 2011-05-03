define(['./jo', './Point'], function(jo, Point){
	 
	jo.math2d = {
			Point: Point,
			Circle: function(center, radius){
				this.x = center.x;
				this.y = center.y;
				this.radius = radius;
			},
			Box: function(topleft, width, height){
				this.pos.copy(topleft);
				this.width = width;
				this.height = height;
			},
			Polygon: function(points){
				this.points = points;
				this.lines = [];
				for(var i = 0; i< points.length-1; i++){
					this.lines.push(new jo.math2d.Line(points[i], points[i+1]));
				}
				this.lines.push(new jo.math2d.Line(points[points.length-1], points[0]));
			},
			Line: function(a, b){
				this.a = a.clone();				
				this.b = b.clone();
				this.direction = function(){
					return a.dif(b);
				};
			},
			intersect: {				
				circleCircle: function (a, b){
					return (a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y) < Math.pow(a.radius+b.radius,2);
				},
				pointCircle: function(point, circle){
					return Math.pow(point.x-circle.x, 2)+Math.pow(point.y-circle.y, 2) <= Math.pow(circle.radius,2);
				},
				boxBox: function(a, b){
					var a_right = a.pos.x + a.width,
						a_bottom = a.pos.y + a.height,
						b_right = b.pos.x + b.width,
						b_bottom = b.pos.y + b.height;
					
					if(a_right < b.pos.x || b_right < a.pos.x)
						return false;
					if(a_bottom < b.pos.y || b_bottom < a.pos.y)
						return false;
					
					
					/*
					if( a_right > b.pos.x && a.pos.x < b_right){ 		//vertical voronois
						
						if(a.pos.y < b.pos.y ){					//above
							return {dir: 'top', depth: a_bottom - b.pos.y};
						}else if(a.pos.y > b_bottom ){			//below
							return {dir: 'bottom', depth:(b_bottom)- (a.pos.y)};
						}
					}else if( a_bottom > b.pos.y && a.pos.y < b_bottom){//horizontal voronois
						
						if(a.pos.x < b.pos.x ){					//left
							return {dir:'left',depth: a_right - b.pos.x};
						}else if(a.pos.x > b_right ){			//right
							return {dir:'right',depth:(b_right) - (a.pos.x)};
						}						
					}*/
					return true;
					
				},
				lineLine: function(line1, line2){
					
				},
				lineCircle: function(line, circle){
					
				},
				polygonPolygon: function(a, b){
					
				},
				polygonCircle: function(polygon, circle){
					
				},
				/**todo*/
				boxPolygon: function(box, polygon){
					return jo.math2d.intersect.polygonPolygon(
							[new Point(box.pos.x, box.y),
					         new Point(box.x + box.width, box.y),
					         new Point(box.x + box.width, box.y + box.height) ,
					         new Point(box.x, box.y + box.height)], polygon);
				},
				boxCircle: function(box, circle){
					return jo.math2d.intersect.polygonCircle(
							[new Point(box.x, box.y),
					         new Point(box.x + box.width, box.y),
					         new Point(box.x + box.width, box.y + box.height) ,
					         new Point(box.x, box.y + box.height)], circle);
				}
				
			}
	};
	
	return jo.math2d;
});