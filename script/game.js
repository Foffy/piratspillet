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

// THESE ARE ALL UTILITY METHODS AND CONTAIN NO GAMEPLAY

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
var bgcolor = colorString([162,206,231]);
function clear(){
	ctx.fillStyle = bgcolor;
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
	return (total/100.0)*value;
}

// draw an image from the given position with the given width(in percentages),
// the hight will be set to keep the aspect ratio as original.
function drawImage(img, pctX, pctY, pctW){
	//drawText("X="+pctToX(pctX)+" Y="+pctToY(pctY),5,5,0,2.5);
	var ratio = img.height/img.width;
	var width = pctToX(pctW)-xDisp;
	ctx.drawImage(img, pctToX(pctX), pctToY(pctY),width,width*ratio);
}

function colorString(array){
	if(array.length > 3){
		return "rgba("+parseInt(array[0])+","+parseInt(array[1])+","+parseInt(array[2])+", "+parseInt(array[3])+")"
	}else{
		return "rgba("+parseInt(array[0])+","+parseInt(array[1])+","+parseInt(array[2])+", 255)"
	}
}

// draws a text starting with the upper left corner in the position given
// and width the given maximum width. It will break the text down if it
// is too wide and make new lines underneath. The font is also given relative
// to the screen size (width).
function drawText(text, pctX, pctY, pctW, pctFont){
	ctx.fillStyle = "black";
	var fontH = pctOf(pctFont,width)
	ctx.font = "bold " + fontH + "px Arial";
	ctx.fillText(text, pctToX(pctX),pctToY(pctY) + fontH);
}

// draws a filled rectangle at the given position with the given width,
// height and color.
function drawRect(pctX, pctY, pctW, pctH, color){
		ctx.fillStyle = colorString(color);
		ctx.fillRect(pctToX(pctX),pctToY(pctY),pctToX(pctW)-xDisp,pctToY(pctH)-yDisp);
}

function drawCircle(pctX, pctY, pctR, border, color){
		ctx.beginPath();
		ctx.arc(pctToX(pctX),pctToY(pctY),pctOf(pctR,width),0,2*Math.PI,false);
		ctx.fillStyle = colorString(color);
		ctx.fill();
		
		if(border){
			ctx.lineWidth = 1;
			ctx.strokeStyle = "black";
			ctx.stroke();	
		}
}

// THE ACTUAL GAME

// constants and stuff
var players = [];
var curPlayer = 0;
var curState = 0;

var board_positions = [[50,16],[65,17],[81,24],[88,44],[88,63],[82,82],[65,89],[50,91],[34,89],[19,84],[11,63],[11,43],[18,21],[34,16]]; // in percentages
var tilePct = 13;
var playerRadius = 3.5;
var imgBg = new Image();
imgBg.src = "images/background.jpg";

function Player(name){
	this.name = name;
	this.active = true;
	this.gold = 0;
	this.silver = 0;
	this.whore = 0;
	this.skeleton = 0;
	this.pos = 0;
	this.color = [Math.random()*200+55,Math.random()*200+55,Math.random()*200+55];
	this.offset = [Math.random()*8-4,Math.random()*8-4];
	
	this.draw = function(){
		var coords = board_positions[this.pos];
		var center = [coords[0]+this.offset[0],coords[1]+this.offset[1]];
		
		var textsize = 1.5
		var textheight = pctOf(textsize,width);
		ctx.font = "bold " + textheight + "px Arial";
		var dim = ctx.measureText(this.name);
		var textwidth = dim.width;
		
		drawCircle(center[0],center[1],playerRadius,true,this.color);
		drawText(this.name,center[0]-(textwidth/width)*50,center[1]-textsize*0.75,0,textsize);
	}
}

// the main gameloop function
var GameLoop = function(){
	clear();
	drawImage(imgBg,0, 0, 100);
	for(var i = 0; i < players.length; i++){
		players[i].draw();	
	}

	setTimeout(GameLoop, 1000 / 50);
}

GameLoop();

// INITIALISATION

// name inputs
var numPlayers = parseInt(prompt("How many players?",""));

for(var i = 1; i <= numPlayers; i++){
	players.push(new Player(prompt("What is the name of player "+i+"?","")));
}




