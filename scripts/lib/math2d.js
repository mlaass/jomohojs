define(['./jo', './Point'], function(jo, Point){
	 
	jo.math2d = {
			Point: Point,
			Circle: function(center, radius){
				this.x = center.x;
				this.y = center.y;
				this.radius = radius;
			},
			Box: function(topleft, width, height){
				this.x = topleft.x;
				this.y = topleft.y;
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
					var a_right = a.x + a.width,
						a_bottom = a.y + a.height,
						b_right = b2.x + b2.width,
						b_bottom = b2.y + b2.height;
					
					if(a_right > b2.x || b_right < a.x)
						return false;
					if(a_bottom < b2.y || b_bottom < a.y)
						return false;
					
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
				boxPolygon: function(box, polygon){
					return jo.math2d.intersect.polygonPolygon(
							[new Point(box.x, box.y),
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
	
	return return jo.math2d;
});