
function LocalStorageManager() {
  this.gameStateKey = 'ShuzzleGameState';
}

LocalStorageManager.prototype.saveState = function(grid){
	var storage = window.localStorage;
	try {
		storage.setItem(this.gameStateKey, JSON.stringify(grid));
		return true;
	} catch (error) {
		return false;
	}
};

LocalStorageManager.prototype.getGameState = function () {
	var stateJSON = window.localStorage.getItem(this.gameStateKey);
	return JSON.parse(stateJSON);
};

LocalStorageManager.prototype.loadFromStorage = function () {
	
	var fromStorage =  this.getGameState();
	var cells = fromStorage.cells;
	var position = fromStorage.emptyposition;
	var size = fromStorage.size;
	
	return new Grid(size, cells, position);	
};
