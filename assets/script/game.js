var local = false;
var debug = true;

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

function setFont(pctFont, italic){
	if(italic){
		ctx.font = "italic "+pctOf(pctFont,width) + "px Kingthings";
	}else{
		ctx.font = pctOf(pctFont,width) + "px Kingthings";
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
	var mouseX = evt.clientX - rect.top - root.scrollTop-c.offsetLeft;
	var mouseY = evt.clientY - rect.left - root.scrollLeft-c.offsetTop;
	mousePos[0] = mouseX;
	mousePos[1] = mouseY;
}

function getMouseClick(x, y, width, height){
	mouseClicked = [];
	mouseClicked[0] = xToPct(mousePos[0]);
	mouseClicked[1] = yToPct(mousePos[1]);
	if(typeof(x) == 'number'){
		if(mouseClicked[0] >= x && mouseClicked[0] <= (x+width) && mouseClicked[1] >= y && mouseClicked[1] <= (y+height)){
			return true;
		}
	}
	return false;
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
	var alphaIE = 100;
	var alphaNS = 1;
	if(typeof(cropX)==='undefined'){
		ctx.drawImage(img, pctToX(pctX), pctToY(pctY),width,width*ratio);
	}
	else{
			if(typeof(sizeRatio === 'number')){
				var ratio = sizeRatio;
			}
		ctx.drawImage(img,cropX, cropY, cropXWidth, cropYHeight, pctToX(pctX), pctToY(pctY), width, width*ratio);
	}
}

function colorString(array){
	if(typeof array == "undefined") return "black";
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
function drawText(text, pctX, pctY, pctW, pctFont, allign, wordwrap, color, italic){
	ctx.fillStyle = colorString(color);
	var fontH = pctOf(pctFont,width);
	setFont(pctFont,italic);
	
	if(pctW > 0){
		lines = wordwrap == false ? [text] : wordWrap(text, pctW, pctFont);
		var maxwidth = pctOf(pctW,width);
		var x = pctToX(pctX);
		var y = pctToY(pctY) + fontH;
		for(var i = 0; i < lines.length; i++){
			switch(allign){
				case "center":{
					ctx.fillText(lines[i],2+x+(maxwidth-ctx.measureText(lines[i]).width)/2,y);
					break;	
				}
				case "right":{
					ctx.fillText(lines[i],2+x+maxwidth-ctx.measureText(lines[i]).width,y);
					break;	
				}
				default:{
					ctx.fillText(lines[i],2+x,y);
				}
			}
			y += fontH;
		}
	}else{
		ctx.fillText(text, pctToX(pctX),pctToY(pctY) + fontH);
	}
}

function drawTextInBox(text, position){
	switch(position){
		case "header":{
			drawImage(imgBanner,35,25,30);
			drawText(text,36.5,26,28.5,4,"center");
			break;
		}
		case "flavor":{
			drawText('"'+text+'"',31,59,38,3,"center",true,"gray",true);
			break;
		}
		default:{ // which is "body"
			drawText(text,31,35,38,3,"center");		
		}
	}
	
}

// draws a filled rectangle at the given position with the given width,
// height and color.
function drawRect(pctX, pctY, pctW, pctH, color, border){
	ctx.beginPath();
	ctx.rect(pctToX(pctX),pctToY(pctY),pctToX(pctW)-xDisp,pctToY(pctH)-yDisp);
	ctx.fillStyle = colorString(color);
	ctx.fill();
	if(border){
		ctx.lineWidth = getBorderWidth();
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
			ctx.lineWidth = getBorderWidth();
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

// Return an image object With the specified file name.
// If debug == true, the local path will be used, otherwise
// the file path on the server will be used.
function addImage(fileName){
	var imgFile = new Image();
	var path = (local == true) ? "images/" : "/assets/images/";
	imgFile.src = path+fileName;
	return imgFile;
}

// THE ACTUAL GAME

// constants and stuff
var gameID;
var dbURL = 'http://beta.piratspillet.dk/index.php/updatedb';
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
var islandPositions = [[45,26],[58,26],[69,27],[69,39.6],[69,51.8],[69,64.5],[58,64.5],[45,64.5],[33,64.5],[22,64.5],[21,51.8],[21,39.6],[21,27],[33,26],[33,39.6],[45,39.6],[58,39.6],[58,51.8],[45,51.8],[33,51.8]]; // coordinates for the digable spots on the island
var tilePct = 13;
var playerRadius = 3.5;
var coinSmallSize = 2;
var smallCoinDisplacement = 0.5;
var largeCoinDisplacement = 1;
var coinLargeSize = 8;
var whoreSmallSize = 2;
var whoreDisplacement = 0.35;
var skeletonSmallSize = 2;
var skeletonDisplacement = 2;
var diceSize = 5;
var diceToShow = 0;
var newField = 0;
var newTimeout = 20;
var curTreasure = null;
var curSips = 0;
var sipsChosen = 0;
var otherPlayers = [];
var otherPlayerPositions = [];
var stealType = -1;
var countdown = 5;
var toDig = [0,0] //[gold, silver]

// Image objects
var imgBg = addImage("background.png");
var imgBanner = addImage("banner.png");
var imgGoldLarge = addImage("gold.png");
var imgSilverLarge = addImage("silver.png");
var imgGoldSmall = addImage("gold_small.png");
var imgSilverSmall = addImage("silver_small.png");
var imgWhoreSmall = addImage("whore_small.png");
var imgSkeletonSmall = addImage("skeleton_small.png");
var imgDiceIdle = addImage("icon_start.png");
var imgDiceRolling = addImage("dice.png");
var imgSitOut = addImage("icon_sit_out.png");
var imgAddPlayer = addImage("icon_add_player.png");
var imgExit = addImage("icon_exit.png");

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
		if(!this.active) return;

		var coords = boardPositions[this.pos];
		var center = [coords[0]+this.offset[0],coords[1]+this.offset[1]];
		this.drawXY(center[0],center[1]);
	}
	this.drawXY = function(x, y){
		var textsize = 1.5;
		
		drawCircle(x,y,playerRadius,this.color,true);
		drawText(this.name,x-playerRadius/2,y-textsize*0.75,playerRadius,textsize,"center",false);
		
		// Draw coins next to portrait, stacked with silver on top of gold
		if(this.silver+this.gold > 0){
			var coinPosY = y+playerRadius-coinSmallSize*0.75;
			drawDisplacedImages(imgGoldSmall, this.gold,x-playerRadius-coinSmallSize/2, coinPosY,coinSmallSize,smallCoinDisplacement,"v");
			drawDisplacedImages(imgSilverSmall, this.silver,x-playerRadius-coinSmallSize/2,coinPosY-this.gold*smallCoinDisplacement,coinSmallSize,smallCoinDisplacement,"v");
		}
		
		// Draw whore coins next to portrait
		if(this.whore > 0){
			var whorePosY = y+playerRadius-whoreSmallSize*0.75;
			drawDisplacedImages(imgWhoreSmall, this.whore, x+playerRadius-whoreSmallSize/2,whorePosY,whoreSmallSize,whoreDisplacement,"v");
		}
		
		// Draw skeletons next to portrait
		if(this.skeleton > 0){
			var skeletonPosX = x+skeletonSmallSize/5-skeletonDisplacement*0.15;
			if(this.skeleton == 1){
				skeletonPosX = x-skeletonSmallSize/2;
			}
			var skeletonPosY = y-playerRadius-skeletonSmallSize*0.8;
			drawDisplacedImages(imgSkeletonSmall,this.skeleton, skeletonPosX, skeletonPosY, skeletonSmallSize,skeletonDisplacement,"h");
		}
	}
}

// all the possible states in the game
State = {
	ROLL : "1: To Roll",
	MOVING: "2: Moving one space",
	LANDED : "3: Landed on a tile",
	ACTIVATED : "4: Players tile activated",
	DRINK_DIGGED : "5: Drink for digged down coins",
	COIN_STOLEN : "6: Display stolen coin",
	DIG_DOWN : "7: Dig down coins",
	DIG_AMOUNT : "8: How much to dig down",
	GAME_WON : "9: Someone won the game",
	SITTING_OUT : "10: Player sitting out",
	DRINK_TOGETHER : "11: Everybody drinks together"
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
		drawCoinStack(treasureIsland[i][0], treasureIsland[i][1], [islandPositions[i][0],islandPositions[i][1]+10]);
	}
	drawCoinStack(0, silverbank, [3,20])
	drawCoinStack(goldbank, 0, [0,25]);;
}

// draws extra gui depending on the current game state
var debugging = "";
function drawState(){
	if(debug) drawText("State: "+curState+" - Timeout: "+newTimeout,1,1,0,2.5);
	if(debug) drawText(""+debugging,1,4,0,2.5,"left");

	switch(curState){
		case State.ROLL:{
			newTimeout = 20;
			if(!players[curPlayer].active){ // player is sitting out
				curState = State.SITTING_OUT;
				countdown = 5;
				
				break;
			}

			drawBox(players[curPlayer]);
			//drawImage(imgDiceIdle,50-diceSize/2,50-diceSize*0.75,diceSize,0,0,50,50,1);
			diceToShow = rollDice();
			drawImage(imgDiceRolling,50-diceSize/2,50-diceSize*0.75,diceSize,50*diceToShow-50,0,50,50,1);

			drawTextInBox(players[curPlayer].name+"'s Turn","header");
			drawTextInBox("Click the die to determine your roll");
			drawTextInBox("Avast! Shiver me timbers!","flavor");
			break;
		}
		case State.GAME_WON:{
			var winners = whoWon();
			drawBox(null);
			drawTextInBox("Game Won!","header");
			drawTextInBox(onTileActivatedString(winners)+(winners.length > 1 ? " have" : " has")+" won the game and "+(winners.length > 1 ? "are" : "is")+" now promoted to Über Pirate Captain"+(winners.length > 1 ? "s!" : "!"));
			drawTextInBox("Only Über Pirate Captains get both the beauties and the booty! ARRGH!","flavor");
			break;
		}
		case State.SITTING_OUT:{
			newTimeout = 1000;
			drawBox(players[curPlayer]);
			drawImage(imgDiceIdle,50-diceSize/2,50-diceSize*0.75,diceSize,0,0,50,50,1);
			drawTextInBox(players[curPlayer].name+"'s Turn","header");
			drawTextInBox("Click the die to re-enter game");
			drawTextInBox(""+countdown,"flavor");

			if(countdown == 0){ // last count
				
				nextPlayer();
				curState = State.ROLL;
			}

			countdown--;
			break;
		}
		case State.MOVING:{
			//drawBox(players[curPlayer]);
			drawImage(imgDiceRolling,50-diceSize/2,50-diceSize*0.75,diceSize,50*diceToShow-50,0,50,50,1);
			movePlayer(newField);
			
			if(newField == players[curPlayer].pos || players[curPlayer].pos == 0){
				curState = State.DRINK_DIGGED;
			}
			break;
		}
		case State.DRINK_TOGETHER:{
			drawBox(null);
			drawTextInBox("Toast!","header");
			drawTextInBox("You're all in harbour! Take a drink together to celebrate the occation.","body");
			drawTextInBox("To wives and sweethearts - may they never meet!","flavor");
			break;
		}
		case State.DRINK_DIGGED:{
			newTimeout = 20; // back from moving
			
			if(curTreasure == null){
				curTreasure = findTreasure();
				curSips = treasureToSips(curTreasure);
				sipsToDatabase(players[curPlayer].name, curSips, 0);
				
				// if nothing go
				if(curSips == 0){
					curTreasure = null;
					curState = State.LANDED;
					if(everyoneIn()) curState = State.DRINK_TOGETHER;
					break;
				}
			}
			drawBox(players[curPlayer]);
			drawTextInBox("Hidden Treasure!","header");
			drawTextInBox("Arrr! "+players[curPlayer].name+" has found a treasure!!! There be "+curSips+" sips for "+onTileString()+".");
			drawTextInBox("It's a pass-time that never gets old","flavor");
			break;
		}
		case State.LANDED:{
			drawBox(players[curPlayer]);
			drawLandedTile(players[curPlayer].pos);
			break;
		}
		case State.ACTIVATED:{
			switch(players[curPlayer].pos){ // activated where? Note: Many tiles incorporate the activation in the text.
				case 3:
				case 7:
				case 13: {
					drawBox(leftToActivate[0]);
					drawTextInBox("Activated","header");
					drawTextInBox(leftToActivate[0].name + " must also drink "+sipsChosen+" sips and recieves: ","center");
					drawCoinsByValue(sipsChosen,50-coinLargeSize/2,50-2,coinLargeSize,largeCoinDisplacement);
					break;
				}
				case 8:{
					makeOtherPlayers(leftToActivate[0]);
					drawSwitchTile(leftToActivate[0]);
					break;
				}
				case 9:{
					drawBox(leftToActivate[0]);
					makeOtherPlayers(leftToActivate[0]);
			
					// text
					drawTextInBox("The Cannon","header");
					drawTextInBox("You can steal a coin at random from another player. Who should it be?","body");
					
					// players
					for(var i = 0; i < otherPlayers.length; i++){
						otherPlayers[i].drawXY(otherPlayerPositions[i][0],otherPlayerPositions[i][1]);	
					}
					break;
				}
				case 12:{
					var cur = leftToActivate[0];
					digDownOption(cur);
					break;
				}
			}
			break;
		}
		case State.COIN_STOLEN:{
			drawBox(leftToActivate[0]);
			var coinImg = null;
			switch(stealType){
				case -1:{ // nothing
					drawTextInBox("Nothing To Steal","header");
					drawTextInBox("Our holds be empty, mate","flavor");
					break;
				}
				case 0:{ // silver
					drawTextInBox("Silver Coin Stolen","header");
					drawTextInBox("Hands off the booty, you bilge rat!","flavor");
					coinImg = imgSilverLarge;
					break;
				}
				case 1:{ // gold
					drawTextInBox("Gold Coin Stolen","header");
					drawTextInBox("Hands off the booty, you bilge rat!","flavor");
					coinImg = imgGoldLarge;
					break;
				}
			}
			if(coinImg != null) drawImage(coinImg, 50-coinLargeSize/2,50-coinLargeSize/2, coinLargeSize);
			break;
		}
		case State.DIG_AMOUNT:{
			var player = leftToActivate[0];

			drawBox(player);
			drawTextInBox("Choose how much of your treasure to dig down.");

			drawRect(60.5,61,5,4,"white",true);

			drawText("To Keep",41,61,8,2);
			drawText("To Dig",51.5,61,8,2);
			drawText("Arrr!",61,61,8,2);

			drawCoinStack(player.gold-toDig[0],player.silver-toDig[1],[40,60]);
			drawCoinStack(toDig[0],toDig[1],[50,60]);
			break;
		}
		case State.DIG_DOWN:{
			mouseP = [];
			mouseP[0] = xToPct(mousePos[0]);
			mouseP[1] = yToPct(mousePos[1]);

			for(var i=0; i<islandPositions.length; i++){
				if(mouseP[0] > islandPositions[i][0] && mouseP[0] < islandPositions[i][0]+10 && mouseP[1] < islandPositions[i][1]+10 && mouseP[1] > islandPositions[i][1]){
					drawCoinStack(toDig[0]+treasureIsland[i][0],toDig[1]+treasureIsland[i][1],[islandPositions[i][0],islandPositions[i][1]+10],true);
				}
			}
			break;
		}
	}

	// draw sit-out and add player
	if(curState == State.ROLL){
		drawImage(imgSitOut, 80, 1, diceSize);
		drawImage(imgAddPlayer, 80, 2+diceSize, diceSize);
		drawText("Sit Out", 80.5+diceSize, 1, 20, 3);
		drawText("Add Player", 80.5+diceSize, 2.5+diceSize, 20, 3);
	}
}

function takeInput(){
	if(mouseClicked == null) return; // no new click waiting

	// icons clicked?
	if(curState == State.ROLL){
		if(getMouseClick(80,1,20,diceSize)){ // sit out
			var player = players[curPlayer]
			player.active = false;
			nextPlayer();
			curState = State.ROLL;
			mouseClicked = null;

			// remove coins
			goldbank += player.gold;
			silverbank += player.silver;
			player.gold = 0;
			player.silver = 0;
			return;

		}else if(getMouseClick(80,2+diceSize,20,diceSize)){ // add player
			players.splice(curPlayer+1, 0, new Player(prompt("What is the name of new player?","")));
			mouseClicked = null;
			return;
		}
	}
	
	switch(curState){
		case State.SITTING_OUT:{
			players[curPlayer].active = true;
			curState = State.ROLL;
			newTimeout = 20;
			break;
		}
		case State.ROLL:{
			diceToShow = rollDice(); // real dice roll
			if(!local) $.post(dbURL, { 'data': [debug? 'true': 'false', 'rolls', gameID, players[curPlayer].name,diceToString(diceToShow)]});
			newField = players[curPlayer].pos + diceToShow;
			curState = State.MOVING;
			newTimeout = 350;
			break;
		}
		case State.DRINK_DIGGED:{
			// decrement
			var spots = treasureIslandIndexes(players[curPlayer].pos);
			for(var i = 0; i < spots.length; i++) islandDecrement(spots[i]);
			curSips = 0;
			curTreasure = null;

			curState = State.LANDED;
			if(everyoneIn()) curState = State.DRINK_TOGETHER;

			break;
		}
		case State.DRINK_TOGETHER:{
			for (var i = 0; i < players.length; i++) {
				sipsToDatabase(players[i].name, 1, 0);
			}
			curState = State.LANDED;
			break;
		}
		case State.LANDED:{
			if(!local) $.post(dbURL, { 'data': [debug? 'true': 'false', 'landed', gameID, players[curPlayer].name,posToString(players[curPlayer].pos)]});
			inputForTile(players[curPlayer].pos);
			break;
		}
		case State.ACTIVATED:{
			if(!local) $.post(dbURL, {'data':[debug? 'true': 'false', 'activated', gameID, leftToActivate[0].name, posToString(leftToActivate[0].pos)]});
			switch(players[curPlayer].pos){
				case 3:
				case 7:
				case 13:{
					var cur = leftToActivate.shift();
					giveCoinsByValue(sipsChosen,cur);
			
					if(leftToActivate.length > 0){
						curState = State.ACTIVATED;	
					}else{
						nextPlayer();
						curState = State.ROLL;
						sipsChosen = 0;	
					}
					break;
				}
				case 8:{
					if(checkForOtherClicked(leftToActivate[0])){
						if(leftToActivate.length > 1){
							leftToActivate.shift();
						}else{
							nextPlayer();
							curState = State.ROLL;
						}
						fieldUsed = false;
					}
					break;
				}
				case 9:{
					if(checkForClickAndSteal(leftToActivate[0])){
						curState = State.COIN_STOLEN;
						fieldUsed = false;
					}
					break;
				}
				case 12:{
					var cur = leftToActivate[0];
					digDownOptionInput(cur);
					break;
				}
			}

			break;
		}
		case State.COIN_STOLEN:{
			if(leftToActivate.length > 1){
				curState = State.ACTIVATED;
				leftToActivate.shift();
			}else{
				nextPlayer();
				curState = State.ROLL;
			}

			break;
		}
		case State.DIG_AMOUNT:{
			var player = leftToActivate[0];
			var playerGoldHeight = largeCoinDisplacement*(player.gold-toDig[0]);
			var playerSilverHeight = largeCoinDisplacement*(player.silver-toDig[1])+coinLargeSize*0.5;
			var stackGoldHeight = largeCoinDisplacement*toDig[0];
			var stackSilverHeight = largeCoinDisplacement*toDig[1]+coinLargeSize*0.5;

			// Move gold coin from the player pile to dig pile
			if(player.gold-toDig[0] > 0){
				if(getMouseClick(40,60-playerGoldHeight+largeCoinDisplacement,coinLargeSize,playerGoldHeight)){
					toDig[0]++;
				}

				// If there is only gold coins left, make the hit box larger
				if(player.silver-toDig[1] == 0){
					if(getMouseClick(40,60-playerGoldHeight+largeCoinDisplacement-coinLargeSize,coinLargeSize,coinLargeSize)){
						toDig[0]++;
					}
				}
			}

			// Move a silver coin from the player pile to the dig pile
			if(player.silver-toDig[1] > 0){
				if(getMouseClick(40,60-playerGoldHeight-playerSilverHeight+largeCoinDisplacement,coinLargeSize,playerSilverHeight)){
					toDig[1]++;
				}
			}

			// Move a gold coin from the dig pile to the player pile
			if(toDig[0] > 0){
				if(getMouseClick(50,60-stackGoldHeight+largeCoinDisplacement,coinLargeSize,stackGoldHeight)){
					toDig[0]--;
				}

				// If there is only gold coins left, make the hit box larger
				if(toDig[1] == 0){
					if(getMouseClick(50,60-stackGoldHeight+largeCoinDisplacement-coinLargeSize,coinLargeSize,coinLargeSize)){
						toDig[0]--;
					}
				}
			}

			// Move a silver coin from the dig pile to the player pile
			if(toDig[1] > 0){
				if(getMouseClick(50,60-stackGoldHeight-stackSilverHeight+largeCoinDisplacement,coinLargeSize,stackSilverHeight)){
					toDig[1]--;
				}
			}

			if(getMouseClick(60.5,61,5,4)){
				curState = State.DIG_DOWN;
			}
			break;
		}
		case State.DIG_DOWN:{
			var player = leftToActivate[0];
			for(var i = 0; i < treasureIsland.length; i++){
				if(getMouseClick(islandPositions[i][0],islandPositions[i][1],10,10)){
					treasureIsland[i][0] += toDig[0];
					treasureIsland[i][1] += toDig[1];
					player.gold -= toDig[0];
					player.silver -= toDig[1];
					toDig = [0,0];

					leftToActivate.shift();
					curState = State.ACTIVATED;
					if(leftToActivate.length == 0){
						nextPlayer();
						curState = State.ROLL;
					}
				}
			}
			break;
		}
	}
	
	mouseClicked = null; // click consumed
}


// Creates a string value for a position
function posToString(position){
	var pos;
	switch(position){
		case 0: return "harbour";
		case 1: return "parrotTwo";
		case 2: return "skull";
		case 3: return "buyOne";
		case 4: return "mouth";
		case 5: return "parrotThree";
		case 6: return "chestOpen";
		case 7: return "buyTwo";
		case 8: return "exchange";
		case 9: return "steal";
		case 10: return "parrotFour";
		case 11: return "chestClosed";
		case 12: return "island";
		case 13: return "buyThree";
	}
}

// Create a string value for dice roll

function diceToString(dice){
	switch(dice){
		case 1: return "one";
		case 2: return "two";
		case 3: return "three";
		case 4: return "four";
		case 5: return "five";
		case 6: return "six";
	}
}

// Update sips table on database
function sipsToDatabase(player, taken, given){
	if(!local) $.post(dbURL, {'data':[debug? 'true': 'false', 'sips', gameID, player, ""+taken, ""+given]});
}

// Update coins table on database
function coinsToDatabase(player, fromPlayer, gold, silver, whore){
	if(!local) $.post(dbURL, {'data':[debug? 'true': 'false', 'coins', gameID, player, fromPlayer, ""+gold, ""+silver, ""+whore]});
}


// Create game on database
if(!local) $.post(dbURL, {'data':[debug? 'true': 'false','games']},
	function(data) {
		gameID = ""+data;
	});

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


// draw a pile of the wanted image at x,y, displaced in the
// given direction ("h" or "v") with the specified displacement.
function drawDisplacedImages(image,amount,x,y,width,displacement,direction){
	for(var i = 0; i < amount; i++){
		drawImage(image, x, y, width);
		if(direction == "v"){
			y -= displacement;
		}else if(direction == "h"){
			x -= displacement;
		}
	}
}

// draw a pile of coins with the combined value
// as given as first parameter at the coordinates (x,y)
// and the width.
// The function will simplify to as few coins as possible.
function drawCoinsByValue(value, x, y, width, yDisp){
		var goldInBank = goldbank;
		var silverInBank = silverbank;
		var goldCoins = 0;
		var silverCoins = 0;
		while(value > 1 && goldInBank > 0){
			goldCoins++;
			value -= 2;
			goldInBank--;
			drawImage(imgGoldLarge, x, y, width);
			y -= yDisp;
		}
		while(value > 0 && silverInBank > 0){
			silverCoins++;
			value -= 1;
			silverInBank--;
			drawImage(imgSilverLarge, x, y, width);
			y -= yDisp;
		}
}

// gives coins specified by value to the player
// and removes them from the bank
function giveCoinsByValue(value, player){
		var goldCoins = 0;
		var silverCoins = 0;
		while(value > 1 && goldbank > 0){
			goldCoins++;
			player.gold++;
			goldbank--;
			value -= 2;
		}
		while(value > 0 && silverbank > 0){
			silverCoins++;
			player.silver++;
			silverbank--;
			value -= 1;
		}
		sipsToDatabase(players[curPlayer].name, value, 0);
		coinsToDatabase(player.name,"",goldCoins,silverCoins,0);
		return[goldCoins, silverCoins];
}

function nextPlayer(){
	curPlayer += curPlayer >= players.length-1 ? -curPlayer : 1;
}

function activatedPlayers(){
	var matches = [];

	// gather players
	var start = curPlayer+1 == players.length ? 0 : (curPlayer+1);
	for(var i = start; i != curPlayer; i = i < (players.length-1) ? i+1 : 0){
		if(i != curPlayer && players[i].pos == players[curPlayer].pos && players[i].active){
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
	var result = matches.shift().name;

	while(matches.length > 0){
		if(matches.length > 1){
			result += ", "+matches.shift().name;
		}else{
			result += " and "+matches.shift().name;
		}
	}
	return result;
}

// Gives a string listing all the players
// on the current tile
function onTileString(){
	var matches = activatedPlayers();
	matches.unshift(players[curPlayer]);
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
	var b = getBorderWidth();
	ctx.fillRect(rectX+b, rectY+b, rectW-2*b,rectH-2*b);
	
	if(player != null) player.drawXY(30,30);
}

function getBorderWidth(){
	return pctOf(0.2,width);	
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
		drawTextInBox("Don't hang ye jib","flavor");
	}else if(nonRecievingPlayers.length == 0){
		drawTextInBox(onTileActivatedString(recievingPlayers)+" receives a "+coinType+" coin from the " + (newField == 6 ? "open" : "closed") + " chest.");
		drawTextInBox(coinType == "silver" ? "Prizes come in many sizes" : "Chests o'plenty","flavor");
	}else{
		drawTextInBox(onTileActivatedString(recievingPlayers)+" receives a "+coinType+" coin from the " + (newField == 6 ? "open" : "closed") + " treasure chest."+nonRecievingText);
		drawTextInBox(coinType == "silver" ? "Prizes come in many sizes" : "Chests o'plenty","flavor");
	}
}

// gives a silver or gold coin to the current player and all else on the
// field, provided the bank can afford it
function giveCoinFromField(coinType){
	recievingPlayers = [];
	nonRecievingPlayers = activatedPlayers();
	nonRecievingPlayers.unshift(players[curPlayer]);
	
	while(nonRecievingPlayers.length > 0 && bankType(coinType)){
		var cur = nonRecievingPlayers.shift();
		if(coinType == "silver"){
			cur.silver++;
			silverbank--; // For economical integrity, Jimmy
			coinsToDatabase(cur.name, "", 0, 1, 0);
		}else{
			cur.gold++;
			goldbank--; // For economical integrity, Jimmy
			coinsToDatabase(cur.name, "", 1, 0, 0);
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
	
	// return
	return coins;
}

function islandDecrement(index){
	if(treasureIsland[index][1] > 0){
		treasureIsland[index][1] -= 1;
		silverbank += 1;
	}else if(treasureIsland[index][0] > 0 && silverbank > 0){
		treasureIsland[index][0] -= 1;
		treasureIsland[index][1] += 1;
		silverbank -= 1;
		goldbank += 1;
	}else if(treasureIsland[index][0] > 0){
		goldbank += 1;
		treasureIsland[index][0] -= 1;
	}
}

function treasureIslandIndexes(tile){
	var result = [tile];
	switch(tile){
		case 0:{ result.push(15); break;}
		case 1:{ result.push(15); result.push(16); break;}
		case 3:{ result.push(16); break;}
		case 2:
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

// input as array of [gold,silver,doubleUp]
function treasureToSips(treasure){
	var sips = 0;
	for(var i = 0; i < treasure.length; i++){
		sips += coinsToSips(treasure[i][0], treasure[i][1], treasure[i][2]);
	}
	return sips;
}

// input as [gold,silver,doubleUp]
function coinsToSips(gold, silver, doubleUp){
	return doubleUp ? 2*(gold*2+silver) : gold*2+silver;
}

function coinsToString(gold, silver){
	if(gold == 0 && silver != 0) return silver + " silver coin" + silver > 1 ? "s" : "";
	if(gold != 0 && silver == 0) return gold + " gold coin" + gold > 1 ? "s" : "";
	if(gold != 0 && silver != 0) return coinsToString(gold,0) + " and " + coinsToString(0,silver);
	return "nothing";
}

// simply rolls a die
function rollDice(){
	return parseInt(Math.random()*6)+1;
}

// draws a stack of coins at a given position. Pos = [x,y]
function drawCoinStack(gold,silver,pos,transparent){
	var ratio = imgGoldLarge.height/imgGoldLarge.width;
	pos[1] -= ratio*coinLargeSize;

	if(transparent) ctx.globalAlpha = 0.5;

	if(gold > 0){
		for(var i = 0; i < gold; i++){
			drawImage(imgGoldLarge,pos[0],pos[1],coinLargeSize);
			pos[1] -= largeCoinDisplacement;
		}
	}
	if(silver > 0){
		for(var j = 0; j < silver; j++){
			drawImage(imgSilverLarge,pos[0],pos[1],coinLargeSize);
			pos[1] -= largeCoinDisplacement;
		}
	}

	if(transparent) ctx.globalAlpha = 1.0;
}

// moves the current player to the specified field, one step at the time
function movePlayer(){
	players[curPlayer].pos += players[curPlayer].pos < 13 ? 1 : -13;
	//if(players[curPlayer].pos == 0) newField = 0;
}

function coinsToSipsString(gold,silver,double){
	var goldsips = coinsToSips(gold,0,double);
	var silversips = coinsToSips(0,silver,double);
	var result = "";
	if(gold > 0) result = (goldsips + " sips for your Gold Coins");
	if(gold > 0 && silver > 0) result += " and ";
	if(silver > 0) result += (silversips + " sips for your Silver Coins");
	
	return result;
}

function playerDisplayPositions(pNum){
	var pSpace = 2*playerRadius + 1;
	var xMin = 32;
	var xMax = 68;
	var yMin = 47;
	var yMax = 70;
	
	var perRow = Math.floor((xMax-xMin)/pSpace);
	var rows = Math.ceil(pNum/perRow);
	var positions = [];
	
	var ySpace = (yMax - yMin - rows*pSpace)/(rows + 1);
	for(var i = 0; i < rows; i++){
		// y position
		var y = yMin + (i + 1)*(yMax - yMin)/(rows + 1);
		var limit = pNum < perRow ? pNum : perRow;
		var xSpace = (xMax - xMin - limit*pSpace)/(limit + 1);
		
		// individual positions
		for(var j = 0; j < limit; j++){
			positions.push([xMin + xSpace + j*(pSpace+xSpace) + pSpace/2,yMin + ySpace + i*(pSpace+ySpace) + pSpace/2]);	
		}
		pNum -= limit;
	}
	return positions;
}

function getOtherPlayers(player){
	var result = [];
	for(var i = 0; i < players.length; i++){
		if(players[i] !== player){
			result.push(players[i]);	
		}
	}
	return result;
}

function otherPlayerClicked(){
	for(var i = 0; i < otherPlayerPositions.length; i++){
		if(getMouseClick(otherPlayerPositions[i][0]-playerRadius,otherPlayerPositions[i][1]-playerRadius,2*playerRadius,2*playerRadius)){
			return i;
		}
	}
	return -1;
}

function switchCoins(p1, p2){
	var tempG = p1.gold;
	var tempS = p1.silver;
			
	p1.gold = p2.gold;
	p1.silver = p2.silver;
	p2.gold = tempG;
	p2.silver = tempS;

	coinsToDatabase(p1.name, p2.name, p1.gold, p1.silver,0);
	coinsToDatabase(p2.name, p1.name, p2.gold, p2.silver,0);
}

function drawSwitchTile(player){
	// text
	drawBox(player);
	drawTextInBox("Greedy Scullywag!","header");
	drawTextInBox("You are with greed and must exchange coins with another player. Who should it be?","body");
			
	// players
	for(var i = 0; i < otherPlayers.length; i++){
		otherPlayers[i].drawXY(otherPlayerPositions[i][0],otherPlayerPositions[i][1]);	
	}
}

function makeOtherPlayers(player){
	if(fieldUsed == false){
		otherPlayers = getOtherPlayers(player);
		otherPlayerPositions = playerDisplayPositions(otherPlayers.length);
		fieldUsed = true;
	}
}

function checkForOtherClicked(currentPlayer){
	var pid = otherPlayerClicked();
	if(pid < 0) return false;
	
	// switch coins with clicked player
	var other = otherPlayers[pid];
	var cur = currentPlayer;
	switchCoins(cur,other);
	return true;
}

function checkForClickAndSteal(currentPlayer){
	// what player clicked
	var pid = otherPlayerClicked();
	if(pid < 0) return false;
	
	// take one coin
	var player = otherPlayers[pid];
	if(player.gold == 0 && player.silver == 0){
		stealType = -1;
	}else{
		var coinNum = parseInt(Math.random()*(player.gold + player.silver)+1);
		stealType = coinNum > player.gold ? 0 : 1;
	}
	
	// transfer coin
	if(stealType == 0){
		currentPlayer.silver++;
		player.silver--;

		coinsToDatabase(currentPlayer.name, player.name, 0, 1, 0);
	}else if(stealType == 1){
		currentPlayer.gold++;
		player.gold--;
		coinsToDatabase(currentPlayer.name, player.name, 1, 0, 0);
	}

	return true;
}

function everyoneIn(){
	for (var i = 0; i < players.length; i++) {
		if(players[i].pos != 0){
			return false;
		}
	}
	return true;
}

function drawLandedTile(tile){
	switch(tile){
		case 0:{
			var player = players[curPlayer];
			var directly = (newField == 14);	
			
			// header
			drawTextInBox("Harbour","header");
			drawTextInBox((directly ? "Directly in " : "Indirectly in ") + "harbour!","flavor");
			
			// body
			if(player.gold >= 5){
				drawTextInBox("Arr! You have enough gold for a " + (directly ? "LUXURY WHORE" : "whore") + " for everyone to enjoy! Everyone takes " + (directly ? "10" : "5") + " sips and a Whore Coin is granted to you","body");
				sipsToDatabase(players[curPlayer].name, 0, directly ? 10 : 5);
			}else if(player.silver > 0 || player.gold > 0){
				var lastPart = coinsToSipsString(player.gold,player.silver,directly);
				sipsToDatabase(players[curPlayer].name, 0, lastPart);
				drawTextInBox("You have plunder to buy rum for your mates! You give away " + lastPart,"body");
			}else{
				if(player.skeleton < 2){
					drawTextInBox("You have returned to harbour empty handed! With no money to buy rum for your mates you are a LOSER and recieves a skeleton for your closet","body");
				}else{
					drawTextInBox("You have returned to harbour empty handed THREE years in a row! You are degraded one rank in dishonor!","body");
				}
			}
			break;	
		}
		case 1:{
			drawTextInBox("Fucked by Parrot!","header");
			drawTextInBox("You have been fucked twice by the parrot. "+onTileString()+" must drink 2 sips!");
			drawTextInBox("T' be wenching, you need rum 'n ye parrot be no 'ception","flavor");
			break;
		}
		case 2:{
			drawTextInBox("Skull n' Bones","header");
			drawTextInBox(onTileString()+(activatedPlayers().length > 0 ? " have" : " has")+" landed on the skull and bones and must empty half a beer, unless you have a Skull n' Bones on you, then it's only half of that.");
			drawTextInBox("Drink up, me hearties, yo ho!","flavor");
			break;
		}
		case 3:
		case 7:
		case 13:{
			drawTextInBox("Plunderin'","header");
			drawTextInBox("You can plunder up to a maximum value of two Gold Coins for sips, how many sips would you like to drink?","body");
			for(i = 4; i >=1; i--){
				drawCoinsByValue(i,68.75-i*9,55,7,0.8);
				drawRect(69.75-i*9,62,5,4,"white",true);
				drawText(""+i, 70-i*9, 62-1, 5, 3, "center");
			}
			break;
		}
		case 4:{
			drawTextInBox("Mouth full","header");
			drawTextInBox("You must fill your mouth with beer before swallowing it, "+onTileString()+".");
			drawTextInBox("Put 'im in ye longboat 'till he's sober!","flavor");
			break;
		}
		case 5:{
			drawTextInBox("Fucked by Parrot!","header");
			drawTextInBox(onTileString()+(activatedPlayers().length > 0 ? " have" : " has")+" been fucked three times by the parrot. Drink 3 sips to ease the pain.");
			drawTextInBox("T' be wenching, you need rum 'n ye parrot be no 'ception","flavor");
			break;
		}
		case 6:{
			// gives a silver coin to the current player (if the bank can afford it)
			// and to other players on the field, if any (and if bank can afford it)
			if(fieldUsed == false){
				giveCoinFromField("silver");
				fieldUsed = true;
			}
			drawTextInBox("The Open Chest","header");
			printCoinRecieved("silver");
			break;
		}
		case 8:{
			makeOtherPlayers(players[curPlayer]);
			drawSwitchTile(players[curPlayer]);
			break;
		}
		case 9:{
			makeOtherPlayers(players[curPlayer]);
			
			// text
			drawTextInBox("The Cannon","header");
			drawTextInBox("You can steal a coin at random from another player. Who should it be?","body");
			
			// players
			for(var i = 0; i < otherPlayers.length; i++){
				otherPlayers[i].drawXY(otherPlayerPositions[i][0],otherPlayerPositions[i][1]);
			}
			break;
		}
		case 10:{
			drawTextInBox("Fucked by Parrot!","header");
			drawTextInBox(onTileString()+(activatedPlayers().length > 0 ? " have" : " has")+" been fucked four times by the parrot. Drink 4 sips to douse the pain.");
			drawTextInBox("T' be wenching, you need rum 'n ye parrot be no 'ception","flavor");
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
			drawTextInBox("The Closed Chest","header");
			if(diceToShow == 6){
				printCoinRecieved("gold");
			}else{
				printCoinRecieved("silver");
			}
			break;
		}
		case 12:{
			leftToActivate = activatedPlayers();
			leftToActivate.unshift(players[curPlayer]);
			digDownOption(leftToActivate[0]);
		}
	}
}


function digDownOption(player){
	// gives the player an opportunity to dig down treasure on the island
	// for increased amount of sips required on a given field.
	drawBox(player);
	drawTextInBox("Treasure Island!","header");
	var player = player;

	if(player.gold+player.silver > 0){
		drawTextInBox(player.name+" can dig down treasure on the island for other scullywags to find.");
		
		drawRect(41,51.5,7,6,"white",true); // yes
		drawRect(52,51.5,7,6,"white",true); // no

		drawText("Arrr!",42,52,10,2.5,"left");
		drawText("Nay!",53.5,52,10,2.5,"left");
	}else{
		drawTextInBox(player.name+" is too poor to dig down treasure on the island!");
	}
	drawTextInBox("X marks the spot, landlubber","flavor");
}

function digDownOptionInput(player){
	// Check if player can afford digging down treasure
	if(player.gold+player.silver > 0){
		// Yes, I want to dig down stuff!
		if(getMouseClick(41,50,7,7)){
			curState = State.DIG_AMOUNT;
		}
		// Nope, don't want to dig down stuff.
		else if(getMouseClick(52,50,7,7)){
			leftToActivate.shift();
			curState = State.ACTIVATED;
			if(leftToActivate.length == 0){
				nextPlayer();
				curState = State.ROLL;
			}
		}
		// Can't afford it
	}else{
		leftToActivate.shift();
		curState = State.ACTIVATED;
		if(leftToActivate.length == 0){
			nextPlayer();
			curState = State.ROLL;
		}
	}
}

function whoWon(){
	var max = 0;
	for(var i = 0; i < players.length; i++){
		var cur = players[i].whore;
		if(cur > max) max = cur;
	}

	var winners = [];
	for(var i = 0; i < players.length; i++){
		if(players[i].whore == max) winners.push(players[i]);
	}

	return winners;
}

function finishedGame(){
	var whores = [];
	for(var i = 0; i < players.length; i++){
		whores.push(players[i].whore);
	}
	whores.sort();
	whores.reverse();

	var count = 0;
	for(var i = 0; i < whores.length; i++){
		count += whores[i];
	}

	if(count < 3) return false;

	if(count >= 5) return true;

	if(count < 5){
		if(whores[0] == 3) return true;
		return false;
	}
}

function inputForTile(tile){
	switch(tile){
		case 0:{
			var player = players[curPlayer];
			if((player.gold > 0 || player.silver > 0) && player.skeleton > 0) player.skeleton--; // lose a skeleton if you have coins

			if(player.gold >= 5){ // Whore
				player.gold -= 5;
				goldbank += 5;
				
				player.whore++;
				whorebank--;
				
				curState = (player.gold > 0 || player.silver > 0) ? State.LANDED : State.ROLL; // landed again if more money

				if(finishedGame()) curState = State.GAME_WON;
			}else if(player.gold > 0 || player.silver > 0){ // regular give away
				goldbank += player.gold;
				silverbank += player.silver;
				player.gold = 0;
				player.silver = 0;
				
				curState = State.ROLL;
			}else{ // You're a loser!
				if(player.skeleton < 2){
					player.skeleton++;
				}else{
					player.skeleton = 0;	
				}
				curState = State.ROLL;
			}

			if(curState == State.ROLL) nextPlayer();
			break;	
		}
		case 8:{
			if(checkForOtherClicked(players[curPlayer])){
				// any activated should have chance to switch
				leftToActivate = activatedPlayers();
				curState = State.ACTIVATED;
				if(leftToActivate.length == 0){
					nextPlayer();
					curState = State.ROLL;	
				}
				fieldUsed = false;
			}
			break;	
		}
		case 9:{
			if(checkForClickAndSteal(players[curPlayer])){
				// go to loot state
				leftToActivate = activatedPlayers();
				leftToActivate.unshift(players[curPlayer]);
				curState = State.COIN_STOLEN;
				fieldUsed = false;
			}
			break;
		}
		case 3:
		case 7:
		case 13:{
			if(getMouseClick(34,63,5,4) || getMouseClick(32.75,55-0.55,7,coinLargeSize/2+0.8*2)){
				var coins = giveCoinsByValue(4,players[curPlayer]);
				sipsChosen = 4;
			}
			else if(getMouseClick(43,62,5,4) || getMouseClick(41.75,55-0.55,7,coinLargeSize/2+0.8*2)){
				var coins = giveCoinsByValue(3,players[curPlayer]);
				sipsChosen = 3;
			}
			else if(getMouseClick(52,62,5,4) || getMouseClick(50.75,55-0.55,7,coinLargeSize/2+0.8*2)){
				var coins = giveCoinsByValue(2,players[curPlayer]);
				sipsChosen = 2;
			}
			else if(getMouseClick(61,62,5,4) || getMouseClick(59.75,55-0.55,7,coinLargeSize/2+0.8*2)){
				var coins = giveCoinsByValue(1,players[curPlayer]);
				sipsChosen = 1;
			}
			
			// move on?
			if(sipsChosen != 0){
				curState = State.ACTIVATED;
				leftToActivate = activatedPlayers();
				if(leftToActivate.length == 0){
					nextPlayer();
					curState = State.ROLL;
            sipsChosen = 0;
				}
			}
			break;
		}
		case 12:{
			digDownOptionInput(leftToActivate[0]);
			break;
		}
		default:{
			var tempActivatedPlayers = activatedPlayers();
			for (var i = 0; i < tempActivatedPlayers.length; i++) {
				if(!local) $.post(dbURL, {'data':[debug? 'true': 'false', 'activated', gameID, tempActivatedPlayers[i].name, posToString(tempActivatedPlayers[i].pos)]});
			}
			if(tile==1){
				sipsToDatabase(players[curPlayer].name, 2, 0);
				for (var i = 0; i < tempActivatedPlayers.length; i++) {
					sipsToDatabase(tempActivatedPlayers[i].name, 2, 0);
				}
			}
			else if(tile==2){
				sipsToDatabase(players[curPlayer].name, 5, 0);
				for (var i = 0; i < tempActivatedPlayers.length; i++) {
					sipsToDatabase(tempActivatedPlayers[i].name, 5, 0);
				}
			}
			else if(tile==4){
				sipsToDatabase(players[curPlayer].name, 3, 0);
				for (var i = 0; i < tempActivatedPlayers.length; i++) {
					sipsToDatabase(tempActivatedPlayers[i].name, 3, 0);
				}
			}
			else if(tile==5){
				sipsToDatabase(players[curPlayer].name, 3, 0);
				for (var i = 0; i < tempActivatedPlayers.length; i++) {
					sipsToDatabase(tempActivatedPlayers[i].name, 3, 0);
				}
			}
			else if(tile==10){
				sipsToDatabase(players[curPlayer].name, 4, 0);
				for (var i = 0; i < tempActivatedPlayers.length; i++) {
					sipsToDatabase(tempActivatedPlayers[i].name, 4, 0);
				}
			}
			fieldUsed = false;
			nextPlayer();
			curState = State.ROLL;
		}
	}
}
