var AutoPlay = {};
var buildingPP = [];	
var upgradePP = [];
var clickyUpgrades
var nBuildingTypes = 3;
var cookiesPC;
var autoclickCPS = 50;

AutoPlay.calculatePP = function() {
	
	var iters = 0;
	for(var i in CM.Cache.Objects) { 
		buildingPP[iters] = CM.Cache.Objects[i].pp;
		iters ++;
	}
	
	iters = 0;
	
	for(var i in CM.Cache.Upgrades) { 
		if(i == "Ambidextrous") {
			var cost = 0;
			var ii;
			for(ii = 0; ii < Game.UpgradesById.length; ii ++) {
				if(Game.UpgradesById[ii].name == "Ambidextrous") {
					cost = Game.UpgradesById[ii].basePrice;
				}
			}
			var bonus = 2*autoclickCPS;
			CM.Cache.Upgrades[i].pp = (cost-Game.cookies, 0)/Game.cookiesPs) + cost/bonus; 
			console.log(CM.Cache.Upgrades[i].pp + " YA EET " + bonus + " " + cost);
		}
		upgradePP[iters] = CM.Cache.Upgrades[i].pp;
		iters ++;
	}
}

AutoPlay.updateCpC = function() {
	var CpC = 1;
	
			
	if(Game.Has("Reinforced index finger")) CpC *= 2;
	if(Game.Has("Carpal tunnel prevention cream")) CpC *= 2;
	if(Game.Has("Ambidextrous")) CpC *= 2;
	if(Game.Has("Thousand fingers")) CpC += 0.1 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Million fingers")) CpC += 0.5 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Billion fingers")) CpC += 5 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Trillion fingers")) CpC += 50 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Quadrillion fingers")) CpC += 500 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Quintillion fingers")) CpC += 5000 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Sextillion fingers")) CpC += 50000 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Septillion fingers")) CpC += 500000 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Octillion fingers")) CpC += 5000000 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
		
	var cpsMult = 1;
			
	if(Game.Has("Plastic mouse")) cpsMult += 0.01;
	if(Game.Has("Iron mouse")) cpsMult += 0.01;
	if(Game.Has("Titanium mouse")) cpsMult += 0.01;
	if(Game.Has("Adamantium mouse")) cpsMult += 0.01;
	if(Game.Has("Unobtainium mouse")) cpsMult += 0.01;
	if(Game.Has("Eludium mouse")) cpsMult += 0.01;
	if(Game.Has("Wishalloy mouse")) cpsMult += 0.01;
	if(Game.Has("Fantasteel mouse")) cpsMult += 0.01;
	if(Game.Has("Nevercrack mouse")) cpsMult += 0.01;
	if(Game.Has("Armythril mouse")) cpsMult += 0.01;
	if(Game.Has("Technobsidian mouse")) cpsMult += 0.01;
	if(Game.Has("Plasmarble mouse")) cpsMult += 0.01;
			
	CpC += cpsMult * Game.cookiesPs;
			
	this.cookiesPC = CpC;
}
			    
AutoPlay.tryBestBuy = function() {
	var minPP = buildingPP[0];
	var bestIndex = 0;
	var bestUpgradeIndex = 0;
	var index = 0;
	var i;
	for(i = 0; i < buildingPP.length; i ++) {
		if(buildingPP[i] < minPP) {
			bestIndex = index;
			minPP = buildingPP[i];
		}
		index ++;
	}
	
	var minUpgradePP = upgradePP[0];
	index = 0;
	
	for(i = 0; i < upgradePP.length; i ++) {
		if(upgradePP[i] < minUpgradePP && upgradePP[i] > 0) {
			bestUpgradeIndex = index;
			minUpgradePP = upgradePP[i];
		}
		index ++;
	}
	
	if(minPP < minUpgradePP) {
		console.log("Building " + minPP + " > Upgrade " + minUpgradePP);
		if(Game.ObjectsById[bestIndex].price <= Game.cookies) {	
			Game.ObjectsById[bestIndex].buy();
		}
	} else {
		console.log("Building " + minPP + " < Upgrade " + minUpgradePP);
		if(Game.UpgradesInStore[bestUpgradeIndex].basePrice <= Game.cookies) {	
			Game.UpgradesInStore[bestUpgradeIndex].buy();
		}
	}
}

AutoPlay.click = function() {Game.ClickCookie;}

AutoPlay.run = function() {
	AutoPlay.calculatePP();
	AutoPlay.tryBestBuy();
	Game.ClickCookie();
}

AutoPlay.autoClicker = setInterval(AutoPlay.click, 50);
AutoPlay.autoPlayer = setInterval(AutoPlay.run, 300);
