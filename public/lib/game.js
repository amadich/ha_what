const config = {
	width: innerWidth,
	height: innerHeight,
	physics: {
		default: "arcade",
		arcade: {debug: false}
	},
	backgroundColor: "999",
	scene: [boot]
}

var game = new Phaser.Game(config);
let player;
let stone;
let cursors;
let monster0;
let i;