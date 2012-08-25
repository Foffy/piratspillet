// global variables
var c = document.getElementById('c');
ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;
var width = c.width;
var height = c.height;
var xDisp = 0; // if screen is too wide
var yDisp = 0; // if screen is too high
resizeCanvas();
window.addEventListener('resize', resizeCanvas,false);

// resizes the canvas to the current window parameters
// and calculates where to paint
function resizeCanvas(){
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	
	if(c.width <= c.height*(4/3)){
		width = c.width;
		height = (3/4)*width;
		xDisp = 0;
		yDisp = (c.height - height)/2;
	}else{
		height = c.height;
		width = (4/3)*height;
		yDisp = 0;
		xDisp = (c.width - width)/2;
	}
}

// clears the canvas for painting
function clear(){
	ctx.fillStyle = '#d0e7f9';
	ctx.beginPath();
	ctx.rect(0,0,c.width,c.height);
	ctx.closePath();
	ctx.fill();
}

// converts a percentage of the width to an exact x value
function pctToX(value){
	return xDisp + pctOf(value,width);
}

// converts a percentage of the height to an exact y value
function pctToY(value){
	return yDisp + pctOf(value,height);	
}

// simple method to get a percentage of something
function pctOf(value,total){
	return total/100*value;	
}

// draw an image from the given position with the given height and width
// (in percentages)
function drawImg(img, pctX, pctY, pctW, pctH){
	//ctx.drawImage(img, 
}

// draws a text starting with the upper left corner in the position given
// and width the given maximum width. It will break the text down if it
// is too wide and make new lines underneath. The font is also given relative
// to the screen size (width).
function drawText(text, pctX, pctY, pctW, pctFont){
	ctx.fillStyle = "black";
	//var splitted = text.split("\n");
	var fontH = pctOf(pctFont,width)
	ctx.font = "bold " + fontH + "px Arial";
	ctx.fillText(text, pctToX(pctX),pctToY(pctY) + fontH);
}

// draws a filled rectangle at the given position with the given width,
// height and color.
function drawRect(pctX, pctY, pctW, pctH, color){
		ctx.fillStyle = color;
		ctx.fillRect(pctToX(pctX),pctToY(pctY),pctToX(pctW)-xDisp,pctToY(pctH)-yDisp);
}


var names = [];

// the main gameloop function
var GameLoop = function(){
	clear();
	drawRect(0,0,100,100,"green");
	drawText("width="+width + ", height="+height+", ratio="+width/height,5,5,0,2.5);

	setTimeout(GameLoop, 1000 / 50);
}

GameLoop();

// name inputs

/*
var names = [];

var numPlayers = parseInt(prompt("How many players?",""));

for(var i = 1; i <= numPlayers; i++){
	names.push(prompt("What is the name of player "+i+"?",""));
}

*/






