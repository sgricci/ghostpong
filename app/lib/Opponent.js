require('./class')

var Opponent = Class.extend({
	x     : null,
	y     : null,
	w     : null,
	h     : null,
	shape : null,
	ySpeed: 0,
	speedLimit: 4,
	init: function(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.shape = new createjs.Shape();
	},
	add: function(stage) {
		stage.addChild(this.shape);
	},
	update: function(ball) {
		if (this.y > 370) {
			this.y = 370;
		}
		if (this.y < 10) {
			this.y = 10;
		}
		if (ball.y - ball.h < this.y - this.h) {
			this.ySpeed = -this.speedLimit;
		} else if (ball.y > this.y) {
			this.ySpeed = this.speedLimit;
		}
		this.y += this.ySpeed;
	},
	tick: function(ball) {
		this.update(ball);
		this.shape.graphics.clear();
		this.shape.graphics.beginFill("#fff");
		this.shape.graphics.drawRect(
			this.x,
			this.y,
			this.w,
			this.h
		);
	}
});

module.exports = Opponent;
