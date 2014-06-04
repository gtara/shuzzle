function GameManager (size, ProvidedHtmlHandler, ProvidedStorageManager, ProvidedInputManager) {
	this.size = size;
	this.htmlHandler = new ProvidedHtmlHandler;
	this.storageManager = new ProvidedStorageManager;
	this.mouseHandler = new MouseHandler;	  
	
	
	this.grid = new Grid(this.size, null, null);
	this.grid.shuffleGrid(this.size * this.size * this.size);	
	this.storageManager.saveState(this.grid);	
	this.htmlContainer = document.querySelector("#contentContainer");
	this.htmlContainer.addEventListener("click", this.mouseHandler.getMouseClickPosition.bind(this.mouseHandler), false);
	this.mouseHandler.addCallback("move", this.move.bind(this));
	this.moves = 0;
	this.refresh();	

};

GameManager.prototype.calculateWhichTileWasTouched= function(positionInPixels) {			
	var gridWidth = this.htmlContainer.clientWidth;	  
	var cellWidth = Math.floor((gridWidth ) / this.size) ;
	var divX = Math.floor (positionInPixels.x / cellWidth) ;
	var divY = Math.floor (positionInPixels.y / cellWidth) ;
	return new Position(divX, divY);
};

GameManager.prototype.move = function (positionInPixels) {
	this.moves += 1;
	var tilePosition = this.calculateWhichTileWasTouched(positionInPixels) ;	
	this.grid.shiftCells(tilePosition);
	this.refresh();
};

GameManager.prototype.refresh = function () {	
	this.htmlHandler.addHtmlForGrid(this.grid, this.moves);
};
