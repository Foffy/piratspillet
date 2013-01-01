<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Testdb extends CI_Controller {

	public function index(){
		$this->load->database('debug', TRUE);
		$dbstuff = $this->input->post('data');

		$this->updateLanded($dbstuff);
		$data['title'] = "default";
		$this->load->view('testdb', $data);
	}

	private function updateLanded($dbstuff){
		# $data = [debug, 'landed', gameID, player, field]
		$dbData = array(
			$data[4] => $data[4]+" + 1",
			);

		$this->db->where('gameId',1);
		$this->db->where('player',$data[3]);
		$this->db->update($data[1],$dbData);
		$check = mysqli_affected_rows();

		if($check ==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]+" + 1"
				);

			$this->db->insert($data[1],$dbData);
		}
	}
	
}