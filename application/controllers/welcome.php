<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function index()
	{
		$data['title'] = "Piratspillet - BETA!";

		$this->load->view('welcome_message', $data);
	}
}