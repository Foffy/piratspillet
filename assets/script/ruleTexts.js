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
	var counter = "<div class=\"speak3\">"+this.alt+"/20</div>";
    $('.slideOutput').html(toHTML);
    $('.counterBox').html(counter);
}


function getRuleText(ruleIndex){
	var textToHTML = "";
	switch(ruleIndex){
		case "Rule 1":{
			textToHTML = "<center><h1>Introduction</h1></center></br> <div class=\"speak4\">Piratspillet is a drinking game where 2 to 8 players can compete for the treasures of the far seas. To win the game one must obtain three of five Whore Coins acquired by returning to harbour with five gold coins. It's illegal to drink when you're not supposed to and when caught doing so, you must take a penalty sip.</div>";
			break;
		}
		case "Rule 2":{
			textToHTML = "<center><h1>General</h1></center></br> <div class=\"speak4\">The board is divided into 14 fields and everyone starts at The Harbour. During a year (one trip around the board) the players can find, steal and earn Gold Coins and Silver Coins which will be spend on whores and alcohol for your mates when you return to The Harbour</div>";
			break;
		}
		case "Rule 3":{
			textToHTML = "<center><h1>General</h1></center></br> <div class=\"speak4\">The \"bank\" has a total of 10 Gold Coins and 10 Silver Coins. Is the banks is out of any of these it's just too bad. It is illegal to exchange Coins with the bank. For example you can't exchange two Silver Coins for a Gold Coin.</div>";
			break;
		}

		case "Rule 4":{
			textToHTML = "<center><h1>The Island</h1></center><div class=\"speak4\">The middle of the board is the Treasure Island. When you land on a field adjacent to a treassure (either in the outer or inner spaces on the island) you drink for it and remove one silver worth of coins. The spaces on the outer rim counts double since they are more specific.</div>"
			break;
		}

		case "Rule 5":{
			textToHTML = "<center><h1>TITLE</h1><div class=\"speak4\">TEXT</div>"
			break;
		}


	}
	return textToHTML;
}