$(document).ready(function() {
    $('.slideshow').cycle({
		fx: 'fade',
		speed: 'fast',
		timeout: 0,
		next: '#next',
		prev: '#prev',
		after: onAfter
	});
});

function onAfter() {
	var toHTML = getRuleText(this.alt);
	var counter;
	switch(this.alt){
		case "rule 1":
			counter = "1/20"
			break;
		case "rule 2":
			counter = "2/20"
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
			textToHTML = "<center><h1>Rule 2</h1></center></br> <p>This is rule number 2.</p>";
		}
	}
	return textToHTML;
}