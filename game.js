var c = document.getElementById('c');
ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;
var width = c.width;
var height = c.height;
var xDisp = 0;
var yDisp = 0;
resizeCanvas();

window.addEventListener('resize', resizeCanvas,false);

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

function clear(){
	ctx.fillStyle = '#d0e7f9';
	ctx.beginPath();
	ctx.rect(0,0,c.width,c.height);
	ctx.closePath();
	ctx.fill();
}

function pctToX(value){
	return xDisp + pctOf(value,width);
}

function pctToY(value){
	return yDisp + pctOf(value,height);	
}

function pctOf(value,total){
	return total/100*value;	
}

function drawImg(img, pctX, pctY, pctW, pctH){
	//ctx.drawImage(img, 
}

function drawText(text, pctX, pctY, pctW, pctFont){
	ctx.fillStyle = "black";
	//var splitted = text.split("\n");
	var fontH = pctOf(pctFont,width)
	ctx.font = "bold " + fontH + "px Arial";
	ctx.fillText(text, pctToX(pctX),pctToY(pctY) + fontH);
}

function drawRect(pctX, pctY, pctW, pctH, color){
		ctx.fillStyle = color;
		ctx.fillRect(pctToX(pctX),pctToY(pctY),pctToX(pctW)-xDisp,pctToY(pctH)-yDisp);
}


var names = [];

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






