
define(['./jo', 
        './Tile',
        './Animation'],
        function(jo, Tile, Animation){
	/**
	 * @class takes care of Tiles, they can be single frames or looping animations
	 */
	jo.TileSet = jo.Class.extend(
		/**
		 * @lends jo.TileSet.prototype
		 */
		{
		tiles: [],
		/**
		 * @constructs
		 * takes an array of tile definitions can be indexes or or animation arrays
		 * @param tiles
		 * @param width
		 * @param height
		 * @param sprite
		 * @see jo.Animation
		 */
		init: function(tiles, width, height, sprite){
			this.width = width;
			this.height = height;
			this.sprite = sprite;
			this.tiles = this.readTiles(tiles);
		},
		/**
		 * reads the tiles array
		 * @param tiles
		 * @returns transformed tiles array
		 */
		readTiles: function(tiles){
			if(typeof tiles === 'undefined'){
				tiles = [];
			}
			if(typeof tiles.length !== 'undefined'){
				for(var i=0; i< tiles.length; i++){
					//A Tile can be an Animation	
					if(typeof tiles[i] === 'object'){
						tiles[i] = new Animation(tiles[i], this.width, this.height, this.sprite);
						
					}else{//or just a single Frame.
						tiles[i] = new Animation([{i: tiles[i], t: 200}], this.width, this.height, this.sprite);
					}				
				}
			}
			return tiles;
		},
		push: function(tile){
			
		},
		/**
		 * advances the tile animations
		 * @param ticks
		 */
		update: function(ticks){
			for(var i=0; i< this.tiles.length; i++){
				this.tiles[i].update(ticks);
			}
		},
		/**
		 * draws a tile specified by options.tile
		 * @param options
		 * @param position
		 * @param surface
		 * @see jo.Sprite.draw jo.Animation.draw
		 */
		draw: function(options, position, surface){
			if(typeof options.tile !== 'number'){
				options.tile = 0;
			}
			this.tiles[options.tile].draw(options, position, surface);
		}
	});
	return TileSet;
});