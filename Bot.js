var AutoPlay = {};
 
AutoPlay.run = function() {
	Game.cookiesPs = 9999999999999999999999999999;
}

AutoPlay.autoPlayer = setInterval(AutoPlay.run, 300);
