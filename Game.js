define(['./jo', './Object', './Screen', './input', './Loader', './Camera'], function(jo, Object, Screen, input, Loader, Cam){

	jo.Game = jo.Object.extend({		
		init: function(options){
			this._super(options);
			if(!jo.screen){
				jo.screen = new jo.Screen(options);
			}
			input.setup();
			input.reserved = [	input.MOUSE1,
								input.MOUSE2,
								input.UP,
								input.DOWN,
								input.LEFT,
								input.RIGHT,
								input.CTRL,
								input.ALT,
								input.SHIFT,
								input.TAB,
								input.SPACE,
								input.ENTER,
								input.WHEEL_UP];
			this.freeze = false;
			this.cam = new Cam(0,0);
			jo.files = new jo.Loader();
		},
		loading: function(){
			jo.screen.clear();		
			jo.screen.rect({fill: jo.color(33,33,33)} ,
						{x: jo.screen.width/4-10, y: jo.screen.height/2 -30},
						jo.screen.width/2+20, 60 );
			jo.screen.rect({fill: jo.color(200,200,200)},
						{x: jo.screen.width/4, y: jo.screen.height/2 -20},
						jo.mapto(jo.files.progress, 0, 1, 0, jo.screen.width/2), 40 );
			
			jo.screen.text({align: 'center', fill: jo.clr.white, stroke: 0},
				       new jo.Point(jo.screen.width/2, jo.screen.height/2), 'Loading...');

			if(jo.files.progress >= 1){
				jo.screen.draw(jo.bind(this.loop, this));
				this._ready();
			}			
		},
		setup: function(fn, hold){
			this._setup = fn;
			if(!hold){
				return fn();
			}			
		},
		runSetup: function(){
			if(typeof this._setup === 'function'){
				return this._setup();
			}
		},
		runReady: function(){
			if(typeof this._ready === 'function'){
				this._ready();
			}
			this.run();
		},
		run: function(){
			jo.screen.draw(jo.bind(this.loop, this));
		},		
		load: function(files, folder){
			jo.files.load(files, folder);
			jo.screen.draw(jo.bind(this.loading, this));
		},
		ready: function(fn){
			this._ready = fn;
		},
		loop: function(){
			this.update(jo.screen.ticks);
			this.draw();
		},
		update: function(t){
			if(!this.freeze){
				this._super(t);
			}
			jo.input.update();
			this._update(t);
		},
		draw: function(){
			this._draw();
			this._super({}, jo.pzero, jo.screen);
		},
		OnUpdate: function(fn){
			this._update = fn;
		},
		OnDraw: function(fn){
			this._draw = fn;
		}
	});
	return jo.Game;
});