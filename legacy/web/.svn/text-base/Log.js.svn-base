/**
 * Log can be used to dump stuff into the log div the html page
 */
define([ '../core', '../core/Class' ], function(core, Class) {

	var Log = Class.extend({
		init : function() {
			this.area = document.getElementById('log');
			this.dumps = 0;
		},
		dump : function(s) {
			var newdiv = document.createElement('div');
			var divId = 'dump_' + this.dumps;
			newdiv.setAttribute('id', divId);
			newdiv.setAttribute('class', 'dump');
			newdiv.innerHTML = s + '';
			this.area.appendChild(newdiv);
			this.dumps++;
		}
	});
	return Log;
});