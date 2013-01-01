<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dotest extends CI_Controller {

  public function index(){

  	$data['title'] = "Piratspillet - BETA!";
  	$this->load->view('testdb', $data);
  }
}

?>
