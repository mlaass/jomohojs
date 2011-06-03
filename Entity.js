define(['jo', 'Object', 'Behaviour'], function(jo, Object, Behaviour){
	
	jo.Entity = Object.extend({
		joObject: 'Entity',
		init: function(){
			this._super.apply(this, arguments);
		},
		applyB: function(name, args){
			for(var i in this.b){
				if(this.b[i].isBehaviour){
					this.b[i][name].apply(this.b[i], args);
				}
			}
		},
		update: function(time){
			this.applyB('update', [time]);
			this._super(time);
			this.applyB('postUpdate', [time]);
		},
		draw: function(opt, pos, srf){
			this.applyB('draw', [opt, pos, srf]);
			this._super(time);
			this.applyB('postDraw', [opt, pos, srf]);
		},
		addBehaviour: function(name, b){
			this.b[name] = b;
			b.setup(this);
		},
		hasBehaviour: function(name){
			return typeof this.b[name] !== 'undefined';
		},
		removeBehaviour: function(name){
			if(this.hasBehaviour(name)){
				delete this.b[name];
				this.b[name]= undefined;
			}
		},
		_postParse: function(){
			this._super();
			this.applyB(setup, [this]);
		}
	});
	jo.Entity;
});