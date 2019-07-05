var AutoPlay = {};
var buildingPP = [];	
var upgradePP = [];
var upgradeNames = [];
var clickyUpgrades;
var nBuildingTypes = 3;
var cookiesPC;
var autoclickCPS = 50;
var minigames = [2,6,7];
var cpsMult = 0;
var kittenTypes = ["helpers", "workers", "engineers", "overseers", "managers", "accountants", "specialists", "experts", "consultants", "assistants to the regional manager", "marketeers", "analysts", "angels"];
var kittenFactors = [0.1, 0.125, 0.15, 0.175, 0.2, 0.2, 0.2, 0.2, 0.2, 0.175, 0.15, 0.1];

AutoPlay.calculatePP = function() {
	
	buildingPP = [];	
	upgradePP = [];
	upgradeNames = [];
	
	var iters = 0;
	for(var i in Game.ObjectsById) { 
		buildingPP[iters] = Math.max(Game.cookies - Game.ObjectsById[i].price, 0)/Game.cookiesPs + Game.ObjectsById[i].price/AutoPlay.getCps(i);
		iters ++;
	}
	
	
	for(var i in CM.Cache.Upgrades) { 
		if(i == "Reinforced index finger") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, autoclickCPS + Game.ObjectsById[0].amount);
		if(i == "Carpal tunnel prevention cream") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, 2*(autoclickCPS + Game.ObjectsById[0].amount));
		if(i == "Ambidextrous") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, 4*(autoclickCPS + Game.ObjectsById[0].amount));
		if(i == "Thousand fingers") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, (0.1*(Game.BuildingsOwned-Game.ObjectsById[0].amount))*(autoclickCPS+Game.ObjectsById[0].amount));
		if(i == "Million fingers") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, (0.5*(Game.BuildingsOwned-Game.ObjectsById[0].amount))*(autoclickCPS+Game.ObjectsById[0].amount));
		if(i == "Billion fingers") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, (5*(Game.BuildingsOwned-Game.ObjectsById[0].amount))*(autoclickCPS+Game.ObjectsById[0].amount));
		if(i == "Trillion fingers") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, (50*(Game.BuildingsOwned-Game.ObjectsById[0].amount))*(autoclickCPS+Game.ObjectsById[0].amount));
		if(i == "Quadrillion fingers") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, (500*(Game.BuildingsOwned-Game.ObjectsById[0].amount))*(autoclickCPS+Game.ObjectsById[0].amount));	
		if(i == "Quintillion fingers") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, (5000*(Game.BuildingsOwned-Game.ObjectsById[0].amount))*(autoclickCPS+Game.ObjectsById[0].amount));
		if(i == "Sextillion fingers") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, (50000*(Game.BuildingsOwned-Game.ObjectsById[0].amount))*(autoclickCPS+Game.ObjectsById[0].amount));
		if(i == "Septillion fingers") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, (500000*(Game.BuildingsOwned-Game.ObjectsById[0].amount))*(autoclickCPS+Game.ObjectsById[0].amount));
		if(i == "Octillion fingers") CM.Cache.Upgrades[i].pp = AutoPlay.UpgradePP(i, (5000000*(Game.BuildingsOwned-Game.ObjectsById[0].amount))*(autoclickCPS+Game.ObjectsById[0].amount));
				
		if(i == "Plastic mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Iron mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Titanium mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Adamantium mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Unobtainium mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Eludium mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Wishalloy mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Fantasteel mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Nevercrack mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Armythril mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Technobsidian mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		if(i == "Plasmarble mouse") upgradePP[iters] = AutoPlay.UpgradePP(i, 0.01*Game.cookiesPs*autoclickCPS);
		
		for(ii = 0; ii < Game.UpgradesInStore.length; ii ++) {
			if(Game.UpgradesInStore[ii].name == i) {
				upgradeNames[iters] = i;
				upgradePP[iters] = CM.Cache.Upgrades[i].pp;
				iters ++;
			}
		}
	}
}

AutoPlay.UpgradePP = function(name, bonus) {
	var cost = 0;
	var ii;
	for(ii = 0; ii < Game.UpgradesById.length; ii ++) {
		if(Game.UpgradesById[ii].name == name) {
			cost = Game.UpgradesById[ii].basePrice;
		}
	}
	return ((cost-Game.cookies, 0)/Game.cookiesPs) + cost/bonus; 
}

