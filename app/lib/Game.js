require('./class');
var Player = require('./Player');
var Ball = require('./Ball');
var Opponent = require('./Opponent');
var Line = require('./Line');

var Game = Class.extend({
	$canvas        : null,
	stage          : null,
	player         : null,
	ball           : null,
	opponent       : null,
	line           : null,
	scores         : [0,0],
	score_player   : null,
	score_opponent : null,
	keymap         : {},
	loaded         : false,
	init: function(canvas) {
		var self = this;
		this.$canvas = canvas;
		this.stage = new createjs.Stage(this.$canvas);
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener('tick', this.tick.bind(this));
		this.create();
		this.bind();
	},
	create: function() {
		this.score_player = new createjs.Text();
		this.score_player.font = "bold 72px 'Press Start 2P'";
		this.score_player.color = "#444";
		this.score_player.x = 250;
		this.score_player.y = 410;
		this.stage.addChild(this.score_player);
		this.score_opponent = new createjs.Text();
		this.score_opponent.font = "bold 72px 'Press Start 2P'";
		this.score_opponent.color = "#444";
		this.score_opponent.x = 324;
		this.score_opponent.y = 410;
		this.stage.addChild(this.score_opponent);
		this.player = new Player(10, 10, 20, 100);
		this.player.add(this.stage);
		this.ball = new Ball(315, 235, this);
		//this.ball = new Ball(610, 440);
		this.ball.add(this.stage);
		this.opponent = new Opponent(610, 370, 20, 100);
		this.opponent.add(this.stage);
		this.line = new Line(319, 0);
		this.line.add(this.stage);
	},
	bind: function() {
		document.onkeyup = this.onkeyup.bind(this);
		document.onkeydown = this.onkeydown.bind(this);
	},
	onkeyup: function(event) {
		delete this.keymap[event.which];
	},
	onkeydown: function(event) {
		this.keymap[event.which] = true;
	},
	draw_scores: function() {
		this.score_player.text = this.scores[0];
		this.score_opponent.text = this.scores[1];
	},
	tick: function(event) {
		this.stage.clear();
		this.draw_scores();
		this.ball.collision_check([this.player, this.opponent]);
		this.player.move(this.keymap);
		this.player.tick();
		this.ball.tick();
		this.opponent.tick(this.ball);
		this.line.tick();
		//console.log(this.scores);

		this.stage.update();
	}
});

module.exports = Game;
