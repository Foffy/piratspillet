<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Testdb extends CI_Controller {

	public function index(){
		$this->load->database('debug', TRUE);
		$dbstuff = $this->input->post('data');

		$data['gameid'] = $this->insertGame();

		echo "lol";
		$data['title'] = "default";
		$this->load->view('testdb', $data);
	}

	private function insertGame(){
		# $data = [debug, 'games']

		date_default_timezone_set('CET');
		$date = new DateTime();
		$browserInfo = $this->getBrowser();

		$dbData = array(
			'ip' => $_SERVER['REMOTE_ADDR'],
			'browser' => $browserInfo['name'],
			'started' => $date->format("Y-m-d H:i:s")
			);
		$this->db->insert($data[1],$dbData);
		$id = $this->db->insert_id();
		return $id;
	}

	private function updateLanded($dbstuff){
		# $data = [debug, 'landed', gameID, player, field]
		$dbData = array(
			$data[4] => $data[4]+" + 1",
			);

		$this->db->where('gameId',$data['gameid']);
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