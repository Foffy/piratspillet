<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Rules extends CI_Controller {

	public function index()
	{
		$data['header'] = "includes/header_slide";
		$data['title'] = "Piratspillet - BETA!";
		$data['main_content'] = "rules_page";
		$this->load->view('includes/template', $data);
	}
}