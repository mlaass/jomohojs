/**
 * 
 */

define(['../core', 
        '../system', 
        '../dynamics/collision', 
        '../Point', 
        './Widget'],
		function(core, sys,Point, Widget){
	
	var Button= Widget.extend({
		clickfn: null,
		hoverfn: null,
		hover: false,
		fill: screen.color(0,200,160),
		stroke: screen.color(200,200,200),
		
		init: function(p, text, w, h){
			this._super(p,text);
			this.width=w;
			this.height=h;
		},
		draw: function(){
			screen.stroke= this.stroke;
			screen.fill= this.fill;
			sys.screen.rect(this.p.x,this.p.y, this.width, this.height);
			
			var p= new Point(this.p.x,this.p.y);
			
			this.p.x+= this.width/2;
			this.p.y+= this.height/2;
			
			this._super();
			
			this.p= p;
		},
		update: function(ticks){
			if(boxPoint(this.p, this.width, this.height, sys.input.mouse)){
				if(input.key[input.mouse1]){
					if(this.clickfn){
						this.clickfn();
					}
				}
				else{
					if(this.hoverfn){
						this.hoverfn();
					}
				}
			}
		},
		onClick: function(fn){
			this.clickfn= fn;
		},
		onHover: function(fn){
			this.hoverfn= fn;
		}
	});
	return Button;
});