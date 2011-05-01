define([ './jo', './Grid', './Point', './Tile', './TileSet', './Camera' ], 

	function(jo, Grid, Point, Tile, TileSet, Camera) {
	
	/**
	 * @class holds Level data 
	 * @augments jo.Grid
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
			this.clearTo({index : -1	});
			
			if(data){
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
			if(typeof options.frame !== 'undefined'){
				frame = options.frame;
			}
			
			var con = this.convertFrame(frame);
			for ( var i = con.x; i < con.x + con.width; i++) {
				for ( var j = con.y; j < con.y + con.height; j++) {
					var index = this.get(i, j).index;
					if(index >= 0){
						var pos = new Point(i * tw, j * th);
						pos = pos.add(position).subtract(frame);
						this.tileSet.draw({tile: index}, pos, surface);	
					}
				}
			}
			
		},
		/**
		 * return an object containing tile information
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
		},
		
		getIntersection: function(frame){
			var inter = [];
			var con = this.convertFrame(frame);
			for ( var i = con.x; i < con.x + con.width; i++) {
				for ( var j = con.y; j < con.y + con.height; j++) {
					inter.push(this.getTile(i, j));
				}
			}
			return inter;
		},
		convertFrame : function(frame){
			var con = new Point(0,0);
			
			var tw = this.tileSet.width,
			th = this.tileSet.height;

			var tileOff = new Point(frame.x / tw, frame.y / th);
		
			con.x = Math.floor(Math.max(0, tileOff.x));
			con.y = Math.floor(Math.max(0, tileOff.y));

			con.width = Math.min(Math.ceil(frame.width / tw + 1), this.width - tileOff.x),
			con.height = Math.min(Math.ceil(frame.height / th + 1), this.height - tileOff.y);	
			
			return con;
		},
		forFrame: function(frame, fn){
			var con = this.convertFrame(frame);
			for ( var i = con.x; i < con.x + con.width; i++) {
				for ( var j = con.y; j < con.y + con.height; j++) {
					return fn(i, j);
				}
			}
		}
	});
	return jo.Tilemap;
});