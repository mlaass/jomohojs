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
			this._super(opt);
			this.width = opt.width || 16;
			this.height = opt.height ||16;
			this.data = [];
			for( var i = 0; i < this.width * this.height; i++) {
				this.data.push(0);
			}
		},
		_clearTo : function(value) {
			for ( var i = 0; i < this.width * this.height; i++) {
				this.data[i] = value;
			}
		},
		_blit : function(grid, x, y, width, height) {
			if (typeof width === 'undefined') {
				var width = grid.width;
			}
			if (typeof height === 'undefined') {
				var height = grid.height;
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
		put : function(x, y, value) {
			this._put(x, y, value);
		},
		_copy: function(frame){
			if(typeof frame === 'undefined'){
				frame= {};
			}
			frame.x = frame.x || 0;
			frame.y = frame.y || 0;
			frame.width = frame.width || this.width;
			frame.height = frame.height || this.height;
			
			frame.x = Math.max(0,frame.x);
			frame.y = Math.max(0,frame.y);
			frame.width = Math.max(this.width,frame.width);
			frame.height = Math.max(this.height,frame.height);
			
			copy = new jo.Grid(frame.width, frame.height);
			
			for(var i = 0; i< frame.height; i++){
				for(var j = 0; j< frame.width; j++){
					copy.put(j,i,this.get(frame.x + j, frame.y + i));
				}
			}
			return copy;
		},
		shift: function(x, y, clear){
			var copy = this._copy();
			if(typeof clear !== 'undefined'){
				this._clearTo(clear);
			}
			this._blit(copy,x,y);
		}, 
		resize: function(width, height, clear){
			var copy = this._copy();
			this.width= width;
			this.height = height;
			this.data=[];
			for( var i = 0; i < this.width * this.height; i++) {
				this.data.push(0);
			}
			if(typeof clear !== 'undefined'){
				this._clearTo(clear);
			}
			this._blit(copy,0,0);
		}
	});
	return jo.Grid;
});