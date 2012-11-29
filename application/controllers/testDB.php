<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class TestDB extends CI_Controller {

  public function index(){

  	$data['header'] = "includes/header_no_right_click";
  	$data['title'] = "Piratspillet - BETA!";
  	$data['main_content'] = "update";
  	$this->load->view('includes/template', $data);
  }
}

?>
