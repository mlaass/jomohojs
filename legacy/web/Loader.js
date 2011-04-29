

define([ '../jo', '../core', './Sprite' ], function(jo, core, Sprite) {
	/**
	 * @class loads and stores your game assets specify them in files[] and
	 * then call load to load them, you can also call loadImg, loadSfx or loadMusic
	 * to load individual files
	 */
	jo.Loader = core.Class.extend(
		/**
		 * @lends jo.Loader.prototype
		 */	
		{
		files : [],
		folder : '',
		img : {},
		sfx : {},
		music : {},
		progress : 0,
		fileCount: 0,
		loaded : 0,
		audioExt : '.ogg',
		/**
		 * @constructs
		 */
		init: function(){
			this.testAudio();
		},
		/**
		 * 	load images, sounds and music, specifying a folder to load from is optional
		 * @param files
		 * @param folder=
		 */
		load : function(files, folder) {
			if (typeof (files) !== 'undefined') {
				this.files = files;
			}
			if (typeof (folder) !== 'undefined') {
				this.folder = folder;
			}	
			for ( var i = 0; i < this.files.length; i++) {
				var src = this.files[i];
				var type = src.substring(0, src.indexOf('/'));
				src = this.folder + '/' + src;
				
				if (type === 'sfx') {
					this.loadSfx(src);
				} else if (type === 'music') {
					src = src.substring(0, src.lastIndexOf('.'));
					src += this.audioExt;
					this.loadMusic(src);
				} else {
					this.loadImg(src);
				}
			}
		},
		/**
		 * tests the browser audio support, for filename extensions
		 * @private
		 */
		testAudio : function() {
			try {
				this.audioObj = new Audio('');
				this.audioObjSupport = !!(this.audioObj.canPlayType);
				this.basicAudioSupport = !!(!this.audioObjSupport ? this.audioObj.play: false);

				if (this.audioObj.canPlayType) {
					// Currently canPlayType(type) returns: 'no',
					// 'maybe' or 'probably'
					this.ogg = ('no' != this.audioObj.canPlayType('audio/ogg')) && ('' != this.audioObj.canPlayType('audio/ogg'));
					this.mp3 = ('no' != this.audioObj.canPlayType('audio/mpeg')) && ('' != this.audioObj.canPlayType('audio/mpeg'));
				}
			} catch (e) {
				this.audioObjSupport = false;
				this.basicAudioSupport = false;
			}
			if (this.ogg) {
				this.audioExt = '.ogg';
			} else if (this.mp3) {
				this.audioExt = '.mp3';
			} else {
				this.audioExt = '.wav';
			}
		},
		/**
		 * loads and image
		 * @param src
		 */
		loadImg : function(src) {
			this.fileCount += 1;	
			var name = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
			this.img[name] = new Sprite(src, core.bind(this.onLoad, this));
			this.img[name].name = name;
		},
		/**
		 * loads a .wav sound file
		 * @param src
		 */
		loadSfx : function(src) {
			if(this.audioObjSupport){
				this.fileCount += 1;						
				var name = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
				this.sfx[name] = new Audio(src);
				this.sfx[name].load();
				this.sfx[name].name = name;
				this.sfx[name].addEventListener('canplaythrough', core.bind(this.onLoad, this), true);
				this.sfx[name].looping = function(loop) {
					if (loop) {
						this.addEventListener('ended', function() {
							this.currentTime = 0;
						}, false);
					} else {
						this.addEventListener('ended', function() {
						}, false);
					}
				};
			}
		},
		/**
		 * loads an .mp3 or .ogg file depending on the browser
		 * @param src
		 */
		loadMusic : function(src) {
			if(this.audioObjSupport){
				this.fileCount += 1;	
				var name = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
				this.music[name] = new Audio(src);
				this.music[name].load();
				this.music[name].name = name;
				this.music[name].loop = true;
				this.music[name].addEventListener('canplaythrough',	core.bind(this.onLoad, this), true);

				this.music[name].looping = function(loop) {
					if (loop) {
						this.addEventListener('ended', function() {
							this.currentTime = 0;
						}, false);
					} else {
						this.addEventListener('ended', function() {
						}, false);
					}
				};
				this.music[name].stop = function() {
					this.pause();
					this.currentTime = 0;
				};
				this.music[name].volume = 0.3;
				this.music[name].looping(true);
			}
		},
		/**
		 * callback for the loading bar
		 * @private
		 * @param event
		 */
		onLoad : function(event) {
			this.loaded += 1;
			this.progress = core.mapto(this.loaded, 0, this.fileCount, 0, 1);
			core.log(event.target.name + ' ..loaded  ' + this.loaded + ' / ' + this.fileCount);
		}
	});
	return jo.Loader;
});