<div id="topBox">
  <h1>Piratspillet!</h1>
</div>

</br>

<div id="box">
	</br>
	<div class="speak4">
  		<a href="http://beta.piratspillet.dk/index.php/game" title="Play the game!">PLAY</a>
  		</br> 
  		<a href="http://beta.piratspillet.dk/index.php/rules" title="Play the game!">READ THE RULES</a>
  		</br>
  		Time is: <?php
		date_default_timezone_set('EST');
		$date = new DateTime();
		echo $date->getTimestamp();
		echo "<br>";
		echo $dateTime->format("Y-m-d H:i:s");

 		?>

	</div>
</div>