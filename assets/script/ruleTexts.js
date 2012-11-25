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
    $('#slideOutput').html("Scroll complete for:&lt;br&gt;" + this.src)
        .append('&lt;h3&gt;' + this.alt + '&lt;/h3&gt;');
}


function getRuleText(ruleIndex){
	var textToHTML = "";
	switch(ruleSrc){
		case "1":{
			textToHTML = "<h1>nummer 1</h1>";
			break;
		}
		case "2":{
			textToHTML = "<h1>nummer 2</h1>";
		}
	}
	return textToHTML;
}