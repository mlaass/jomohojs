

define(['./jo', './Object', './Screen', './input', './Loader'], function(jo, Object, Screen, input, Loader){
	
	var exec = function(fn){
		if(typeof fn === 'function'){
			setTimeout(0, fn);
		}
	};
	jo.Game = Object.extend({		
		init: function(options){
			this._super(options);
			
			jo.screen = new Screen(options);
			input.setup();
			jo.files = new Loader();
			jo.files.folder= '/';
			jo.game = this;
		},
		loading: function(){
			jo.screen.clear();		
			jo.screen.rect({fill: jo.color(33,33,33)} ,
						{x: jo.screen.width/4-10, y: jo.screen.height/2 -30},
						jo.screen.width/2+20, 60 );
			jo.screen.rect({fill: jo.color(200,200,200)},
						{x: jo.screen.width/4, y: jo.screen.height/2 -20},
						jo.mapto(jo.files.progress, 0, 1, 0, jo.screen.width/2), 40 );
			
			if(jo.files.progress >= 1){
				exec(this._ready);
				screen.draw(core.bind(this.loop, this));
			}			
		},
		setup: function(fn){
			this._setup = fn;
			exec(fn);
		},
		load: function(files, folder){
			jo.files.load(files, folder);
			jo.screen.draw(core.bind(this.loading, this));
		},
		ready: function(fn){
			this._ready = fn;
		},
		loop: function(){
			this.update(jo.screen.ticks);
			this.draw();
		},
		update: function(t){
			this._super(t);
			this._update(t);
		},
		draw: function(){
			this._super(jo.screen);
			this._draw();
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