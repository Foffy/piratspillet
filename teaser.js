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


var numCircles = 10, circles = [];

for (var i = 0; i < numCircles; i++){
	circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2]);
}

function DrawCircles(){
	for(var i = 0; i < numCircles; i++){
		ctx.fillStyle = 'rgba(255,255,255, ' + circles[i][3] + ')';
		ctx.beginPath();
		ctx.arc(circles[i][0],circles[i][1],circles[i][2],0,Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
	}
};

function MoveCircles(deltaY){
	for(var i = 0; i < numCircles; i++){
		if(circles[i][1] < -circles[i][2]){
			circles[i][0] = Math.random() * width;
			circles[i][2] = Math.random() * 100;
			circles[i][1] = height + circles[i][2];
			circles[i][3] = Math.random() / 2;
		}else{
			circles[i][1] -= deltaY;
		}
	}
}

// player code
function Player(){
	this.image = new Image();
	this.image.src = "icon_start.png";
	this.width = 50;
	this.height = 50;
	this.X = 0;
	this.Y = 0;
	this.setPosition = function(x,y){
		this.X = x;
		this.Y = y;
	}
	
	this.draw = function(){
		try{
			ctx.drawImage(this.image, this.X, this.Y);
		}catch(e){
			
		}
	}
}
var player = new Player();
//player.setPosition((width-player.width)/2,(height - player.height)/2);
player.setPosition(width - player.width, height - player.height);


var GameLoop = function(){
	clear();
	MoveCircles(10);
	DrawCircles();
	player.draw();
	setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
