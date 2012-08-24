var c = document.getElementById('c');
ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;
var width = c.width;
var height = c.height;
window.addEventListener('resize', resizeCanvas,false);

function resizeCanvas(){
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	width = c.width;
	height = c.height;
}

function clear(){
	ctx.fillStyle = '#d0e7f9';
	ctx.beginPath();
	ctx.rect(0,0,width,height);
	ctx.closePath();
	ctx.fill();
}

function pctOf(value,total){
	return total/100*value;	
}

function drawImg(img, pctX, pctY, pctW, pctH){
	//ctx.drawImage(img, 
}






var GameLoop = function(){
	clear();

	setTimeout(GameLoop, 1000 / 50);
}

GameLoop();







