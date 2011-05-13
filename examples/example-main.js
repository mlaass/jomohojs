
define(['../src/jo', '../src/Game'], function(jo, Game){
	
	//one global variable to rule them all very useful with the firebug console
	$jo=jo;
	
	//the game object needs id of the canvas 
	var game = new Game({ name: '#canvas', fullscreen: true, fps: 30});
	
	
	game.setup(function(){
		//preloading of the files we need
		game.load(['img/test.png']);
		
		game.pos = jo.point(jo.screen.width/2, jo.screen.height/2-32);
	});

	game.ready(function(){
		game.state = 'start';
	});
	
	//main game loop
	game.OnUpdate(function(ticks){
		if(game.state ===  'start'){
			if(jo.input.once('ENTER')){
				game.state='play';
			}			
		}else		
		if(game.state ===  'play'){
			if(jo.input.k('UP')){
				game.pos.y-=3;
			}
			if(jo.input.k('DOWN')){
				game.pos.y+=3;
			}
			if(jo.input.k('LEFT')){
				game.pos.x-=3;
			}
			if(jo.input.k('RIGHT')){
				game.pos.x+=3;
			}
		}
	});
	
	var caption = function(msg){
		jo.screen.text({align: 'center', fill: 'white', stroke: 0}, jo.point(jo.screen.width/2, jo.screen.height/2), msg);
	};
	
	//main drawing loop get called after each update
	game.OnDraw(function() {
		jo.screen.clear(jo.color(0,0,0));
		var txt = 'state: '+game.state;
		
		if(game.state ===  'start'){			
			txt+='  press enter to start';	
		}
		caption(txt);
		
		jo.files.img.test.draw({angle: (jo.screen.frames/60)*Math.PI, pivot: 'center'}, game.pos, jo.screen);				
	});	
});