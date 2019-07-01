var AutoPlay = {};
int[] buildingPP = new int[2];
 
AutoPlay.run = function() {
	AutoPlay.calculatePP();
}

void AutoPlay.calculatePP() {
	var building = Game.ObjectsById[AutoPlay.cursorCPS()-1];
	building.buy();
}

int AutoPlay.cursorCPS() {
	return 1;
}

AutoPlay.autoPlayer = setInterval(AutoPlay.run, 300);
