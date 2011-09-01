/**
 * @name jo.Sprite
 * @class Sprite loads and draws Images
 * @property {number} width The Images' Width
 * @property {number} height The Images' Height
 */

define([ './jo', './Point' ], function(jo, Point) {

	jo.Sprite = jo.Class.extend({
		width : 0,
		height : 0,
		loadCall : null,
		/**
		 * @constructor
		 * @param {string} src takes an image URL 
		 * @param {function} loadCall callback function, gets called when image is loaded
		 * @methodOf jo.web.Sprite
		 */
		init : function(src, loadCall) {
			this.src = src;
			this.img = new Image();
			this.img.src = src;
			this.loadCall = loadCall;
			this.img.onload = jo.bind(this.onLoad, this);
			//this.joObject ='Sprite';
		},
		/**
		 * @private
		 * @param event 
		 * @methodOf jo.web.Sprite
		 */
		onLoad : function(event) {
			this.width = this.img.width;
			this.height = this.img.height;
			event.target.name = this.name;
			if(this.loadCall) {
				this.loadCall(event);
			}
		},
		/**
		 * @param {object} options an optional set of options, such as angle, pivot and frame <br/>
		 * 	angle: an angle in radians <br/>
		 *  pivot: a point or a direction supported directions are:
		 *  <ul> <li>'center'</li>
		 *  <li>'top'</li>
		 *  <li>'bottom'</li>
		 *  <li>'left'</li>
		 *  <li>'right'</li>
		 *  <li>'topleft'</li>
		 *  <li>'topright'</li>
		 *  <li>'bottomleft'</li>
		 *  <li>'bottomright'</li>
		 *  </ul>
		 *  default is topleft <br/>
		 *  frame: {x: {Number}, y: {Number}, width: {Number}, height: {Number}}
		 * @param {object} position a position object containing x and y
		 * @param {jo.Surface} surface A Jomoho Surface e.g. screen
		 * @methodOf jo.web.Sprite
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
					}else if(options.pivot === 'top'){
						surface.ctx.translate(-width / 2, 0);
					}else if(options.pivot === 'topright'){
						surface.ctx.translate(-width, 0);
					}else if(options.pivot === 'bottom'){
						surface.ctx.translate(-width / 2, -height);
					}else if(options.pivot === 'bottomleft'){
						surface.ctx.translate(0, -height);
					}else if(options.pivot === 'bottomright'){
						surface.ctx.translate(-width, -height);
					}else if(options.pivot === 'left'){
						surface.ctx.translate(0, -height / 2);
					}else if(options.pivot === 'right'){
						surface.ctx.translate(-width , -height / 2);
					}
					//custom Point is possible aswell
					if(typeof options.pivot.x !== 'undefined' && typeof options.pivot.y !== 'undefined'){
						surface.ctx.translate(options.pivot.x, options.pivot.y);
					}
				}				
			}
			x = ~~ (x+0.5);
			y = ~~ (y+0.5);
			surface.ctx.drawImage(this.img, x, y, srcW, srcH, 0, 0, width, height);
			surface.ctx.restore();
		}
	});

	return jo.Sprite;
});