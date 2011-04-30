/**
 * The Game as the name implies brings together the actual game
 *  it loads the game assets and delivers a loading screen
 */

define(['./core',
        './Point'],
        function(core,
        		Point){
	
	var screen= sys.screen, input= sys.input, res= sys.resources;
	
	var Game = core.Class.extend({
		init:function(){},
		load: function(files, folder){
			if(typeof files !== 'undefined' && files !== null){
				res.load(files, folder);
				screen.step = core.bind(this.drawLoading, this);
			}
			else{
				screen.step = core.bind(this.drawStep,this);
			}

		},
		drawLoading: function(){
			screen.clear();
			
			screen.fill = screen.color(33,33,33); 
			screen.rect({x: screen.width/4-10, y: screen.height/2 -30},screen.width/2+20, 60 );
			screen.fill = screen.color(200,200,200); 
			screen.rect({x: screen.width/4, y: screen.height/2 -20},core.mapto(res.progress, 0, 1, 0, screen.width/2), 40 );
			
			if(res.progress === 1){
				this.afterLoading();
				screen.step= core.bind(this.drawStep, this);
			}			
		},
		drawStep: function(){
			this.update(screen.ticks);
			this.draw();
		},
		afterLoading: function(){},
		draw: function(){},
		update: function(ticks){}
	});
	
	return Game;
});
	