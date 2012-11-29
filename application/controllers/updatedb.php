<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Updatedb extends CI_Controller {

	public function index()
	{
		$data = $this->input->post('data');

		$dbData = array(
			'gameId' => $data[0],
			'player' => $data[1],
			);

		$this->db->insert('rolls',$dbData);

	}
}