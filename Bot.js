var AutoPlay = {};
var buildingPP = [];		  
var nBuildingTypes = 3;

AutoPlay.calculatePP = function() {
	
	var iters = 0;
	for(var i in CM.Cache.Objects) { 
		buildingPP[iters] = CM.Cache.Objects[i].pp;
		console.log(buildingPP[iters]);
		iters ++;
	}
}

AutoPlay.run = function() {
	AutoPlay.calculatePP();
}


AutoPlay.autoPlayer = setInterval(AutoPlay.run, 10000);
