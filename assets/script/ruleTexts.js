$(document).keydown(function (e) {
      var keyCode = e.keyCode || e.which,
          arrow = {left: 37, right: 39};

      switch (keyCode) {
        case arrow.left:
          $('.slideshow').cycle('prev');
        break;
        case arrow.right:
          $('.slideshow').cycle('next');
        break;
      }
    });

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
		case "1":{
			textToHTML = "<center><h1>Introduction</h1></center></br> <div class=\"speak4\">Piratspillet is a drinking game where 2 to 8 players can compete for the treasures of the far seas. To win the game one must obtain three of five Whore Coins acquired by returning to harbour with five gold coins. It's illegal to drink when you're not supposed to and when caught doing so, you must take a penalty sip.</div>";
			break;
		}
		case "2":{
			textToHTML = "<center><h1>General</h1></center></br> <div class=\"speak4\">The board is divided into 14 fields and everyone starts at The Harbour. During a year (one trip around the board) the players can find, steal and earn Gold Coins and Silver Coins which will be spend on whores and alcohol for your mates when you return to The Harbour</div>";
			break;
		}
		case "3":{
			textToHTML = "<center><h1>General</h1></center></br> <div class=\"speak4\">The \"bank\" has a total of 10 Gold Coins and 10 Silver Coins. Is the banks is out of any of these it's just too bad. It is illegal to exchange Coins with the bank. For example you can't exchange two Silver Coins for a Gold Coin.</div>";
			break;
		}

		case "4":{
			textToHTML = "<center><h1>The Island</h1></center></br><div class=\"speak4\">The middle of the board is the Treasure Island. When you land on a field adjacent to a treasure (either in the outer or inner spaces on the island) you drink for it and remove one silver worth of coins. The spaces on the outer rim counts double since they are more specific.</div>";
			break;
		}

		case "5":{
			textToHTML = "<center><h1>A Turn</h1></center></br><div class=\"speak4\">When it is your turn, you roll the die and you're moved that many spaces forward. If you pass The harbour you automatically stop there, if you land on it directly your Coins count double! When you land on a field the special rule for it applies to you and everyone else currently there.</div>";
			break;
		}

		case "6":{
			textToHTML = "<center><h1>The Harbour</h1></center></br><div class=\"speak4\">When you return to The Harbour you spend your treasure on your mates and yourself. If you have 5 Gold Coins you automatically buy a whore for everyone and you receive a Whore Coin. Remaining Coins is spent on rum for your mates and yourself. You can't split your Coins into smaller values, i.e. you can't give two players sips for one Gold Coin.</div>";
			break;
		}

		case "7":{
			textToHTML = "<center><h1>The Harbour</h1></center></br><div class=\"speak4\">If you land on The Harbour directly all sips are doubled. When you return to The Harbour without any treasures you are a LOSER and will receive a Skeleton for your closet. For every round you return to The Harbour with treasure you lose one Skeleton. When you accumulate three Skeletons you go down one rank (this only applies</div>";
			break;
		}

		case "8":{
			textToHTML ="<center><h1>Skull n' Bones</h1></center></br><div class=\"speak4\">This field is a nasty one! When you land you have to empty half a beverage (regular beer size). Simple and easy.</div>";
			break;
		}

		case "9":{
			textToHTML = "<center><h1>Parrots!</h1></center></br><div class=\"speak4\">When you land on a field with a Parrot you have been fucked by the Parrot. This is soar business and you drink the amount of sips written on the field.</div>";
			break;
		}

		case "10":{
			textToHTML ="<center><h1>Plunderin'</h1></center></br><div class=\"speak4\">This is probably the best place to land. There are three of these fields and when you land here you can drink between one and four sips. Each sip is converted to a Silver Coin and for every two sips you can take a Gold Coin instead. The amount you select also applies to the players already there.</div>";
			break;
		}

		case "11":{
			textToHTML ="<center><h1>Mouth Full</h1></center></br><div class=\"speak4\">When landing here you must first fill your mouth with whatever beverage you have and not swallow it untill your mouth is filled to the brim!</div>";
			break;
		}

		case "12":{
			textToHTML ="<center><h1>The Chests</h1></center></br><div class=\"speak4\">When landing on the chests you receive one Silver Coin, unless you land on The Closed Chest with a die roll of six. Then you are lucky and receives a Gold Coin instead.</div>";
			break;
		}

		case "13":{
			textToHTML ="<center><h1>Greedy Scullywag</h1></center></br><div class=\"speak4\">Here you must switch treasures with another player. Whore Coins are not counted as treasure.</div>";
			break;
		}

		case "14":{
			textToHTML ="<center><h1>The Cannon</h1></center></br><div class=\"speak4\">You board another player and steals a random Coin from his or her treasure (Whore Coins not included).</div>";
			break;
		}

		case "15":{
			textToHTML ="<center><h1>Treasure Island</h1></center></br><div class=\"speak4\">Here you may dig down some of your treasure for others to drink for (including maybe yourself). You can dig down as many as you want, but only on one space on the island.</div>";
			break;
		}

		case "16":{
			textToHTML ="<center><h1>Advanced Rules</h1></center></br><div class=\"speak4\">When you have tried the \"simple\" rules a few times and are ready you add the rest of the fun, you can introduce the Ranks. There are three tanks in piratspillet: Antiperspirant, Pirate and Pirate Captain.</div>";
			break;
		}

		case "17":{
			textToHTML ="<center><h1>Antiperspirant</h1></center></br><div class=\"speak4\">The first rank applies to players who are playing for the first time. When doing so you start out on a Pirate's or a Pirate Captain's ship (doing the same as they do and they will teach you the basic rules).</div>";
			break;
		}

		case "18":{
			textToHTML ="<center><h1>Pirate &amp Pirate Captain</h1></center></br><div class=\"speak4\">When an Antiperspirant has been with the Pirate or Pirate Captain for one year (one trip around the board) they receive their own ship and are promoted to Pirate. When a player plays the game a second time and was promoted to Pirate in the first game, he ro she is promoted to Pirate Captain.</div>";
			break;
		}

		case "19":{
			textToHTML ="<center><h1>Adressing Others</h1></center></br><div class=\"speak4\">When adressing another player you must say their rank before their name. Failure to do so results in a penalty sip if you're caught An Antiperspirant may only speak to their assigned Pirate or Pirate Captain. An example: \"Hey Pirate Captain Roger, can you pass me a beer?\"</div>";
			break;
		}

		case "20":{
			textToHTML ="<center><h1>Duel</h1></center></br><div class=\"speak4\">Any disagreements (regarding the game or anything else) is settled with a Duel. A duel between to parties consists of both of them opening and drinking a full beer at the same time. The one who finishes first is right.</div>";
			break;
		}

	}
	return textToHTML;
}