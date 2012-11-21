<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Splash extends CI_Controller {

	public function index()
	{
		$data['header'] = "default";
		$data['title'] = "Piratspillet - BETA!";
		$data['main_content'] = "splash.php";
		$this->load->view('includes/template', $data);
	}
}