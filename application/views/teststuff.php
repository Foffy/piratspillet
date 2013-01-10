<div class="topBox">
  <h1>Piratspillet!</h1>
</div>


<div class="globalContainer">
  <div class="leftContainer">
    </br>
    <table>
      <tr>
    <ol class="tweets"></ol>
      </tr>
    </table>
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

  <div class="middleContainer" align="left">
    <div class="box">
      <div class="counterBox">
      </div>
      <div class="slideOutput">
      </div>
      <div class="slideshow" align="center">
        <img src="/assets/images/rules/rule_1.png" width="700" height="150" alt="1"/>
        <img src="/assets/images/rules/rule_2.png" width="700" height="150" alt="2"/>
        <img src="/assets/images/rules/rule_3.png" width="700" height="150" alt="3"/>
        <img src="/assets/images/rules/rule_4.png" width="700" height="150" alt="4"/>
        <img src="/assets/images/rules/rule_5.png" width="700" height="150" alt="5"/>
        <img src="/assets/images/rules/rule_6.png" width="700" height="150" alt="6"/>
        <img src="/assets/images/rules/rule_7.png" width="700" height="150" alt="7"/>
        <img src="/assets/images/rules/rule_8.png" width="700" height="150" alt="8"/>
        <img src="/assets/images/rules/rule_9.png" width="700" height="150" alt="9"/>
        <img src="/assets/images/rules/rule_10.png" width="700" height="150" alt="10"/>
        <img src="/assets/images/rules/rule_11.png" width="700" height="150" alt="11"/>
        <img src="/assets/images/rules/rule_12.png" width="700" height="150" alt="12"/>
        <img src="/assets/images/rules/rule_13.png" width="700" height="150" alt="13"/>
        <img src="/assets/images/rules/rule_14.png" width="700" height="150" alt="14"/>
        <img src="/assets/images/rules/rule_15.png" width="700" height="150" alt="15"/>
        <img src="/assets/images/rules/rule_16.png" width="700" height="150" alt="16"/>
        <img src="/assets/images/rules/rule_17.png" width="700" height="150" alt="17"/>
        <img src="/assets/images/rules/rule_18.png" width="700" height="150" alt="18"/>
        <img src="/assets/images/rules/rule_19.png" width="700" height="150" alt="19"/>
        <img src="/assets/images/rules/rule_20.png" width="700" height="150" alt="20"/>
      </div>
      </div>
      <div class="nav" align="center">
      <a id="prev" href="#"><left><img src="/assets/images/arrowLeft.png" width="100"/></left></a><a id="next" href="#"><right><img src="/assets/images/arrow.png" width="100"/></right></a>
      </div>

  <a href="http://beta.piratspillet.dk/index.php/rules">
   <img src="/assets/images/rules.jpg" width="100" height="100" />
  </a>
  <a href="http://beta.piratspillet.dk/index.php/game" >
   <img src="/assets/images/play.jpg" width="100" height="100" />
  </a>

</div>
</div>