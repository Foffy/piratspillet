<?php

class Beta extends CI_Controller {

  public function index(){

    $data['title'] = "Piratspillet - Beta!";
    $this->load->view('the_game',$data);
  }




}

?>
