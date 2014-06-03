
function MouseHandler () {
	this.events = {};
};
 
MouseHandler.prototype.getMouseClickPosition = function (event) {
	
	var element = event.currentTarget;
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    
    xPosition = event.clientX - xPosition;
    yPosition = event.clientY - yPosition;
    this.executeCallback("move", new Position(yPosition, xPosition));
    
};


MouseHandler.prototype.addCallback = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

MouseHandler.prototype.executeCallback = function (eventName, data) {
	  var callbacks = this.events[eventName];
	  if (callbacks) {
	    callbacks.forEach(function (callback) {
	      callback(data);
	    });
	 }
};