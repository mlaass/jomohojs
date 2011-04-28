
define([ './jo', './Surface', './Point'],function(jo, Surface, Point){
	/**
	 * @class The Screen Surface handles screen updating and frame counting
	 * @augments jo.Surface
	 */
	jo.Screen =  Surface.extend(
		/**
		 * @lends jo.Screen.prototype
		 */	
		{
		frames : 0,
		debug : $crystal.debug,
		fps : 60,
		ticks : 1000 / 30,
		realFps : 30,
		realTicks : 1000 / 30,
		time : 1000 / 30,
		fixedTime : true,
		lastTime : 0,
		off : {
			x : 0,
			y : 0
		},
		/**
		 * @constructs
		 * @param options
		 */
		init: function (options){
			
			this.fullscreen = options.fullscreen | false;
			
			var width = options.width | 640, height = options.height | 480;
			
			if(this.fullscreen){
				width = document.width;
				height = document.height;
			}
			this._super(width, height, options.name);
			
			if(this.fullscreen){
				this.canvas.style.position = 'absolute';
				this.canvas.style.zIndex = 99999;
				
			}
			this.fps = options.fps | 30;
		
			this.fixedTime = fixedTime options.fixedTime | true;
			
			this.ticks = 1000 / this.fps;

			setInterval(jo.bind(this.update, this), this.ticks);

			this.ctx.font = '10px monospace';

			// calculate the offset for the mouse
			this.calcOffset();
			jo.log('screen done');

		},
		/**
		 * This gets repeated throughout the game
		 * @private
		 */
		update: function(){
			this._draw();
			
			if(this.debug){
				this.ctx.font = '10px monospace';
				this.fill = 'white';
				this.stroke = 0;
				this.text(null,{x: 5, y: 5}, 'debugmode fps: ' + this.realFps.toFixed(2) + ' ticks: ' + this.realTicks);
			}	
			this.frames += 1;
			this.realTicks = this.time - this.lastTime;
			this.realFps = this.realFps / 2 + (500 / this.realTicks);
			var date = new Date();
			this.lastTime = this.time;
			this.time = date.getTime();
		},
		/**
		 * pass a function and put all your drawing here, it is the first thing, that runs every frame
		 */
		draw: function(fn){
			if(typeof fn === 'function'){
				this._draw = fn;
			}			
		},
		/**
		 * @private
		 */
		_draw: function(){
			//overwrite this in your game setup
			this.clear(this.color(120,120,120));
		},
		/**
		 * @private
		 */
		calcOffset: function(){
			this.offset= new Point();
			this.offset.x=0;
			this.offset.y=0;
			 var el = this.ctx.canvas;
	            while (el != null) {
	                this.offset.x += el.offsetLeft;
	                this.offset.y += el.offsetTop;
	                el = el.offsetParent;
	            }
		}
	});
		
	return jo.Screen;
});