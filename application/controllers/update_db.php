<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Update_db extends CI_Controller {

	public function index(){
		$data = $this->input->post('data');
	}

	private function updateRolls($dataInput){
		$dbData = array(
			'gameId' => $dataInput[0],
			'player' => $dataInput[1],
			);

		$this->db->insert('rolls',$dbData);
	}
}