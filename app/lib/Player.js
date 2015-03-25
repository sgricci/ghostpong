require('./class');

var Player = Class.extend({
	x     : null,
	y     : null,
	w     : null,
	h     : null,
	shape : null,
	ySpeed: 6,
	init: function(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.shape = new createjs.Shape();
	},
	tick: function() {
		this.shape.graphics.clear();
		this.shape.graphics.beginFill("#fff");
		this.shape.graphics.drawRect(
			this.x,
			this.y,
			this.w,
			this.h
		);
	},
	move: function(keymap) {
		if (keymap[87]) { 
			this.y -= this.ySpeed; 
			if (this.y < 10) { this.y = 10; }
		}
		if (keymap[83]) { 
			this.y += this.ySpeed; 
			if (this.y > 370) { this.y = 370; }
		}
	},
	add: function(stage) {
		stage.addChild(this.shape);
	}
});

module.exports = Player;
