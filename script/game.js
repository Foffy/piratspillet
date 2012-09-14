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
var mouseClicked = null;
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

function setFont(pctFont){
	ctx.font = pctOf(pctFont,width) + "px Kingthings";	
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
	var mouseX = evt.clientX - rect.top - root.scrollTop-c.offsetLeft;
	var mouseY = evt.clientY - rect.left - root.scrollLeft-c.offsetTop;
	mousePos[0] = mouseX;
	mousePos[1] = mouseY;
}

function getMouseClick(){
	mouseClicked = [];
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
	return ((value-xDisp)/width)*100;
	//return value*100/width;
}

// converts a y value to a percentage of the height
function yToPct(value){
	return ((value-yDisp)/height)*100;
	//return value*100/height;
}

// simple method to get a percentage of something
function pctOf(value,total){
	return (total/100.0)*value;
}

// draw an image from the given position with the given width(in percentages),
// if sizeRatio is given, the height will be calculated from that.
// Otherwise the hight will be set to keep the aspect ratio as original,
// 
function drawImage(img, pctX, pctY, pctW, cropX, cropY, cropXWidth, cropYHeight, sizeRatio){
	//drawText("X="+pctToX(pctX)+" Y="+pctToY(pctY),5,5,0,2.5);
	var ratio = img.height/img.width;
	var width = pctToX(pctW)-xDisp;
	if(typeof(cropX)==='undefined'){
		ctx.drawImage(img, pctToX(pctX), pctToY(pctY),width,width*ratio);
	}
	else{
			if(typeof(sizeRatio==='number')){
				var ratio = sizeRatio;
			}
		ctx.drawImage(img,cropX, cropY, cropXWidth, cropYHeight, pctToX(pctX), pctToY(pctY), width, width*ratio);
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
function drawText(text, pctX, pctY, pctW, pctFont, allign, wordwrap){
	ctx.fillStyle = "black";
	var fontH = pctOf(pctFont,width)
	//ctx.font = "bold " + fontH + "px Arial";
	setFont(pctFont);
	
	if(pctW > 0){
		lines = wordwrap == false ? [text] : wordWrap(text, pctW, pctFont);
		var maxwidth = pctOf(pctW,width);
		var x = pctToX(pctX);
		var y = pctToY(pctY) + fontH;
		for(var i = 0; i < lines.length; i++){
			switch(allign){
				case "center":{
					//var width = ;
					ctx.fillText(lines[i],x+(maxwidth-ctx.measureText(lines[i]).width)/2,y);
					break;	
				}
				case "right":{
					ctx.fillText(lines[i],x+maxwidth-ctx.measureText(lines[i]).width,y);
					break;	
				}
				default:{
					ctx.fillText(lines[i],x,y);
				}
			}
			y += fontH;
		}
	}else{
		ctx.fillText(text, pctToX(pctX),pctToY(pctY) + fontH);
	}
}

function drawTextInBox(text){
	drawText(text,31,35,38,3,"center");	
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

function wordWrap(text, maxWidthPct, pctFont){	
	var wordsIndex = 0;
	var words = (""+text).split(" ");
	var results = [];
	var maxwidth = pctToX(maxWidthPct)-xDisp;
	
	var line = "";
	var nextWord = null;
	while(wordsIndex < words.length){
		nextWord = words[wordsIndex];
		if(ctx.measureText(line + nextWord).width <= maxwidth){ // cut word
			line += nextWord + " ";
			wordsIndex++;
		}else if(ctx.measureText(nextWord).width > maxwidth){ // cut word
			var end = nextWord.length - 1;
			while(ctx.measureText(line + nextWord.substring(0, end) + "-").width > maxwidth){ // see what we have space for
				end--;
			}
			results.push(line + nextWord.substring(0,end) + "-");
			line = "";
			words[wordsIndex] = words[wordsIndex].substring(end, words[wordsIndex].length - end); // let the remaining be
		}else{ // word doesn't fit, but its not too long
			results.push(line);
			line = "";
		}
	}
	results.push(line);
	
	return results;
}

// THE ACTUAL GAME

// constants and stuff
var players = [];
var curPlayer = 0;
var curState = null;
var leftToActivate = [];
var recievingPlayers = [];
var nonRecievingPlayers = [];

var whorebank = 5;
var goldbank = 10;
var silverbank = 10;

var fieldUsed = false;

var boardPositions = [[50,16],[65,17],[81,24],[88,44],[88,63],[82,82],[65,89],[50,91],[34,89],[19,84],[11,63],[11,43],[18,21],[34,16]]; // in percentages
var treasureIsland = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]; // with [gold,silver] on each index
var islandPositions = [[45,39],[59,39],[70,39],[70,51.6],[70,63.8],[70,75.5],[59,75.5],[45,75.5],[33,75.5],[22,75.5],[22,63.8],[22,51.6],[22,39],[33,39],[33,51.6],[45,51.6],[59,51.6],[59,63.8],[45,63.8],[33,63.8]]; // coordinates for the digable spots on the island
var tilePct = 13;
var playerRadius = 3.5;
var coinSmallSize = 2;
var smallCoinDisplacement = 0.35;
var largeCoinDisplacement = 1;
var coinLargeSize = 8;
var whoreSmallSize = 2;
var whoreDisplacement = 0.35;
var skeletonSmallSize = 2;
var skeletonDisplacement = 0.35;
var diceSize = 5;
var diceToShow = 0;
var newField = 0;
var newTimeout = 20;
var curTreasure = null;
var curSips = 0;

var imgBg = new Image();
imgBg.src = "images/background.png";

var imgGoldLarge = new Image();
imgGoldLarge.src = "images/gold.png";

var imgSilverLarge = new Image();
imgSilverLarge.src = "images/silver.png";

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

var imgDiceRolling = new Image();
imgDiceRolling.src = "images/dice.png";

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
		var textsize = 1.5;
		
		drawCircle(x,y,playerRadius,this.color,true);
		drawText(this.name,x-playerRadius/2,y-textsize*0.75,playerRadius,textsize,"center",false);
		
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
	ROLL : "1: To Roll",
	ROLLING: "2: Rolling the dice",
	MOVING: "3: Moving one space",
	LANDED : "4: Landed on a tile",
	ACTIVATED : "5: Players tile activated",
	DRINK_DIGGED : "6: Drink for digged down coins",
	COINS_BOUGHT : "7: Coins for sips",
	SELECT_SWITCH : "8: Switch coins",
	SELECT_CANNON : "9: Take randomly",
	DIG_DOWN : "10: Dig down coins",
	DIG_AMOUNT : "11: How much to dig down",
	IN_HARBOUR : "12: Give sips away",
	GAME_WON : "13: Someone won the game"
}

// the main gameloop function
function GameLoop(){
	clear();
	if(curState != null) takeInput();
	drawboard();
	if(curState != null) drawState(); 

	setTimeout(GameLoop, newTimeout);
}

// draws the basic parts of the board that shall be visible
// in all states
function drawboard(){
	drawImage(imgBg,0, 0, 100);
	for(var i = 0; i < players.length; i++){
		players[i].draw();	
	}
	for(var i = 0; i < islandPositions.length; i++){
		drawCoinStack(treasureIsland[i][0], treasureIsland[i][1], islandPositions[i]);
	}
	drawCoinStack(0, silverbank, [3,20])
	drawCoinStack(goldbank, 0, [0,25]);;
}

// draws extra gui depending on the current game state
var debugging = "";
function drawState(){
	drawText("State: "+curState+" - Timeout: "+newTimeout,1,1,0,2.5);
	drawText(""+debugging,100,0,20,2.5,"left");
	switch(curState){
		case State.ROLL:{
			drawBox(players[curPlayer]);
			drawImage(imgDiceIdle,50-diceSize/2,50-diceSize*0.75,diceSize,0,0,50,50,1);
			drawTextInBox("It is "+players[curPlayer].name+"'s time to roll!");
			break;
		}
		case State.ROLLING:{
			drawBox(players[curPlayer]);
			diceToShow = rollDice();
			drawImage(imgDiceRolling,50-diceSize/2,50-diceSize*0.75,diceSize,50*diceToShow-50,0,50,50,1);
			newField = players[curPlayer].pos + diceToShow;
			break;
		}
		case State.MOVING:{
			drawBox(players[curPlayer]);
			drawImage(imgDiceRolling,50-diceSize/2,50-diceSize*0.75,diceSize,50*diceToShow-50,0,50,50,1);
			movePlayer(newField);
			
			if(newField == players[curPlayer].pos){
				curState = State.DRINK_DIGGED;
			}
			break;
		}
		case State.DRINK_DIGGED:{
			newTimeout = 20; // back from moving
			
			if(curTreasure == null){
				curTreasure = findTreasure();
				curSips = treasureToSips(curTreasure);
				
				// if nothing go
				if(curSips == 0){
					curState = State.LANDED;
					break;
				}
			}
			drawBox(players[curPlayer]);
			drawTextInBox("Arrr! "+players[curPlayer].name+" has found a treasure!!! There be "+curSips+" sips for "+onTileString()+".");
			break;
		}
		case State.LANDED:{
			drawBox(players[curPlayer]);
			drawLandedTile(players[curPlayer].pos);
			break;
		}
	}
}

function takeInput(){
	if(mouseClicked == null) return; // no new click waiting
	
	switch(curState){
		case State.ROLL:{
			curState = State.ROLLING;
			break;
		}
		case State.ROLLING:{
			curState = State.MOVING;
			newTimeout = 350;
			//diceToShow = rollDice();
			break;
		}
		case State.DRINK_DIGGED:{
			curState = State.LANDED;
			break;
		}
		case State.LANDED:{
			inputForTile(players[curPlayer].pos);
			break;
		}
	}
	
	mouseClicked = null; // click consumed
}

// INITIALISATION
GameLoop();

// name inputs
var numPlayers = parseInt(prompt("How many players?",""));

for(var i = 1; i <= numPlayers; i++){
	players.push(new Player(prompt("What is the name of player "+i+"?","")));
}

// ... and we're on!
curState = State.ROLL;
c.addEventListener('mousemove',getMousePosition,false);
c.addEventListener('click',getMouseClick,false);

// GAME METHODS

function nextPlayer(){
	curPlayer += curPlayer >= players.length-1 ? -curPlayer : 1;
}

function activatedPlayers(){
	var matches = [];

	// gather players
	for(var i = 0; i < players.length; i++){
		if(i != curPlayer && players[i].pos == players[curPlayer].pos){
			matches.push(players[i]);
		}
	}
	return matches;
}

// Gives a string listing a specific list
// of players on the current tile
function onTileActivatedString(playerArray){
	if(playerArray.length == 0) return "";

	var matches = playerArray.slice();
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

// Gives a string listing all the players
// on the current tile
function onTileString(){
	var matches = activatedPlayers().concat([players[curPlayer]]);	
	return onTileActivatedString(matches);
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

// MORE GAME LOGIC
function bankType(coinType){
	return (coinType == "silver" && silverbank > 0) || (coinType == "gold" && goldbank > 0)
}

// writes who gets a coin (silver or gold) from the field and who doesn't.
function printCoinRecieved(coinType){
	var nonRecievingText = " "+onTileActivatedString(nonRecievingPlayers)
						   +" receives nothing 'cus the treasure chest was empty!";
	
	if(recievingPlayers.length == 0){
		drawTextInBox(onTileActivatedString(nonRecievingPlayers)+" receives nothing 'cus the treasure chest was empty!");
		}else if(nonRecievingPlayers.length == 0){
			drawTextInBox(onTileActivatedString(recievingPlayers)+" receives a "+coinType+" coin from the open treasure chest.");
		}else{
			drawTextInBox(onTileActivatedString(recievingPlayers)+" receives a "+coinType+" coin from the open treasure chest."+nonRecievingText);
			}
}

// gives a silver or gold coin to the current player and all else on the
// field, provided the bank can afford it
function giveCoinFromField(coinType){
	recievingPlayers = [];		
	nonRecievingPlayers = activatedPlayers();
	nonRecievingPlayers.push(players[curPlayer]);
	while(nonRecievingPlayers.length > 0 && bankType(coinType)){
		var cur = nonRecievingPlayers.pop();
		if(coinType == "silver"){
			cur.silver++;
			silverbank--; // For economical integrity, Jimmy
		}else{
			cur.gold++;
			goldbank--; // For economical integrity, Jimmy
		}
		recievingPlayers.push(cur);					
	}
}

// finds any treasure on the current players tile and
// decreases it by one value (if possible, else two)
// and the amount to drink is returned.
function findTreasure(){
	// look up
	var spots = treasureIslandIndexes(players[curPlayer].pos);
	
	// count
	var coins = []; // [[gold,silver,doubleUp], ...]
	for(var i = 0; i < spots.length; i++){
		var spot = treasureIsland[spots[i]];
		coins.push([spot[0],spot[1],spots[i] < 14]);
	}
	
	// decrement
	for(var i = 0; i < spots.length; i++){
		islandDecrement(spots[i]);	
	}
	
	// return
	return coins;
}

function islandDecrement(coins){
	if(coins[1] > 0){
		coins[1] -= 1;
		silverbank += 1;
	}else if(coins[0] > 0 && silverbank > 0){
		coins[0] -= 1;
		coins[1] += 1;
		silverbank -= 1;
		goldbank += 1;
	}else if(coins[0] > 0){
		goldbank += 1;
		coins[0] -= 1;	
	}
}

function treasureIslandIndexes(tile){
	var result = [tile];
	switch(tile){
		case 0:{ result.push(15); break;}
		case 1:{ result.push(15); result.push(16); break;}
		case 2:
		case 3:{ result.push(16); break;}
		case 4:
		case 5: { result.push(17); break;}
		case 6:{ result.push(17); result.push(18); break;}
		case 7:{ result.push(18); break;}
		case 8:{ result.push(18); result.push(19); break;}
		case 9:
		case 10:{ result.push(19); break;}
		case 11:
		case 12:{ result.push(14); break;}
		case 13:{ result.push(14); result.push(15); break;}
	}
	return result;
}

function treasureToSips(treasure){
	var sips = 0;
	for(var i = 0; i < treasure.length; i++){
		sips += coinsToSips(treasure[i][0], treasure[i][1], treasure[i][2]);
	}
	return sips;
}

function coinsToSips(gold, silver, doubleUp){
	return doubleUp ? 2*(gold*2+silver) : gold*2+silver;
}

function coinsToString(gold, silver){
	if(gold == 0 && silver != 0) return silver + " silver";
	if(gold != 0 && silver == 0) return gold + " gold";
	if(gold != 0 && silver != 0) return gold + " gold and " + silver +" silver";
	return "nothing";
}

// simply rolls a die
function rollDice(){
	return parseInt(Math.random()*6)+1;
}

// draws a stack of coins at a given position. Pos = [x,y]
function drawCoinStack(gold,silver,pos){
	pos = [pos[0],pos[1]]; // For referential integrity, Jimmy.
	var ratio = imgGoldLarge.height/imgGoldLarge.width;
	pos[1] -= ratio*coinLargeSize;
	if(gold > 0){
		for(var i = 0; i < gold; i++){
			drawImage(imgGoldLarge,pos[0],pos[1],coinLargeSize);
			pos[1] -= largeCoinDisplacement;
		}
	}
	if(silver > 0){
		for(var i = 0; i < silver; i++){
			drawImage(imgSilverLarge,pos[0],pos[1],coinLargeSize);
			pos[1] -= largeCoinDisplacement;
		}
	}
}

// moves the current player to the specified field, one step at the time
function movePlayer(){
	players[curPlayer].pos += players[curPlayer].pos < 13 ? 1 : -13;
	if(players[curPlayer].pos == 0) newField = 0;
}

function drawLandedTile(tile){
	switch(tile){
		case 0:{
			break;	
		}
		case 1:{
			drawTextInBox(players[curPlayer].name+", ye be fucked by the parrot! Drink 2 sips.");
			break;
		}
		case 2:{
			drawTextInBox("Ye landed on the skull and bones! One half cup 'o mead for "+onTileString()+".");
			break;
		}
		case 4:{
			drawTextInBox("Ye must fill yer mouth with ale before swallowing it, "+onTileString()+".");
			break;
		}
		case 5:{
			drawTextInBox(players[curPlayer].name+", ye be fucked by the parrot! Drink 3 sips.");
			break;
		}
		case 6:{
			// gives a silver coin to the current player (if the bank can afford it)
			// and to other players on the field, if any (and if bank can afford it)
			if(fieldUsed == false){
				giveCoinFromField("silver");
				fieldUsed = true;
			}
			printCoinRecieved("silver");
			break;
		}
		case 10:{
			drawTextInBox(players[curPlayer].name+", ye be fucked by the parrot! Drink 4 sips.");
			break;
		}
		case 11:{
			// gives a coin (gold if dice=6, else silver) to the current player (if the bank can afford it)
			// and to other players on the field, if any (and the bank can afford it)
			if(fieldUsed == false){
				if(diceToShow == 6){
					giveCoinFromField("gold");
				}else{
					giveCoinFromField("silver");
				}
				fieldUsed = true;
			}
			if(diceToShow == 6){
				printCoinRecieved("gold")
			}else{
				printCoinRecieved("silver")
			}
			break;
		}
		// ...
	}
}

function inputForTile(tile){
	switch(tile){
		case 0:{
			break;	
		}
		default:{
			fieldUsed = false;
			nextPlayer();
			curState = State.ROLL;
		}
		// ...
	}
}
