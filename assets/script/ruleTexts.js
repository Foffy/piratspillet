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
    $('.slideOutput').html(toHTML);
}


function getRuleText(ruleIndex){
	var textToHTML = "";
	switch(ruleIndex){
		case "rule 1":{
			textToHTML = "<center><h1>Introduction</h1></center></br> <div class=\"speak4\">Piratspillet is a drinking game where 2 to 8 players can compete 
							</br> for the treasures of the far seas.
							</br> To win the game one must obtain three of five Whore Coins,
							</br> acquired by returning to harbour with five gold coins.
							</br> It's illegal to drink when you're not supposed to and when
							</br> caught doing so, you must take a penalty sip.
						</div>";
			break;
		}
		case "rule 2":{
			textToHTML = "<center><h1>Rule 2</h1></center></br> <p>This is rule number 2.</p>";
		}
	}
	return textToHTML;
}