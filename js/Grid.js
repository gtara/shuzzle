function Grid (size, cells, emptyPosition) {
  this.size = size;
  this.cells = (cells!=null) ? cells : this.initcells();
  this.emptyPosition = (emptyPosition != null) ? emptyPosition : new Position(0,0);
}


Grid.prototype.initcells = function() {
	var cells = [];
	var value = 0;
	for (var x = 0; x < this.size; x++) {
		var row = cells[x] = [];
		for (var y = 0; y < this.size; y++) {
			var tile = new Tile(new Position (x, y), value++);
			row.push(tile);			
		}
	}
	return cells;
};



Grid.prototype.isValidMove = function (fingerPosition) {
	var result = false;
	result = ((fingerPosition.x == this.emptyPosition.x) && 
				(fingerPosition.y != this.emptyPosition.y)) || 
	
	((fingerPosition.x != this.emptyPosition.x) && 
				(fingerPosition.y == this.emptyPosition.y)) ;
	return result;
};

Grid.prototype.generateRandomShift = function () {
	//e.g. if we are moving horizontal cells, and size is 5,
	//there are 4 new positions for the empty cell
	//same holds for vertical
	//x are rows
	//y are columns
	
	var numberOfPossibleNewPositions = this.size * 2 - 2;
	var magic = Math.floor(Math.random() * numberOfPossibleNewPositions);
	
	//we are changing column
	if (magic < this.size - 1) {		
		if (magic < this.emptyPosition.y) 
			return new Position (this.emptyPosition.x, magic);
		else return new Position(this.emptyPosition.x, magic + 1);
	}
	//we are changing the row
	if (magic >= this.size - 1) {
		magic = magic - this.size + 1;
		if (magic < this.emptyPosition.x) 
			return new Position (magic, this.emptyPosition.y);
		else return new Position(magic + 1, this.emptyPosition.y);
	}
};

Grid.prototype.shuffleGrid = function (howManyTimes) {
	for (var i = 0; i < howManyTimes; i++)	{
		this.shiftCells(this.generateRandomShift());
	}
};

Grid.prototype.shiftCells = function (fingerPosition) {
	
	if (this.isValidMove(fingerPosition)) {
		var previousEmpty = new Position(this.emptyPosition.x, this.emptyPosition.y);		
		//x are rows, y are columns		
		//when moving vertically, column is the same
		if (previousEmpty.y == fingerPosition.y) 
		{
			var y = previousEmpty.y;
			if (fingerPosition.x > previousEmpty.x) {			
				for (var x = previousEmpty.x; x < fingerPosition.x; x++) {
					this.cells[x][y].value = this.cells[x+1][y].value;				
				}							
			} else {
				for (var x = previousEmpty.x; x > fingerPosition.x; x--) {
					this.cells[x][y].value = this.cells[x-1][y].value;
				}
			}				
		}
		
		if (previousEmpty.x == fingerPosition.x) {
			var x = previousEmpty.x;
			
			if (fingerPosition.y > previousEmpty.y) {					
					for (var y = previousEmpty.y; y < fingerPosition.y; y++) {
						this.cells[x][y].value = this.cells[x][y+1].value;				
					}								
			}
			else {
				for (var y = previousEmpty.y; y > fingerPosition.y; y--) {
					this.cells[x][y].value = this.cells[x][y-1].value;
				}
			}
		}
		this.cells[fingerPosition.x][fingerPosition.y].value = 0;	
		this.emptyPosition = fingerPosition;
		
	}
	
};


Grid.prototype.print = function() {
	for (var x = 0; x < this.size; x++) {
		var row = '';
		for (var y = 0; y < this.size; y++) {	
			var tile = this.cells[x][y];
			var textTile = tile.serialize();
			row = row + ' ' + textTile;
		}
		console.log (row + '\n');
	}			
};
