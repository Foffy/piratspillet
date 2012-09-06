// global variables
var c = document.getElementById('c');
ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;
var width = c.width;
var height = c.height;
var xDisp = 0; // if screen is too wide
var yDisp = 0; // if screen is too high
var mousePos = [0,0];
var mouseClicked = [0,0];
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

// get mouse coordinates
function getMousePosition(evt){	
	var rect = c.getBoundingClientRect(), root = document.documentElement;
	var mouseX = event.clientX - rect.top - root.scrollTop-c.offsetLeft-parseInt(xDisp);
	var mouseY = event.clientY - rect.left - root.scrollLeft-c.offsetTop-parseInt(yDisp);
	mousePos[0] = mouseX;
	mousePos[1] = mouseY;
}

function getMouseClick(){
	mouseClicked[0] = xToPct(mousePos[0]);
	mouseClicked[1] = yToPct(mousePos[1]);	
}
	

// converts a percentage of the width to an exact x value
function pctToX(value){
	return xDisp + pctOf(value,width);
}

// converts a percentage of the height to an exact y value
function pctToY(value){
	return yDisp + pctOf(value,height);	
}

// converts a x value to a percentage of the height
function xToPct(value){
	return value*100/width;
}

// converts a y value to a percentage of the height
function yToPct(value){
	return value*100/height;
}

// simple method to get a percentage of something
function pctOf(value,total){
	return (total/100.0)*value;
}

// draw an image from the given position with the given width(in percentages),
// the hight will be set to keep the aspect ratio as original.
// 
function drawImage(img, pctX, pctY, pctW, cropX, cropY, cropXWidth, cropYHeight){
	//drawText("X="+pctToX(pctX)+" Y="+pctToY(pctY),5,5,0,2.5);
	var ratio = img.height/img.width;
	var width = pctToX(pctW)-xDisp;
	if(typeof(cropX)==='undefined'){
		ctx.drawImage(img, pctToX(pctX), pctToY(pctY),width,width*ratio);
	}
	else{
		ctx.drawImage(img,cropX, cropY, cropXWidth, cropYHeight, pctToX(pctX), pctToY(pctY), width,width*ratio);
	}
}

