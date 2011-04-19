
define([ './jo', './Surface'],function(jo, Surface){
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
		 * @param width
		 * @param height
		 * @param name
		 * @param fps
		 * @param fixedTime
		 */
		init: function (width, height, name, fps, fixedTime){
			this._super(width, height, name);
			this.fps = fps;
			if(typeof (fixedTime) !== 'undefined') {
				this.fixedTime = fixedTime;
			}
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
			this.draw();
			
			if(this.debug){
				this.ctx.font = '10px monospace';
				this.fill = 'white';
				this.stroke = 0;
				this.text({x: 5, y: 5}, 'debugmode fps: ' + this.realFps.toFixed(2) + ' ticks: ' + this.realTicks);
			}	
			this.frames += 1;
			this.realTicks = this.time - this.lastTime;
			this.realFps = this.realFps / 2 + (500 / this.realTicks);
			var date = new Date();
			this.lastTime = this.time;
			this.time = date.getTime();
		},
		/**
		 * overwrite this function and put all your drawing here, it is the first thing, that runs every frame
		 */
		draw: function(){
			//overwrite this in your game setup
			this.clear(this.color(120,120,120));
		},
		/**
		 * @private
		 */
		calcOffset: function(){
			this.off.x=0;
			this.off.y=0;
			 var el = this.ctx.canvas;
	            while (el != null) {
	                this.off.x += el.offsetLeft;
	                this.off.y += el.offsetTop;
	                el = el.offsetParent;
	            }
		}
	});
		
	return jo.Screen;
});