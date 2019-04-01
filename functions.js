function getAllResults(diceList){
	return combiningFunction([new Face(0,0,0,0)], diceList);
}

function combiningFunction(results, diceList){
	if(diceList.length == 0){
		return results;
	}else{
		var faceList = diceList.pop().faceList;
		var nextSet = [];
		for(var i = 0; i < results.length; i++){
			for(var j = 0; j < faceList.length; j++){
				var combined = Face.combineFaces(results[i], faceList[j]);
				nextSet.push(combined);
			}
		}
		return combiningFunction(nextSet, diceList);
	}
}

function reduce(list){
	var map = new Map();
	var faceString;
	var faceCount;
	for(var i = 0; i < list.length; i++){
		faceString = list[i].toString();
		var mapVal = map.get(faceString);
		if(mapVal == null){
			faceCount = 0;
		}else{
			faceCount = mapVal + 1;
		}
		map.set(faceString, faceCount);
	}
	return map;
}

function mapToDie(map){
	var faceList = [];
	var mapKeys = Array.from(map.keys());
	for(var i = 0; i < mapKeys.length; i++){
		for(var j = 0; j < map.get(mapKeys[i]); j++){
			faceList.push(Face.fromString(mapKeys[i]));
		}
	}
	return new Die(faceList);
}