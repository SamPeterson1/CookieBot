var AutoPlay = {};

Autoplay.run = function() {
	Game.ObjectsById[0].buy();
}

AutoPlay.autoPlayer = setInterval(AutoPlay.run, 300);
