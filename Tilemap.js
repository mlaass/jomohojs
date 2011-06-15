define([ './jo', './Grid', './Point', './Tile', './TileSet', './Camera' ], 

	function(jo, Grid, Point, Tile, TileSet, Camera) {
	
	/**
	 * @class holds Level data 
	 * @augments jo.Grid
	 */
	jo.TileMap = Grid.extend(
		/**
		 * @lends jo.Tilemap
		 */	
		{
			joObject: 'TileMap',
		/**
		 * @constructs
		 * @param options
		 * @param width
		 * @param height
		 */
		init : function(tileSet, width, height, data) {
			this._super(width, height);
			
			this.tileSet = tileSet;
			this._clearTo({index : -1	});
			
			if(data && data.length === this.data.length){
				this.data = data;
			}
		},
		/**
		 * update animations
		 * @param ticks
		 */
		update : function(ticks) {
			this._super(ticks);
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
			
			var frame = {x: jo.game.cam.x, y: jo.game.cam.y, width: surface.width, height: surface.height};
			if(typeof options.frame !== 'undefined'){
				frame = options.frame;
			}
			
			var con = this.convertFrame(frame);
			
			for(var i = con.y; i < con.y + con.height; i++) {
				for(var j = con.x; j < con.x + con.width; j++) {
					var index = this.get(j, i).index;
					var pos = new Point(j * tw, i * th);
					pos = pos.add(position);
					var p = jo.game.cam.toScreen(pos);
					if(index >= 0){
						this.tileSet.draw({tile: index}, p, surface);						
					}
					if(options.grid){
						surface.rect({fill:0, stroke: '#ccc'}, p, tw,th);
					}
				}
			}
			this._super();
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
		getFrame: function(){
			return {x: 0, y: 0, width: this.width*this.tileSet.width, height: this.height*this.tileSet.height};
		},
		
		getIntersection: function(frame){
			var inter = [];
			var con = this.convertFrame(frame);
			for ( var i = con.y; i < con.y + con.height; i++) {
				for ( var j = con.x; j < con.x + con.width; j++) {
					inter.push(this.getTile(j, i));
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

			con.width = Math.min(Math.ceil(frame.width / tw + 1), this.width - con.x),
			con.height = Math.min(Math.ceil(frame.height / th + 1), this.height - con.y);	
			
			return con;
		},
		forFrame: function(frame, fn){
			var con = this.convertFrame(frame);
			for ( var i = con.x; i < con.x + con.width; i++) {
				for ( var j = con.y; j < con.y + con.height; j++) {
						fn(i, j, this.getTile(i,j));
				}
			}
		},
		find: function(index){
			for(var i=0; i< this.width; i++){
				for(var j =0; j< this.height; j++){
					if(this.get(i,j).index==index){
						return this.getTile(i,j);
					}
				}
			}
		}
	});
	return jo.TileMap;
});