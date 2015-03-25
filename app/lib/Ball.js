require('./class');

var Ball = Class.extend({
	x         : null,
	y         : null,
	initial_x : null,
	initial_y : null,
	shape     : null,
	xVelocity : 0,
	yVelocity : 0,
	game: null,
	w: 10,
	h: 10,
	init: function(x, y, gameObj) {
		this.game = gameObj;
		this.x = this.initial_x = x;
		this.y = this.initial_y = y;
		this.shape = new createjs.Shape();
		this.xVelocity = 5;
		this.yVelocity = 5;
	},
	add: function(stage) {
		stage.addChild(this.shape);
	},
	update: function() {
		this.x += this.xVelocity;
		this.y += this.yVelocity;
		if (this.y > 470) {
			this.yVelocity *= -1;
			this.y = 470;
		}
		if (this.y < 10) {
			this.yVelocity *= -1;
			this.y = 10;
		}
		if (this.x > 640 || this.x < -10) {
			this.respawn();
		}
	},
	respawn: function() {
		if (this.x > 640) {
			this.game.scores[0]++;
		} else {
			this.game.scores[1]++;
		}

		this.x = this.initial_x;
		this.y = this.initial_y;
	},
	collision_check: function(collidables) {
		for (var i = 0; i < collidables.length; i++) {
			var coll = collidables[i];
			intersects = !(
					coll.x > this.x + this.w ||
					coll.x + coll.w < this.x ||
					coll.y > this.y + this.h ||
					coll.y + coll.h < this.y 
					);
			if (intersects) {
				//this.x = (coll.x+coll.w)-this.xVelocity;
				this.xVelocity *= -1;
			}
		}
	},
	tick: function() {
		this.update();
		this.shape.graphics.clear();
		this.shape.graphics.beginFill("#CF7ABF");
		this.shape.graphics.drawRect(
			this.x,
			this.y,
			this.w,
			this.h
		);
	}
});

module.exports = Ball;
