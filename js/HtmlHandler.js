//HtmlHandler clears/creates the html inside the container
function HtmlHandler () {
	this.htmlContainer = document.querySelector("#contentContainer");
	
};

HtmlHandler.prototype.clearContainer = function (container) {
	while (container.firstChild) {
	    container.removeChild(container.firstChild);
	}
};

HtmlHandler.prototype.applyClasses = function (element, classes) {
	  element.setAttribute("class", classes.join(" "));
};

HtmlHandler.prototype.addHtmlForGrid = function(grid) {
	var that = this;
	window.requestAnimationFrame(function() {
	that.clearContainer(that.htmlContainer);
	
	var table = document.createElement("table");	
	
	for (var x = 0; x < grid.size; x++) {
		var tr = document.createElement('tr');		
		for (var y = 0; y < grid.size; y++) {
			var td = document.createElement('td');
			var div = document.createElement('div');
					
			var number = grid.cells[x][y].value;
			var numberString = '';
			if (number == 0)
				{
					numberString = (x * grid.size + y).toString();
					if (x == 0 && y ==0) numberString = '';
				}
			else numberString = number.toString();
			
			if (number == 0)
				{
				div.setAttribute("class", "cell");
					
				}
			else  { 
				div.setAttribute("class","tile");				
			}
			div.textContent = numberString;
			td.appendChild(div);
			tr.appendChild(td);
		}
		table.appendChild(tr);		
	}	
	that.htmlContainer.appendChild(table);
	var gridWidth = that.htmlContainer.clientWidth;	  
	var cellWidth = Math.floor((gridWidth ) / grid.size - 8) ;

	$(".tile").css("width", cellWidth + "px");
	$(".tile").css("height", cellWidth + "px");
	$(".cell").css("width", cellWidth + "px");
	});
	
		
};