function colorString(array){
	if(typeof array == "string") return array;
	
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
function drawRect(pctX, pctY, pctW, pctH, color, border){
		ctx.fillStyle = colorString(color);
		ctx.fillRect(pctToX(pctX),pctToY(pctY),pctToX(pctW)-xDisp,pctToY(pctH)-yDisp);
		if(border){
			ctx.lineWidth = 1;
			ctx.strokeStyle = "black";
			ctx.stroke();	
		}
}

function drawCircle(pctX, pctY, pctR, color, border){
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
var curState = null;
var diceClicked = 0;
var leftToActivate = [];

var whorebank = 5;
var goldbank = 10;
var silverbank = 10;

var boardPositions = [[50,16],[65,17],[81,24],[88,44],[88,63],[82,82],[65,89],[50,91],[34,89],[19,84],[11,63],[11,43],[18,21],[34,16]]; // in percentages
var tilePct = 13;
var playerRadius = 3.5;
var coinSmallSize = 2;
var smallCoinDisplacement = 0.35;
var whoreSmallSize = 2;
var whoreDisplacement = 0.35;
var skeletonSmallSize = 2;
var skeletonDisplacement = 0.35;
var diceSize = 5;
var imgBg = new Image();
imgBg.src = "images/background.jpg";

var imgGoldSmall = new Image();
imgGoldSmall.src = "images/gold_small.png";

var imgSilverSmall = new Image();
imgSilverSmall.src = "images/silver_small.png";

var imgWhoreSmall = new Image();
imgWhoreSmall.src = "images/whore_small.png";

var imgSkeletonSmall = new Image();
imgSkeletonSmall.src = "images/skeleton_small.png";

var imgDiceIdle = new Image();
imgDiceIdle.src = "images/icon_start.png";

// classes
function Player(name){
	this.name = name;
	this.active = true;
	this.gold = 0;
	this.silver = 0;
	this.whore = 0;
	this.skeleton = 0;
	this.pos = 0;
	this.color = [Math.random()*200+55,Math.random()*200+55,Math.random()*200+55]; // Only non-dark colors
	this.offset = [Math.random()*8-4,Math.random()*8-4]; // Give player a random offset on its tile
	
	// get the coordinates in pct for the players center
	this.getPosition = function(){
		var x,y;
		return{
			 x: boardPositions[this.pos][0]+this.offset[0],
			 y: boardPositions[this.pos][1]+this.offset[1]
		};
	}
	
	this.draw = function(){
		var coords = boardPositions[this.pos];
		var center = [coords[0]+this.offset[0],coords[1]+this.offset[1]];
		this.drawXY(center[0],center[1]);
	}
	this.drawXY = function(x, y){
		var textsize = 1.5
		var textheight = pctOf(textsize,width);
		ctx.font = "bold " + textheight + "px Arial";
		var dim = ctx.measureText(this.name);
		var textwidth = dim.width;
		
		drawCircle(x,y,playerRadius,this.color,true);
		drawText(this.name,x-(textwidth/width)*50,y-textsize*0.75,0,textsize);
		
		// Draw coins next to portrait
		var coinPosY = y+playerRadius-coinSmallSize*0.75;
		
		for (var i = 0;i < this.gold;i++){		
			drawImage(imgGoldSmall,x-playerRadius-coinSmallSize/2,coinPosY,coinSmallSize);
			coinPosY -= coinSmallSize*smallCoinDisplacement;
		}
		for (var i = 0; i < this.silver; i++){
			drawImage(imgSilverSmall,x-playerRadius-coinSmallSize/2,coinPosY,coinSmallSize);
			coinPosY -= coinSmallSize*smallCoinDisplacement;
		}
		
		// Draw Whore coins next to portrait
		var whorePosY = y+playerRadius-whoreSmallSize*0.75;
		for (var i = 0; i < this.whore; i++){
			drawImage(imgWhoreSmall,x+playerRadius-whoreSmallSize/2,whorePosY,whoreSmallSize);
			whorePosY -= whoreSmallSize*whoreDisplacement;
		}
		
		// Draw skeletons next to portrait
		var skeletonPosY = y-playerRadius-skeletonSmallSize*0.75;
		for (var i = 0; i < this.whore; i++){
			drawImage(imgSkeletonSmall,x+playerRadius-skeletonSmallSize/2,skeletonPosY,skeletonSmallSize);
			skeletonPosY += skeletonSmallSize*skeletonDisplacement;
		}
	}
}

// all the possible states in the game
State = {
	ROLL : "To Roll",
	LANDED : "Landed on a tile",
	DRINK_DIGGED : "Drink for digged down coins",
	COINS_BOUGHT : "Coins for sips",
	SELECT_SWITCH : "Switch coins",
	SELECT_CANNON : "Take randomly",
	DIG_DOWN : "Dig down coins",
	DIG_AMOUNT : "How much to dig down",
	IN_HARBOUR : "Give sips away",
	GAME_WON : "Someone won the game"
}

// the main gameloop function
var GameLoop = function(){
	clear();
	drawboard();
	if(curState != null) {drawState(); /* hej jimmy */ takeInput(); } 

	setTimeout(GameLoop, 1000 / 50);
}

// draws the basic parts of the board that shall be visible
// in all states
function drawboard(){
	drawImage(imgBg,0, 0, 100);
	for(var i = 0; i < players.length; i++){
		players[i].draw();	
	}	
}

// draws extra gui depending on the current game state
function drawState(){
	switch(curState){
		case State.ROLL:{
			drawBox(players[curPlayer]);
			if(diceClicked == 0){
				drawImage(imgDiceIdle,50-diceSize/2,50-diceSize*0.75,diceSize);
			}
		}
	}
}

function takeInput(){
	switch(curState){
		case State.ROLL:{
			c.addEventListener('mousemove',getMousePosition,false);
			c.addEventListener('click',getMouseClick,false);
		}	
	}
}

// INITIALISATION
GameLoop();

// name inputs
var numPlayers = parseInt(prompt("How many players?",""));

for(var i = 1; i <= numPlayers; i++){
	players.push(new Player(prompt("What is the name of player "+i+"?","")));
}
curState = State.ROLL;

// GAME METHODS

// Gives a string listing the players
// on the current tile
function onTileString(){
	var matches = [players[curPlayer]];
	
	// gather players
	for(var i = 0; i < players.length; i++){
		if(i != curPlayer && players[i].pos == players[curPlayer].pos){
			matches.push(players[i]);
		}
	}
	matches.reverse();
	
	// list them
	var result = matches.pop().name;
	while(matches.length > 0){
		if(matches.length > 1){
			result += ", "+matches.pop().name;
		}else{
			result += " and "+matches.pop().name;
		}
	}
	return result;
}

function drawBox(player){
	var rectX = pctToX(30);
	var rectY = pctToY(30);
	var rectW = pctToX(40)-xDisp;
	var rectH = pctToY(40)-yDisp;
	
	ctx.fillStyle = "black";
	ctx.fillRect(rectX,rectY,rectW,rectH);
	if(player != null){
		drawCircle(30,30,playerRadius+0.75,"white",true);
	}
	ctx.fillStyle = "white";
	ctx.fillRect(rectX+1, rectY+1, rectW-2,rectH-2);
	
	player.drawXY(30,30);
}



