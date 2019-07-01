var AutoPlay = {};
var buildingPP = [];		  
var nBuildingTypes = 3;

AutoPlay.calculatePP = function() {
	
	var iters = 0;
	for(var i in CM.Cache.Objects) { 
		buildingPP[iters] = CM.Cache.Objects[i].pp;
		iters ++;
	}
}

AutoPlay.tryBestBuy = function() {
	var minPP = buildingPP[0];
	var bestIndex = 0;
	var index = 0;
	var i;
	for(i = 0; i < buildingPP.length; i ++) {
		if(buildingPP[i] < minPP) {
			console.log("reee" + buildingPP[i]);
			bestIndex = index;
			minPP = buildingPP[i];
		} else {
			console.log(buildingPP[i]);
		}
		index ++;
	}
	
	console.log(bestIndex);
	if(Game.ObjectsById[bestIndex].price <= Game.cookies) {	
		Game.ObjectsById[bestIndex].buy();
	}
}

AutoPlay.run = function() {
	AutoPlay.calculatePP();
	AutoPlay.tryBestBuy();
}


AutoPlay.autoPlayer = setInterval(AutoPlay.run, 10000);
