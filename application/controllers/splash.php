<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Splash extends CI_Controller {

	public function index()
	{
		$data['title'] = "Piratspillet - BETA!";

		$this->load->view('splash', $data);
	}
}