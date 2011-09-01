/**
 * Grid holds arbitrary data in a 2d grid
 * and delivers methods of manipulation
 */

define([ './jo', './Object'], function(jo, Object) {

	jo.Grid = jo.Object.extend({
		/**
		 * 
		 * @param opt
		 * 	width and height needed
		 */
		init : function(opt) {
			opt = opt || {};
			this._super(opt);
			this.width = opt.width || 16;
			this.height = opt.height ||16;
			this.data = [];
			for( var i = 0; i < this.width * this.height; i++) {
				this.data.push(0);
			}
		},
		clearTo : function(value) {
			for ( var i = 0; i < this.width * this.height; i++) {
				this.data[i] = value;
			}
		},
		blit : function(grid, x, y, width, height) {
			if (typeof width === 'undefined') {
				width = grid.width;
			}
			if (typeof height === 'undefined') {
				height = grid.height;
			}

			width = Math.min(width, this.width - x);
			height = Math.min(height, this.height - y);
			for (var i = 0; i < height; i++) {
				for (var j = 0; j < width; j++) {
					this._put(x+j, y+i, grid.get(j,i));
				}
			}
		},
		get : function(x, y) {
			if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
				return this.data[x + y * this.width];
			}
			jo.log('grid.get out of bounds: ' + x + ' | ' + y);
		},
		
		_put : function(x, y, value) {
			if(x >= 0 && x < this.width && y >= 0 && y < this.height){
				this.data[y * this.width + x] = value;
			}			
		},
		put: function(x, y, value) {
			this._put(x,y,value);			
		},
		copy: function(){			
			copy = new jo.Grid({width: this.width, height: this.height});
			
			for(var i = 0; i< this.height; i++){
				for(var j = 0; j< this.width; j++){
					copy._put(j,i,this.get(j, i));
				}
			}
			return copy;
		},
		shift: function(x, y, clear){
			var copy = this.copy();
			if(typeof clear !== 'undefined'){
				this.clearTo(clear);
			}
			this.blit(copy,x,y);
		}, 
		resize: function(width, height, clear){
			var copy = this.copy();
			this.width= width;
			this.height = height;
			this.data=[];
			for( var i = 0; i < this.width * this.height; i++) {
				this.data.push(clear);
			}

			this.blit(copy,0,0);
		}
	});
	return jo.Grid;
});