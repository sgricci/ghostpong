require('./class');

var Line = Class.extend({
	x     : null,
	y     : null,
	shape : null,
	init: function(x, y) {
		this.x = x;
		this.y = y;
		this.shape = new createjs.Shape();
	},
	add: function(stage) {
		stage.addChild(this.shape);
	},
	tick: function() {
		this.shape.graphics.clear();
		this.shape.graphics.beginFill("#fff");
		this.shape.graphics.drawRect(
			this.x,
			this.y,
			2,
			640
		);
	}
});

module.exports = Line;

