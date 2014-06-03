function Position(x, y) {
	this.x = x;
	this.y = y;
}

Position.prototype.serialize = function () {
	return this.x.toString() +':' + this.y.toString();
};

function Tile (position, value) {
	this.x = position.x;
	this.y = position.y;
	this.value = value ? value : 0;
}

Tile.prototype.serialize = function () {
	return this.x.toString() + ':' + this.y.toString() + ':' + this.value.toString();	
};



