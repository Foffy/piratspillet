<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Updatedb extends CI_Controller {

	public function index()
	{
		$data = $this->input->post('data');
		$this->updateRolls($data);

	}

	private function updateRolls($data){
		$dbData = array(
			'player' => $data[1],
			$data[2] => $data[2]+"+1",
			'last' => "NOW()"
			);

		$this->db->where('gameID',$data[0]);
		$this->db->update('rolls',$dbData);
		$check = $this->db->affected_rows();

		if($check==0){
			$dbData = array(
				'gameID' => $data[0],
				'player' => $data[1],
				$data[2] => $data[2]+"+1",
				'first' => "NOW()",
				'last' => "NOW()"
				);
			$this->db->insert('rolls',$dbData);
		}
	}
}