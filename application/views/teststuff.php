<div class="topBox">
  <h1>Piratspillet!</h1>
</div>


<div class="globalContainer">
  <div class="leftContainer">
    <h2>People say ...</h2>
    </br>
    <ol class="tweets"></ol>
    <script>window.jQuery || document.write('<script src="/assets/script/vendor/jquery-1.8.2.min.js"><\/script>')</script>
    <script src="/assets/script/tweetMachine.js"></script>
    <script>
        $('.tweets').tweetMachine('#piratspillet');
    </script>
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
          //SELECT player, SUM(taken), SUM(given) FROM sips GROUP BY player ORDER BY SUM(taken) DESC, SUM(given) DESC LIMIT 10

          $this->db->select('player');
          $this->db->select_sum('taken');
          $this->db->select_sum('given');
          $this->db->group_by('player');
          $this->db->order_by('taken', 'DESC');
          $this->db->order_by('given', 'DESC');
          $this->db->limit('10');
          $query = $this->db->get('sips');

          echo "<table vertical_align='top'>";

          foreach ($query->result() as $row)
          {
            echo "<tr><td><strong>" . $row->player . " drank :</strong></td><td>" . $row->taken . " sips and gave </td><td>".$row->given ."</td></tr></br>";
          }
          echo "</table>";
          
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

  <a href="http://beta.piratspillet.dk/index.php/rules">
   <img src="/assets/images/chromeborder.png" />
  </a>
  <a href="http://beta.piratspillet.dk/index.php/game" >
   <img src="/assets/images/chromefilled.png" />
  </a>

</div>
</div>