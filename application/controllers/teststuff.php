<!doctype html>
<html lang="da">
<head>
  <title>"Piratspillet - DEBUG!"</title>

  <link type="text/css" rel="stylesheet" href="/assets/style/main.css"/>

  <meta charset="utf-8">

  <!--[if lt IE 9]>
  <script scr="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <link rel="stylesheet" href="/sites/all/themes/customtemplate/style/screenIE7.css">
  <![endif]-->

  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <script src="http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js"></script>
  <link rel="stylesheet" href="/assets/style/tabs.css"
        type="text/css" media="screen" />
  <link rel="stylesheet" href="/assets/style/tabs-panes.css"
        type="text/css" media="screen" />
</head>
<div class="topBox">
  <h1>Piratspillet!</h1>
  <hr>
</div>


<div class="globalContainer">
  <div class="leftContainer">
    </br>
    <h2>Activity</h2>
    <div class="textStuff">
      <?php
        echo "lol!";
      ?>
    </div>
  </div>

  <div class="contentCol">

    <div class="rightContainer">
      <h2>Leaderboards</h2>
      <ul class="tabs">
        <li><a href="#">Wins</a></li>
        <li><a href="#">Coins</a></li>
        <li><a href="#">Sips</a></li>
      </ul>

      <!-- tab "panes" -->
      <div class="panes">
        <div class="textStuff">
        </div>
        <div>Second tab content</div>
        <div>Third tab content</div>
      </div>

      <script>
      // perform JavaScript after the document is scriptable.
      $(function() {
          // setup ul.tabs to work as tabs for each div directly under div.panes
          $("ul.tabs").tabs("div.panes > div");
      });
      </script>       
    </div>


  </div>

  <div class="middleContainer" align="center">

  <a href="http://beta.piratspillet.dk/index.php/rules">
   <img src="images/rules.jpg" width="100" height="100" />
  </a>
  <a href="http://beta.piratspillet.dk/index.php/game" >
   <img src="images/play.jpg" width="100" height="100" />
  </a>

</div>
</div>

</body>
</html>
