/**
 * Grid holds arbitrary data in a 2d grid
 */

define([ './jo'], function(jo) {

	var Grid = jo.Class.extend({
		init : function(width, height) {
			this.width = width;
			this.height = height;
			this.data = [];
			for ( var i = 0; i < this.width * this.height; i++) {
				this.data.push(0);
			}
		},
		clearTo : function(value) {
			for ( var i = 0; i < this.width * this.height; i++) {
				this.data[i] = value;
			}
		},
		blit : function(grid, x, y, width, height) {
			if (typeof (width) == 'undefined') {
				w = grid.width;
			}
			if (typeof (height) == 'undefined') {
				height = grid.height;
			}

			width = Math.max(width, this.width - x);
			height = Math.max(height, this.height - y);
			for (var i = 0; i < width; i++) {
				for (var j = 0; j < height; j++) {
					this.data[(y + j) * this.width + x + i] 
							= grid.data[j * grid.width + i];
				}
			}
		},
		get : function(x, y) {
			if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
				return this.data[x + y * this.width];
			}
			jo.log('grid.get out of bounds: ' + x + ' | ' + y);
			return 'out of bounds';

		},
		put : function(x, y, value) {
			this.data[y * this.width + x] = value;
		}
	});

	return Grid;
});