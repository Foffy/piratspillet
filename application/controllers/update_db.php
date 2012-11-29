<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Update_db extends CI_Controller {

	public function index(){
		$data = $this->input->post('data');
	}

	private function updateRolls($data){
		$dbData = array(
			'gameId' => $data[0],
			'player' => $data[1],
			);

		$this->db->insert('rolls',$dbData);
	}
}