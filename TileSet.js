
define(['./jo',
        './Class',
        './Tile',
        './Animation'],
        function(jo, Class, Tile, Animation){
	/**
	 * @class takes care of Tiles, they can be single frames or looping animations
	 */
	jo.TileSet = jo.Object.extend(
		/**
		 * @lends jo.TileSet.prototype
		 */
		{
		tiles: [],
		/**
		 * @constructs 
		 * @param tiles an array of tile definitions can be indexes or or animation arrays
		 * @param width
		 * @param height
		 * @param sprite
		 * @see jo.Animation
		 */
		init: function(opt){
			this._super(opt);
			this.width = opt.width;
			this.height = opt.height;
			this.sprite = opt.sprite;
			this.tiles = this.readTiles(opt.tiles);
			this.solid=[];
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
		readTile: function(tile){
			//A Tile can be an Animation	
			if(typeof tile === 'object'){
				tile = new Animation(tile, this.width, this.height, this.sprite);
				
			}else{//or just a single Frame.
				tile = new Animation([{i: tile, t: 200}], this.width, this.height, this.sprite);
			}
		},
		push: function(tile){
			this.tiles.push(this.readTile(tile));
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
		},
		getCss: function(t){
			var fr,
			self=this,
			css = function(t){
				fr= self.tiles[t].getDrawFrame(0);
				return 'background: url('+self.sprite.src+') -'+fr.x+'px -'+fr.y+'px;'
						+'width: '+fr.width+'px ; height: '+fr.height+'px;';
			};
			if(t){
				return css(t);
			}else{
				var ar=[];
				for(var i in this.tiles){
					ar.push(css(i));
				}
				return ar;
			}
		}
	});
	return jo.TileSet;
});