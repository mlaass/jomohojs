define(['./jo'], function(jo){
	/**
	 * @class defines an animation, needs a sprite as frame set,
	 * 			define the frames' index and length in milliseconds and call run every frame.
	 * 			For now it only takes frames in vertical direction
	 * 
	 */
	jo.Animation = jo.Class.extend({
		/**
		 * @constructor
		 * @param {jo.Sprite} sprite the frame set
		 * @param {array} frames as  {i: {number} frameIndex, t: {number} time in ms}
		 * or just time in milliseconds
		 * @param {number} width width of one frame 
		 * @param {number} height height of one frame
		 * @methodOf jo.Animation
		 */
		init: function(frames, width, height, sprite, startCallback, finishCallback){
			console.log(frames);
			this.sprite = (sprite) ? sprite : null;
			this.width = (width) ? width : 0;
			this.height = (height) ? height : 0;
			this.xoff = 0;
			this.yoff = 0;
			this.frames = this.readFrames(frames);
			this.frame = 0;
			this.tickCount = 0;
			this.startCallback = startCallback;
			this.finishCallback = finishCallback;
			this.start = true;
			console.log(this.frames);
		},
		/**
		 * reads and transforms an array of frames
		 * @param frames
		 * @returns the transformed frames array
		 */
		readFrames: function(frames){
			if(typeof frames === 'undefined'){
				frames = [100];
			}
			if(typeof frames.length !== 'undefined'){
				for(var i=0; i< frames.length; i++){
					frames[i] = typeof frames[i] === 'object'? frames[i] : {i: i, t: frames[i]};
						
					frames[i].drawFrame = this.calcFrame(frames[i].i);					
				}
			}
			return frames;
		},
		/**
		 * @description call to advance the animation
		 * @param {number} ticks milliseconds to advance
		 */
		update: function(ticks){
			if(this.start === true ){
				if(typeof this.startCallback === 'function'){
					this.startCallback(this);
				}
				this.frame = this.frame % this.frames.length;
			}
			this.tickCount += ticks;
			if(this.frames[this.frame].t - this.tickCount <= 0 ){
				this.tickCount -= this.frames[this.frame].t;
				this.frame +=1;				
			}
			
			if(this.frame >= this.frames.length ){
				if(typeof this.finishCallback === 'function'){
					this.finishCallback(this);
				}
				this.start = true;
				this.frame = this.frame % this.frames.length;
			}
		},
		/**
		 * @description draw the current frame, same parameters as jo.Sprite
		 * @param surface
		 * @param position
		 * @param options
		 * @see jo.Sprite
		 */
		draw: function(options, position, surface){
			if(this.sprite){
				options.frame = this.frames[this.frame].drawFrame;
				this.sprite.draw(options, position, surface);
			}
		},
		/**
		 * returns a frame rectangle for use with jo.Sprite.draw
		 * @param frame
		 * @returns {Object}
		 * @see jo.Sprite.draw
		 */
		calcFrame: function(frame){

			var cols = Math.floor(this.sprite.width / this.width);
			return {
				x: this.xoff + ((frame % cols)) * this.width,
				y: this.yoff + Math.floor(frame / cols) * this.height, 
				width: this.width, 
				height: this.height				
			};
		},
		getDrawFrame: function(frame){
			if(!frame){
				frame=0;
			}
			return this.frames[frame].drawFrame;
		}
	});
	return jo.Animation;
});