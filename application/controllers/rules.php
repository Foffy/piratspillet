<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Rules extends CI_Controller {

	public function index()
	{
		$data['title'] = "Piratspillet - Beta! - Rules";
		$this->load->view('rules_page', $data);
	}
}