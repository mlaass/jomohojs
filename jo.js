/**
 * @name jo
 * @namespace the namespace of the jomoho library
 */

define(['./Class', './Mersenne'],function(Class, Mersenne){
	return {
		/**
		 * @constant 
		 * @description version string
		 */
		version: '0.1',
		
		Class: Class,
		
		Mersenne: Mersenne,
		random: new Mersenne(),
		
		/**
		 * logs into the console if available
		 * @param what
		 */
		log : function(what) {
			if (typeof (console) !== 'undefined') {
				console.log(what);
			}
		},
		/**
		 * 
		 * @param r
		 * @param g
		 * @param b
		 * @param a
		 * @returns {String}
		 */
		color : function(r, g, b, a){
			r = Math.floor(r);
			g = Math.floor(g);
			b = Math.floor(b);
			

			if (typeof (a) === 'undefined'){
				return 'rgb(' + r + ',' + g + ',' + b + ')';
			} else {
				a = Math.floor(a);
				return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
			}
		},
		/**
		 * maps an index of range a to b to an index of x to y
		 * @param i
		 * @param a
		 * @param b
		 * @param x
		 * @param y
		 * @returns
		 */
		mapto : function(i, a, b, x, y) {
			var l1 = b - a;
			var l2 = y - x;

			return (((i - a) / l1) * l2) + x;
		},
		/**
		 * takes a member name string and returns a comparison function, to be used with array.sort
		 * @param name
		 * @returns
		 */
		sortby : function(name) {
			return function(o, p) {
				var a, b;
				if (typeof o === 'object' && typeof p === 'object' && o && p) {
					a = o[name];
					b = p[name];
					if (a === b) {
						return 0;
					}
					if (typeof a === typeof b) {
						return a < b ? -1 : 1;
					}
					return typeof a < typeof b ? -1 : 1;
				} else {
					throw {
						name : 'Error',
						message : 'Expected an object when sorting by ' + name
					};
				}
			};
		},
		/**
		 * binds fn to an object
		 * @param {Function} fn
		 * @param object
		 * @returns {Function}
		 */
		bind: function(fn, obj){
			return function() {
				fn.apply(obj, arguments);
			};
		},
		/**
		 * returns true if set contains element
		 * @param {Array} set
		 * @param element
		 * @returns {Boolean}
		 */
		includes: function(set, element) {

			for ( var i = 0; i < set.length; i++) {
				if (set[i] === element) {
					return true;
				}
			}
			return false;		
		},
		incl: function(set, element) {
			var r = set.length>0;
			for ( var i in element) {
				r = r && this.includes(set, element[i]);
			}
			return r;		
		},
		/**
		 * returns a filtered array, does not change array
		 * the filter works by returning true for those elements that should be in the filtered array
		 * @param array
		 * @param filter
		 * @returns
		 */
		filter: function(array, filter){
			var ret =[];
			for(var i in array){
				if(filter(array[i])){
					ret.push(array[i]);
				}
			}
			return ret;
		},
		
		clr: {
			white: 'rgb(255,255,255)',
			red: 'rgb(255,0,0)',
			green: 'rgb(0,255,0)',
			blue: 'rgb(0,0,255)',
			magenta: 'rgb(255,0,255)',
			cyan: 'rgb(0,255,255)',
			yellow: 'rgb(255,255,0)',
			black: 'rgb(0,0,0)'
		}
	};
	
});
/** TODO:
AliceBlue: '#F0F8FF',
AntiqueWhite: '#FAEBD7',
Aqua: '#00FFFF',
Aquamarine: '#7FFFD4',
Azure: '#F0FFFF',
Beige: '#F5F5DC',
Bisque: '#FFE4C4',
Black: '#000000',
BlanchedAlmond: '#FFEBCD',
Blue: '#0000FF',
BlueViolet: '#8A2BE2',
Brown: '#A52A2A',
BurlyWood: '#DEB887',
CadetBlue: '#5F9EA0',
Chartreuse: '#7FFF00',
Chocolate: '#D2691E',
Coral: '#FF7F50',
CornflowerBlue: '#6495ED',
Cornsilk: '#FFF8DC',
Crimson: '#DC143C',
Cyan: '#00FFFF',
DarkBlue: '#00008B',
DarkCyan: '#008B8B',
DarkGoldenRod: '#B8860B',
DarkGray: '#A9A9A9',
DarkGrey: '#A9A9A9',
DarkGreen: '#006400',
DarkKhaki: '#BDB76B',
DarkMagenta: '#8B008B',
DarkOliveGreen: '#556B2F',
Darkorange: '#FF8C00',
DarkOrchid: '#9932CC',
DarkRed: '#8B0000',
DarkSalmon: '#E9967A',
DarkSeaGreen: '#8FBC8F',
DarkSlateBlue: '#483D8B',
DarkSlateGray: '#2F4F4F',
DarkSlateGrey: '#2F4F4F',
DarkTurquoise: '#00CED1',
DarkViolet: '#9400D3',
DeepPink: '#FF1493',
DeepSkyBlue: '#00BFFF',
DimGray: '#696969',
DimGrey: '#696969',
DodgerBlue: '#1E90FF',
FireBrick: '#B22222',
FloralWhite: '#FFFAF0',
ForestGreen: '#228B22',
Fuchsia: '#FF00FF',
Gainsboro: '#DCDCDC',
GhostWhite: '#F8F8FF',
Gold: '#FFD700',
GoldenRod: '#DAA520',
Gray: '#808080',
Grey: '#808080',
Green: '#008000',
GreenYellow: '#ADFF2F',
HoneyDew: '#F0FFF0',
HotPink: '#FF69B4',
IndianRed : '#CD5C5C',
Indigo : '#4B0082',
Ivory: '#FFFFF0',
Khaki: '#F0E68C',
Lavender: '#E6E6FA',
LavenderBlush: '#FFF0F5',
LawnGreen: '#7CFC00',
LemonChiffon: '#FFFACD',
LightBlue: '#ADD8E6',
LightCoral: '#F08080',
LightCyan: '#E0FFFF',
LightGoldenRodYellow: '#FAFAD2',
LightGray: '#D3D3D3',
LightGrey: '#D3D3D3',
LightGreen: '#90EE90',
LightPink: '#FFB6C1',
LightSalmon: '#FFA07A',
LightSeaGreen: '#20B2AA',
LightSkyBlue: '#87CEFA',
LightSlateGray: '#778899',
LightSlateGrey: '#778899',
LightSteelBlue: '#B0C4DE',
LightYellow: '#FFFFE0',
Lime: '#00FF00',
LimeGreen: '#32CD32',
Linen: '#FAF0E6',
Magenta: '#FF00FF',
Maroon: '#800000',
MediumAquaMarine: '#66CDAA',
MediumBlue: '#0000CD',
MediumOrchid: '#BA55D3',
MediumPurple: '#9370D8',
MediumSeaGreen: '#3CB371',
MediumSlateBlue: '#7B68EE',
MediumSpringGreen: '#00FA9A',
MediumTurquoise: '#48D1CC',
MediumVioletRed: '#C71585',
MidnightBlue: '#191970',
MintCream: '#F5FFFA',
MistyRose: '#FFE4E1',
Moccasin: '#FFE4B5',
NavajoWhite: '#FFDEAD',
Navy: '#000080',
OldLace: '#FDF5E6',
Olive: '#808000',
OliveDrab: '#6B8E23',
Orange: '#FFA500',
OrangeRed: '#FF4500',
Orchid: '#DA70D6',
PaleGoldenRod: '#EEE8AA',
PaleGreen: '#98FB98',
PaleTurquoise: '#AFEEEE',
PaleVioletRed: '#D87093',
PapayaWhip: '#FFEFD5',
PeachPuff: '#FFDAB9',
Peru: '#CD853F',
Pink: '#FFC0CB',
Plum: '#DDA0DD',
PowderBlue: '#B0E0E6',
Purple: '#800080',
Red: '#FF0000',
RosyBrown: '#BC8F8F',
RoyalBlue: '#4169E1',
SaddleBrown: '#8B4513',
Salmon: '#FA8072',
SandyBrown: '#F4A460',
SeaGreen: '#2E8B57',
SeaShell: '#FFF5EE',
Sienna: '#A0522D',
Silver: '#C0C0C0',
SkyBlue: '#87CEEB',
SlateBlue: '#6A5ACD',
SlateGray: '#708090',
SlateGrey: '#708090',
Snow: '#FFFAFA',
SpringGreen: '#00FF7F',
SteelBlue: '#4682B4',
Tan: '#D2B48C',
Teal: '#008080',
Thistle: '#D8BFD8',
Tomato: '#FF6347',
Turquoise: '#40E0D0',
Violet: '#EE82EE',
Wheat: '#F5DEB3',
White: '#FFFFFF',
WhiteSmoke: '#F5F5F5',
Yellow: '#FFFF00',
YellowGreen: '#9ACD32'*/

