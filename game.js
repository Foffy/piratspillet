var width = 320,
height = 500,
c = document.getElementById('canvas'),
ctx = c.getContext('2d');

c.width = width;
c.height = height;

var clear = function(){
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
		if(circles[i][1] - circles[i][2] > height){
			circles[i][0] = Math.random() * width;
			circles[i][2] = Math.random() * 100;
			circles[i][1] = 0 - circles[i][2];
			circles[i][3] = Math.random() / 2;
		}else{
			circles[i][1] += deltaY;
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
player.setPosition((width-player.width)/2,(height - player.height)/2);


var GameLoop = function(){
	clear();
	MoveCircles(5);
	DrawCircles();
	player.draw();
	setTimeout(GameLoop, 1000 / 50);
}

GameLoop();







