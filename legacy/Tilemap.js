define([ './jo', './core', './system', './Grid', './Point', './Tile', 'TileSet', 'Camera' ], 

	function(jo, core, system, Grid, Point, Tile, TileSet, Camera) {
	
	/**
	 * @class holds Level data 
	 * @extends jo.Grid
	 */
	jo.Tilemap = Grid.extend(
		/**
		 * @lends jo.Tilemap
		 */	
		{
		/**
		 * @constructs
		 * @param options
		 * @param width
		 * @param height
		 */
		init : function(tileSet, width, height, data) {
			this._super(width, height);
			
			this.tileSet = tileSet;
			this.clearTo({index : 0	});
			
			if(typeof data !== 'undefined'){
				this.data = data;
			}
		},
		/**
		 * update animations
		 * @param ticks
		 */
		update : function(ticks) {
			this.tileSet.update(ticks);
		},
		/**
		 * draws the level, will not crop tiles that go over the border of options.frame
		 * @param options
		 * @param position
		 * @param surface
		 * @see jo.Sprite.draw
		 */
		draw : function(options, position, surface) {
			var tw = this.tileSet.width,
				th = this.tileSet.height;
			
			var frame = {x: 0, y: 0, width: surface.width, height: surface.height};
			if(typeof options.frame !== undefined){
				frame = options.frame;
			}

			var tileOff = new Point(frame.x / tw, frame.y / th);
			
			tileOff.x = Math.floor(Math.max(0, off.x));
			tileOff.y = Math.floor(Math.max(0, off.y));

			var width = Math.min(Math.ceil(frame.width / tw + 1), this.width - tileOff.x),
			height = Math.min(Math.ceil(frame.height / th + 1), this.height - tileOff.y);

			for ( var i = tileOff.x; i < tileOff.x + width; i++) {
				for ( var j = tileOff.y; j < tileOff.y + height; j++) {
					var pos = new Point(i * tw, j * th);
					pos = pos.add(position).subtract(frame);
					this.tileSet.draw({tile : this.get(i, j).index }, pos, surface);

				}
			}
		},
		/**
		 * return an opject containing tile information
		 * @param x {Number}
		 * @param y {Number}
		 * @returns {pos: {jo.Point}, 
		 * width: {Number}, 
		 * height: {Number}, 
		 * index: {Number},
		 * anim: {jo.Animation}}
		 */
		getTile : function(x, y) {
			var tw = this.tileSet.width,
			th = this.tileSet.height;
			return {
				pos : new Point(x * tw, y * th),
				width : tw,
				height : th,
				index : this.get(x, y).index,
				anim : this.tileSet.tiles[this.get(x, y).index]
			};
		}
	});
	return Level;
});