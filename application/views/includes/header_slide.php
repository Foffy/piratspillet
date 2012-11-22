<!doctype html>
<html lang="da">
<head>
  <title><?php echo $title; ?></title>

  <link type="text/css" rel="stylesheet" href="/assets/style/main.css"/>

  <meta charset="utf-8">

  <!--[if lt IE 9]>
  <script scr="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <link rel="stylesheet" href="/sites/all/themes/customtemplate/style/screenIE7.css">
  <![endif]-->

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.js"></script>
<!-- include Cycle plugin -->
<script type="text/javascript" src="http://cloud.github.com/downloads/malsup/cycle/jquery.cycle.all.latest.js"></script>
<script type="text/javascript">
$(document).ready(function(){
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
  var text = "lol" + this.alt;
  $.getScript("/application/views/includes/ruleTexts.js", function(){
    alert(text);
  });
  $('#output').html(text)
      .append('<h3>' + this.alt + '</h3>');
}

</script>

</head>
<body>