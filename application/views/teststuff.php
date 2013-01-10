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
      <h2>Top 10!</h2>
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
          $count = 1;

          echo "<table><tr><th></th><th></th><th>Taken</th><th>Given</th></tr>";

          foreach ($query->result() as $row)
          {
            echo "<tr><td>".$count."</td><td>" . $row->player . "</td><td>" . $row->taken . "</td><td>".$row->given . "</td></tr>";
            $count += 1;
          }
          echo "</table>";
          
          ?>
        </div>
        <div class="textStuff">
          <?php
          //SELECT player, SUM(whore), SUM(gold), SUM(silver) FROM coins GROUP BY player ORDER BY SUM(whore) DESC, SUM(gold) DESC, SUM(silver) DESC LIMIT 10

          $this->db->select('player');
          $this->db->select_sum('whore');
          $this->db->select_sum('gold');
          $this->db->select_sum('silver');
          $this->db->group_by('player');
          $this->db->order_by('whore', 'DESC');
          $this->db->order_by('gold', 'DESC');
          $this->db->order_by('silver', 'DESC');
          $this->db->limit('10');
          $query = $this->db->get('coins');
          $count = 1;

          echo "<table><tr><th></th><th></th><th>Whore</th><th>Gold</th><th>Silver</th></tr>";

          foreach ($query->result() as $row)
          {
            echo "<tr><td>".$count."</td><td>" . $row->player . "</td><td>" . $row->whore . "</td><td>".$row->gold . "</td><td>" . $row->silver . "</td></tr>";
            $count += 1;
          }
          echo "</table>";
          
          ?>
        </div>

        <div class="textStuff">
          <?php
          //SELECT player, COUNT(gameId) FROM winners GROUP BY player ORDER BY COUNT(gameId) DESC LIMIT 10

          $this->db->select('player');
          $this->db->select_sum('gameId');
          $this->db->group_by('player');
          $this->db->order_by('gameId', 'DESC');
          $this->db->limit('10');
          $query = $this->db->get('winners');
          $count = 1;

          echo "<table><tr><th></th><th></th><th>Wins</th></tr>";

          foreach ($query->result() as $row)
          {
            echo "<tr><td>".$count."</td><td>" . $row->player . "</td><td>" . $row->gameId . "</td></tr>";
            $count += 1;
          }
          echo "</table>";
          
          ?>
        </div>
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