<div class="topBox">
  <h1>Piratspillet!</h1>
</div>


<div class="globalContainer">
  <div class="leftContainer">
    </br>
    <h2>Activity</h2>
    <ol class="tweets"></ol>

    <script>window.jQuery || document.write('<script src="/assets/script/vendor/jquery-1.8.2.min.js"><\/script>')</script>
    <script src="/assets/script/tweetMachine.js"></script>

    <script>
        $('.tweets').tweetMachine('#piratspillet');
    </script>
  </div>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
  <div class="contentCol"

    <div class="rightContainer">
      <h2>Top ...</h2>
      <ul class="tabs">
        <li><a href="#">Sips</a></li>
        <li><a href="#">Coins</a></li>
        <li><a href="#">Wins</a></li>
      </ul>

      <!-- tab "panes" -->
      <div class="panes">
        <div class="textStuff">
          <?php
 
          $this->db->select('player, taken, given');
          $this->db->order_by('taken', 'DESC');
          $query = $this->db->get('sips');
          $player = array();
          foreach ($query->result() as $row)
          {
            echo "<strong>" . $row->player . "</strong> has drunk " . $row->taken . " sips. and given ".$row->given ."</br>";
          }
          
          ?>
        </div>
        <div>Moar data</div>
        <div>Even more!</div>
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