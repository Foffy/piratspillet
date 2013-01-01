<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Testdb extends CI_Controller {

	public function index(){
		$data['header'] = "default";
		$this->load->view('testdb', $data);
	}
	
}