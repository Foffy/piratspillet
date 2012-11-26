$(document).ready(function() {
    $('.slideshow').cycle({
		fx: 'fade',
		speed: 'fast',
		timeout: 0,
		next: '#next',
		prev: '#prev',
		before: onAfter
	});
});

function onAfter() {
	var toHTML = getRuleText(this.alt);
	var counter;
	switch(this.alt){
		case "rule 1":
			counter = "<div class=\"speak4\"><b>1/20</b></div>"
			break;
		case "rule 2":
			counter = "<div class=\"speak4\"><b>2/20</b></div>"
			break;
	}
    $('.slideOutput').html(toHTML);
    $('.counterBox').html(counter);
}


function getRuleText(ruleIndex){
	var textToHTML = "";
	switch(ruleIndex){
		case "rule 1":{
			textToHTML = "<center><h1>Introduction</h1></center></br> <div class=\"speak4\">Piratspillet is a drinking game where 2 to 8 players can compete for the treasures of the far seas. To win the game one must obtain three of five Whore Coins acquired by returning to harbour with five gold coins. It's illegal to drink when you're not supposed to and when caught doing so, you must take a penalty sip.</div>";
			break;
		}
		case "rule 2":{
			textToHTML = "<center><h1>General</h1></center></br> <div class=\"speak4\">The board is divided into 14 fields and everyone starts at The Harbour. During a year (one trip around the board) the players can find, steal and earn Gold Coins and Silver Coins which will be spend on whores and alcohol for your mates when you return to The Harbour</div>";
			break;
		}
		case "rule 3":{
			textToHTML = "<center><h1>General</h1></center></br> <div class=\"speak4\">The \"bank\" has a total of 10 Gold Coins and 10 Silver Coins. Is the banks reserves depleted it's just too bad. It is illegal to exchange Coins with the bank. I.E. you can't exchange two Silver Coins for a Gold Coin.</div>";
		}
	}
	return textToHTML;
}