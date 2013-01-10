<div class="topBox">
  <h1>Piratspillet!</h1>
</div>


<div class="globalContainer">
  <div class="leftContainer">
    </br>
    <h2>Activity</h2>
    <a class="twitter-timeline" width="300" height="350" href="https://twitter.com/search?q=%23piratspillet" data-widget-id="289391947272044544">Tweets about "#piratspillet"</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

  </div>

  <div class="contentCol">

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