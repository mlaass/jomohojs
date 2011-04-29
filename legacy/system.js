/**
 * system collects system specific information and
 * instances of core classes which interact with the current platform
 */



//TODO: rewrite with require and without global, platform variable, but 
// automatic user Agent detection
define(['./core',
        './'+$crystal.platform+'/Screen', 
        './'+$crystal.platform+'/input' , 
        './'+$crystal.platform+'/Loader', 
        './'+$crystal.platform+'/Log', 
        './'+$crystal.platform+'/Surface'],
        function(core, 
        		Screen, 
        		input, 
        		Loader, 
        		Log,
        		Surface){
	
		var screen = new Screen(640, 480,'#crystalCanvas', 30,true);
		var system = {
				platform: $crystal.platform,
				input: input,
				screen: screen,
				resources: new Loader(),
				log: new Log(),
				debug: $crystal.debug,
				Surface: Surface		
			};
		
		 system.input.sys = system;
		 system.screen.sys = system;
		 system.resources.sys = system;
		 $crystal.sys = system;
		 
		 $crystal.fulldev = function(){
				this.debug = true;
				this.sys.debug = true;
				this.sys.screen.debug = true;
		 };
		 
		 $crystal.fps= function(){
				this.sys.screen.debug = true;
		 };

	 return system;	
});
