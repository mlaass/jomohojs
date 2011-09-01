/**
 * 
 */

define(['./jo', './Point'], function(jo, Point){
	var keybuf = 270;
	
	jo.input = {
		'MOUSE1': 260,
		'MOUSE2': 261,
		'WHEEL_UP': 262,
		'WHEEL_DOWN': 263,
		'BACKSPACE': 8,
		'TAB': 9,
		'ENTER': 13,
		'PAUSE': 19,
		'CAPS': 20,
		'ESC': 27,
		'SPACE': 32,
		'PAGE_UP': 33,
		'PAGE_DOWN': 34,
		'END': 35,
		'HOME': 36,
		'LEFT': 37,
		'UP': 38,
		'RIGHT': 39,
		'DOWN': 40,
		'INSERT': 45,
		'DELETE': 46,
		'0': 48,
		'1': 49,
		'2': 50,
		'3': 51,
		'4': 52,
		'5': 53,
		'6': 54,
		'7': 55,
		'8': 56,
		'9': 57,
		'A': 65,
		'B': 66,
		'C': 67,
		'D': 68,
		'E': 69,
		'F': 70,
		'G': 71,
		'H': 72,
		'I': 73,
		'J': 74,
		'K': 75,
		'L': 76,
		'M': 77,
		'N': 78,
		'O': 79,
		'P': 80,
		'Q': 81,
		'R': 82,
		'S': 83,
		'T': 84,
		'U': 85,
		'V': 86,
		'W': 87,
		'X': 88,
		'Y': 89,
		'Z': 90,
		'NUMPAD_0': 96,
		'NUMPAD_1': 97,
		'NUMPAD_2': 98,
		'NUMPAD_3': 99,
		'NUMPAD_4': 100,
		'NUMPAD_5': 101,
		'NUMPAD_6': 102,
		'NUMPAD_7': 103,
		'NUMPAD_8': 104,
		'NUMPAD_9': 105,
		'MULTIPLY': 106,
		'ADD': 107,
		'SUBSTRACT': 109,
		'DECIMAL': 110,
		'DIVIDE': 111,
		'F1': 112,
		'F2': 113,
		'F3': 114,
		'F4': 115,
		'F5': 116,
		'F6': 117,
		'F7': 118,
		'F8': 119,
		'F9': 120,
		'F10': 121,
		'F11': 122,
		'F12': 123,
		'SHIFT': 16,
		'CTRL': 17,
		'ALT': 18,
		'PLUS': 187,
		'COMMA': 188,
		'MINUS': 189,
		'PERIOD': 190,
		key:[],
		lastKey:[],
		newKey:[],
		lastMouse: new Point(0, 0),
		newMouse: new Point(0, 0),
		mouse: new Point(0, 0),
		reserved:[],
		keyInit:false,
		mouseInit: false,
		setup: function(){
			this.initKeys();			
			this.initMouse();
		},
		initKeys: function (){
			if(this.keyInit){
				return;
			}
			this.keyInit=true;
			
			for(var i=0; i<keybuf; i++){
				this.key.push(false);
				this.lastKey.push(false);
				this.newKey.push(false);
			}
			
			window.addEventListener('keydown', jo.bind(this.keyDown, this), false);
			window.addEventListener('keyup', jo.bind(this.keyUp, this), false);
			jo.log('keyboard ready..');
		},
		initMouse: function (){	
			if(this.mouseInit){
				return;
			}
			this.mouseInit=true;		
			window.addEventListener('mousewheel', jo.bind(this.mouseWheel, this), false);
			
			jo.screen.canvas.addEventListener('contextmenu', jo.bind(this.contextMenu, this), false);
			jo.screen.canvas.addEventListener('mousedown', jo.bind(this.keyDown, this), false);			
			window.addEventListener('mouseup', jo.bind(this.keyUp, this), false);
			window.addEventListener('mousemove', jo.bind(this.mouseMove, this), false);
			
			jo.log('mouse ready..');
		},
		keyUp: function(event){
			if (event.target.type == 'text') {
				return;
			}
			var code = event.type == 'keyup' ? event.keyCode :(event.button == 2 ? this.MOUSE2 : this.MOUSE1);
			if(code >= 0){
				this.newKey[code] = false;
			}
			if(jo.includes(this.reserved, code) || event.type !== 'keydown'){
				event.preventDefault();
				return 0;
			}
			//this.clear();
		},
		keyDown: function(event){
			if (event.target.type === 'text') {
				return;
			}
			var code = event.type === 'keydown' ? event.keyCode : (event.button == 2 ? this.MOUSE2 : this.MOUSE1);
			if(code ===this.MOUSE1){
				this.mouseMove(event);
				this.update(0);
			}
			if(code>= 0){
				this.newKey[code] = true;
			}
			if(jo.includes(this.reserved, code) || event.type !== 'keydown'){
				event.preventDefault();
				return 0;
			}
		},
		clearKeys: function(){
			for(var i=0; i<keybuf; i++){
				this.key[i]=false;
				this.newKey[i]=false;
				this.lastKey[i]=false;
			}
		},
		mouseMovement: function(){
			return this.mouse.minus(this.lastMouse);
		},
        mouseWheel: function (event) {
            var code = event.wheel > 0 ? this.WHEEL_UP : this.WHEEL_DOWN;
			if(jo.includes(this.reserved, code)){
				event.preventDefault();
			}
			if(code>= 0){
				this.key[code]=true;
			}
        },
        mouseMove: function (event) {
            this.newMouse.x = (event.pageX - jo.screen.offset.x);
            this.newMouse.y = (event.pageY - jo.screen.offset.y);
			
        },
        update: function(ticks){
            this.lastMouse.copy(this.mouse);
            this.mouse.copy(this.newMouse);
            for(var i=0; i< keybuf; i++){
                this.lastKey[i]= this.key[i];
                this.key[i] = this.newKey[i];
            }
        },
        once: function(key){
        	var code = this[key];
        	return !this.lastKey[code] && this.key[code];
        },
        contextMenu: function (event) {
            if (jo.includes(this.reserved, this.MOUSE2)){
                event.stopPropagation();
                event.preventDefault();
            }
        },
        k: function(key){
        	return this.key[this[key]] === true;
        }
	};
	return jo.input;
});