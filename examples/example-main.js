
define(['../src/jo', '../src/Game'], function(jo, Game){

	
	var game = new Game({ name: '#canvas', fullscreen: true, fps: 30});
	
	game.setup(function(){
		game.load(['img/test.png']);
		
	});
	var start = function(){
		game.state = 'start';
	}
	game.ready(function(){
		start();
	});
	game.OnUpdate(function(ticks){
		
		if(game.state ===  'play'){
			if(jo.input.key(jo.input.UP)){
			}
			if(jo.input.key(jo.input.DOWN)){

			}
		}

	});
	var caption = function(msg){
		jo.screen.text({align: 'center', fill: jo.clr.white, stroke: 0}, new jo.Point(jo.screen.width/2, jo.screen.height/2), msg);
	}
	game.OnDraw(function() {
		jo.screen.clear(jo.color(0,0,0));
		caption('state: '+game.state);
		jo.files.img.test.draw({angle: (jo.screen.frames/60)*Math.PI,pivot: 'center'}, new jo.Point(jo.screen.width/2, jo.screen.height/2-32), jo.screen);
	});
	
});