<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Teststuff extends CI_Controller {

  public function index(){

    $data['header'] = "includes/header_tabs";
    $data['title'] = "Piratspillet - DEBUG!";
    $data['main_content'] = "teststuff";
    $this->load->view('includes/template', $data);
  }
}