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
			textToHTML = "<center><h1>Rule 1</h1></center></br> <p>This is rule number 1.</p>";
			break;
		}
		case "rule 2":{
			textToHTML = "<h1>Rule 2</h1></br> <p>This is rule number 2.</p>";
		}
	}
	return textToHTML;
}