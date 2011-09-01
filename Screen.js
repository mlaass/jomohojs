
define([ './jo', './Surface', './Point'],function(jo, Surface, Point){
	/**
	 * @class The Screen Surface handles screen updating and frame counting
	 * @augments jo.Surface
	 */
	
	var viewport = function(){
		var viewportwidth;
		var viewportheight;
		
		// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
		
		if (typeof window.innerWidth != 'undefined')
		{
		     viewportwidth = window.innerWidth,
		     viewportheight = window.innerHeight;
		}
		
	       // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	       
		else if (typeof document.documentElement != 'undefined'
		    && typeof document.documentElement.clientWidth !=
		    'undefined' && document.documentElement.clientWidth != 0)
		{
		      viewportwidth = document.documentElement.clientWidth,
		      viewportheight = document.documentElement.clientHeight;
		}
		
		// older versions of IE
		
		else
		{
		      viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
		      viewportheight = document.getElementsByTagName('body')[0].clientHeight;
		}
		return {width: viewportwidth, height: viewportheight};
	
	};

	jo.Screen =  Surface.extend(
		/**
		 * @lends jo.Screen.prototype
		 */	
		{
		frames : 0,
		debug : jo.debug,
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
			
			this.width = options.width | 640;
			this.height = options.height | 480;
			
			
			this._super(this.width, this.height, options.name);
			this.checkfull();
			
			if(this.fullscreen){
				this.canvas.style.position = 'absolute';
				this.canvas.style.zIndex = 1;
				
			}
			this.fps = options.fps || 30;
		
			this.fixedTime = options.fixedTime | true;
			
			this.ticks = 1000 / this.fps;

			setInterval(jo.bind(this.update, this), this.ticks);

			this.ctx.font = '10px monospace';

			// calculate the offset for the mouse
			this.calcOffset();
			jo.log('screen done');

		},
		checkfull: function(){
			if(this.fullscreen){
				var view = viewport();

				if(this.width !== view.width || this.height!==view.height){
					this.canvas.height = this.height = view.height;
					this.canvas.width = this.width = view.width;
					if($){
						$('#canvas-wrap').css(view);
					}
				}
				
			}
		},
		/**
		 * This gets repeated throughout the game
		 * @private
		 */
		update: function(){
			this._draw();
			this.checkfull();
			if(this.debug){
				this.ctx.font = '10px monospace';
				this.fill = '#00ff00';
				this.stroke = 0;
				this.text({font: '12px monospace', fill : '#00ff00', stroke: 0},{x: 64, y: 8}, 'debugmode fps: ' + this.realFps.toFixed(2) + ' ticks: ' + this.realTicks);
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