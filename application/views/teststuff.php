<div class="topBox">
  <h1>Piratspillet!</h1>
  <hr>
</div>


<div class="globalContainer">
  <div class="leftContainer">
    </br>
    <h2>Activity</h2>
    <div class="textStuff">
    </div>
  </div>

  <div class="contentCol">

    <div class="rightContainer">
      <h2>Leaderboards</h2>
      <ul class="tabs">
        <li><a href="#">Sips</a></li>
        <li><a href="#">Coins</a></li>
        <li><a href="#">Wins</a></li>
      </ul>

      <!-- tab "panes" -->
      <div class="panes">
        <div class="textStuff">
          <?php
 
          $this->db->select('gameid, player, taken');
          $query = $this->db->get('sips');
          foreach ($query->result() as $row)
          {
            echo $row->gameid . " " . $row->player . " " . $row->taken . " sips.</br>";
          }
          
          ?>
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
   <img src="/assets/images/rules.jpg" width="100" height="100" />
  </a>
  <a href="http://beta.piratspillet.dk/index.php/game" >
   <img src="/assets/images/play.jpg" width="100" height="100" />
  </a>

</div>
</div>