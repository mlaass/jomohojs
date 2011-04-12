define([ './jo', './Point', './Surface', './Sprite' ], 
		function(jo, Point, Surface, Sprite ) {
	/**
	 * @class handles tiles, works together with TileSet
	 */
	jo.Tile = jo.Class.extend(
		/**
		 * @lends jo.tile.prototype
		 */
		{
		/**
		 * @constructs
		 * @param tileSet
		 * @param index
		 * @param material
		 */
		init : function(tileSet, index, material) {
			this.index = index;
			this.material = material;
			this.tileSet = tileSet;
		},
		/**
		 * drawing
		 * @param options
		 * @param position
		 * @param surface
		 * @see jo.Sprite.draw
		 */
		draw : function(options, position, surface) {
			options.tile = this.index;
			this.tileSet.draw(options, position, surface);
			if (sys.debug) {
				if (typeof this.material.debugColor !== undefined) {
					screen.rect({fill: this.material.debugColor}, position, this.tileSet.width, this.tileSet.height);
				}
			}
		}

	});
	return jo.Tile;
});