AutoPlay.useLumps = function() {
	
	for(var id in minigames) {
		if(Game.ObjectsById[minigames[id]].level == 0 && Game.lumps > 0) {
			Game.ObjectsById[minigames[id]].levelUp();
			break;
		}
	}
	
	if(Game.ObjectsById[2].level < 7 && Game.lumps > Game.ObjectsById[2].level) {
		Game.ObjectsById[2].levelUp();
	}
	
	if(Game.lumps > 100) {
		var r = Game.lumps - 100;
		var pp = [];
		
		for(var building in Game.ObjectsById) {
			if(r >= building.level + 1) {
				var val = (building.level+1);
			}
		}
	}
}

AutoPlay.getCursorCps = function() {
	var cps = 1;
	
			
	if(Game.Has("Reinforced index finger")) cps *= 2;
	if(Game.Has("Carpal tunnel prevention cream")) cps *= 2;
	if(Game.Has("Ambidextrous")) cps *= 2;
	if(Game.Has("Thousand fingers")) cps += 0.1 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Million fingers")) cps += 0.5 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Billion fingers")) cps += 5 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Trillion fingers")) cps += 50 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Quadrillion fingers")) cps += 500 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Quintillion fingers")) cps += 5000 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Sextillion fingers")) cps += 50000 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Septillion fingers")) cps += 500000 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	if(Game.Has("Octillion fingers")) cps += 5000000 * (Game.BuildingsOwned - Game.ObjectsById[0].amount);
	
	return cps;
}
			
AutoPlay.updateCpC = function() {
	var CpC = AutoPlay.getCursorCps();
		
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

AutoPlay.goldenCookies2 = function() {
	var sh = Game.shimmers;
	
	if(sh.length > 0) sh[0].pop();
}

AutoPlay.doLumps = function() {
	var age = Date.now() - Game.lumpT;
	
	if(age > Game.lumpRipeAge) Game.harvestLumps(1, false);
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
	var upgd = Game.UpgradesInStore[0];
	if(Game.UpgradesInStore.length >= 1) {
		if((upgd.name == "Lucky day" || upgd.name == "Serendipity" || upgd.name == "Get lucky") && Game.UpgradesInStore[0].baseCost < Game.cookies) {
			Game.UpgradesInStore[0].buy();
		}
	}
	if(Game.UpgradesInStore.length >= 2) {
		upgd = Game.UpgradesInStore[1];
		if((upgd.name == "Lucky day" || upgd.name == "Serendipity" || upgd.name == "Get lucky") && Game.UpgradesInStore[1].baseCost < Game.cookies) {
			Game.UpgradesInStore[1].buy();
		}
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
		var i;
		console.log("Building " + minPP + " < Upgrade " + minUpgradePP + " " + upgradeNames[bestUpgradeIndex]);
		for(i = 0; i < Game.UpgradesInStore.length; i ++) {
			if(Game.UpgradesInStore[i].name == upgradeNames[bestUpgradeIndex]) {
				console.log(Game.UpgradesInStore[i].name);
			}
			if(Game.UpgradesInStore[i].name == upgradeNames[bestUpgradeIndex] && Game.UpgradesInStore[i].basePrice <= Game.cookies) {
				Game.UpgradesInStore[i].buy();
			}
		}
	}
}

AutoPlay.click = function() {Game.ClickCookie();}

AutoPlay.run = function() {
	
	if(Game.BuildingsOwned == 0 && Game.cookies >= 15) {
		Game.ObjectsById[0].buy();
	}
	
	AutoPlay.calculatePP();
	AutoPlay.tryBestBuy();
	AutoPlay.goldenCookies2();
	AutoPlay.updateCpsMult();
	//Game.ClickCookie();
}

AutoPlay.totalCps = function(id) {
	var base = Game.ObjectsById[id].cps(Game.ObjectsById[id]);
	return base * cpsMult * Game.ObjectsById[id].amount;
}
	
AutoPlay.getCps = function(id) {
	var base = Game.ObjectsById[id].cps(Game.ObjectsById[id]);
	return base * cpsMult;
}

AutoPlay.updateCpsMult = function() {
	
	var mult = 1;
	
	//Add cookie multipliers
	
	for(var i in Game.cookieUpgrades) {
		var me = Game.cookieUpgrades[i];
		if(Game.Upgrades[me.name].bought) mult *= (1+(Game.Upgrades[me.name].power*0.01));
	}
	
	//Add kitten multipliers
	
	var kittenMult = 1;
	var index = 0;
	
	for(var i in kittenTypes) {
		var fullName = "Kitten " + kittenTypes[i];
		console.log(fullName);
		if(Game.Upgrades[fullName].bought) kittenMult *= (1+Game.milkProgress*kittenFactors[index]);
		index ++;
	}
	
	mult *= kittenMult;
	cpsMult = mult;
}
	
AutoPlay.autoClicker = setInterval(AutoPlay.click, (1000/autoclickCPS));
AutoPlay.autoPlayer = setInterval(AutoPlay.run, 300);
