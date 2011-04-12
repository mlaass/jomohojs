
define([ './jo', './Point' ], function(jo, Point) {

	/**
	 * @class A surface to draw on 
	 */
	jo.Surface = jo.Class.extend(
	/**
	 * @lends jo.Surface.prototype
	 * @property width
	 * @property height
	 * @property fill
	 * @property stroke
	 * @property canvas
	 * @property ctx
	 */		
		{
		width : 0,
		height : 0,
		fill : 0,
		stroke : 0,
		canvas : null,
		/**
		 * @constructs
		 * @param width
		 * @param height
		 * @param name
		 */
		init : function(width, height, name){
			if(typeof (name) === 'undefined') {
				name = '';
			}
			if(name.substring(0, 1) === '#'){
				var name = name.substring(1, name.length);
				this.canvas = document.getElementById(name);
			} else {
				this.canvas = document.createElement('canvas');
				this.canvas.setAttribute('id', name);
			}
			if(this.canvas && this.canvas.getContext){
				this.ctx = this.canvas.getContext('2d');			
				this.canvas.height = this.height = height;
				this.canvas.width = this.width = width;
	
				this.ctx.font = '10px monospace';
			}else {				
				alert('Please use a browser with canvas support');
			}
		},
		/**
		 * @private
		 * @param f
		 */
		font : function(f){
			this.ctx.font = f;
		},
		/**
		 * @private
		 */
		setPaint : function(){
			if(this.fill){
				this.ctx.fillStyle = this.fill;
			}
			if(this.stroke){
				this.ctx.strokeStyle = this.stroke;
			}
		},
		/**
		 * 
		 * @param r
		 * @param g
		 * @param b
		 * @param a
		 * @returns {String}
		 */
		color : function(r, g, b, a){
			r = Math.floor(r);
			g = Math.floor(g);
			b = Math.floor(b);
			

			if (typeof (a) === 'undefined'){
				return 'rgb(' + r + ',' + g + ',' + b + ')';
			} else {
				a = Math.floor(a);
				return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
			}
		},
		/**
		 * 
		 */
		push : function(){
			this.ctx.save();
		},
		/**
		 * 
		 */
		pop : function(){
			this.ctx.restore();
		},
		/**
		 * 
		 * @param angle
		 */
		rotate : function(angle){
			this.ctx.rotate(angle);
		},
		/**
		 * 
		 * @param position
		 */		
		translate : function(position) {
			this.ctx.translate(position.x, position.y);
		},
		/**
		 * 
		 * @param color
		 */
		clear : function(color){
			if (typeof color === 'undefined') {
				this.ctx.clearRect(0, 0, this.width, this.height);
			} else {
				this.ctx.background = color;
				this.ctx.clearRect(0, 0, this.width, this.height);
			}		
		},
		/**
		 * @private
		 */
		resetOptions: function(){
			this.stroke = 'black';
			this.fill = 'white';
			this.font('10px monospace');
			this.ctx.textBaseline = 'top';
			this.ctx.textAlign = 'start';
		},
		/**
		 * @private
		 * @param options
		 */
		readOptions : function(options){
			//escape opportunity to use previous setting
			if(options === -1){
				return;
			}
			
			this.resetOptions();
			if(typeof options === 'object'){
				if(typeof options.font !== 'undefined'){
					this.font(options.font);
				}
				if(typeof options.baseline !== 'undefined'){
					this.ctx.textBaseline = options.baseline;
				}
				if(typeof options.align !== 'undefined'){
					this.ctx.textAlign = options.align;
				}				
				
				if(typeof options.stroke !== 'undefined'){
					this.stroke = options.stroke;
				}
				if(typeof options.fill !== 'undefined'){
					this.fill = options.fill;
				}
				
			}
			this.setPaint();
		},
		/**
		 * 
		 * @param options
		 * @param position
		 * @param width
		 * @param height
		 */
		rect : function(options, position, width, height){
			this.readOptions(options);
			if (this.fill) {
				this.ctx.fillStyle = this.fill;
				this.ctx.fillRect(position.x, position.y, width, height);
			}
			if (this.stroke){
				this.ctx.strokeStyle = this.stroke;
				this.ctx.strokeRect(position.x, position.y, width, height);
			}
		},
		/**
		 * draws a circle at a specific position
		 * @param options
		 * @param position
		 * @param radius
		 */
		circle : function(options, position, radius){
			this.readOptions(options);
			
			this.ctx.beginPath();
				this.ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
				if(this.fill) {
					this.ctx.fill();
				}
				if(this.stroke) {
					this.ctx.stroke();
				}
			this.ctx.closePath();

		},
		/**
		 * draws a line between two positions
		 * @param options
		 * @param position1
		 * @param position2
		 */
		line : function(options, position1, position2) {
			this.readOptions(options);
			
			this.ctx.beginPath();
				this.ctx.moveTo(position1.x, position1.y);
				this.ctx.lineTo(position2.x, position2.y);
			this.ctx.closePath();
			
			if (this.stroke) {
				this.ctx.stroke();
			}
		},
		/**
		 *  returns the length of a given text in pixels, 
		 *  using the settings specified in options
		 * @param options
		 * @param caption
		 * @returns
		 */
		textLength : function(options, caption){
			this.readOptions(options);
			return this.ctx.measureText(caption).width;
		},
		/**
		 * draws text at a certain position
		 * @param options
		 * @param position
		 * @param caption
		 */
		text : function(options, position, caption) {
			this.readOptions(options);

			if(this.fill){
				this.ctx.fillStyle = this.fill;
				this.ctx.fillText(caption, position.x, position.y);
			}
			if(this.stroke){
				this.ctx.strokeStyle = this.stroke;
				this.ctx.strokeText(caption, position.x, position.y);
			}
		},
		/**
		 * draws a sprite
		 * @see jo.Sprite.draw
		 * @param options
		 * @param position
		 * @param sprite
		 */
		drawSprite: function(options, position, sprite){
			sprite.draw(options, position, this);
		},
		/**
		 * draws the surface onto another surface same parameters as jo.Sprite.draw
		 * @see jo.Sprite
		 * @param options
		 * @param position
		 * @param surface
		 */
		draw : function(options, position, surface) {
			
			surface.ctx.save();
			surface.ctx.translate(position.x, position.y);
			
			var srcW = width = this.width, 
				srcH = height = this.height,
				x = 0, 
				y = 0;

			if(typeof options === 'object'){
				if(typeof options.angle !== 'undefined'){
					surface.ctx.rotate(options.angle);
				}
				
				if(typeof options.frame === 'object'){
					srcW = width = options.frame.width;
					srcH = height = options.frame.height;
					x = options.frame.x;
					y = options.frame.y;
				}
				if(typeof options.resize === 'number'){
					width *= options.resize;
					height *= options.resize;
				}
				if(typeof options.pivot !== 'undefined'){					
					if(options.pivot === 'center'){
						surface.ctx.translate(-width / 2, -height / 2);
					}
					if(options.pivot === 'top'){
						surface.ctx.translate(-width / 2, 0);
					}
					if(options.pivot === 'topleft'){
						surface.ctx.translate(0, 0);
					}
					if(options.pivot === 'topright'){
						surface.ctx.translate(-width, 0);
					}
					if(options.pivot === 'bottom'){
						surface.ctx.translate(-width / 2, -height);
					}
					if(options.pivot === 'bottomleft'){
						surface.ctx.translate(0, -height);
					}
					if(options.pivot === 'bottomright'){
						surface.ctx.translate(-width, -height);
					}
					if(options.pivot === 'left'){
						surface.ctx.translate(0, -height / 2);
					}
					if(options.pivot === 'right'){
						surface.ctx.translate(-width , -height / 2);
					}
					//custom point is possible aswell
					if(typeof options.pivot.x !== 'undefined' && typeof options.pivot.y !== 'undefined'){
						surface.ctx.translate(options.pivot.x, options.pivot.y);
					}
				}				
			}
			surface.ctx.drawImage(this.canvas, x, y, srcW, srcH, 0, 0, width, height);
			surface.ctx.restore();
		}
	});

	return jo.Surface;
});