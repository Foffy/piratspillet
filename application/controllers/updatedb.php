<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Updatedb extends CI_Controller {

	public function index()
	{
		$data = $this->input->post('data');
		if($data[0]=='true'){
			$this->load->database('debug', TRUE); 
		}

		switch($data[1]){
			case 'games':
				$id = $this->insertGame($data);
				return $id;
				break;
			case 'rolls':
				$this->updateRolls($data);
				break;
			case 'landed':
				$this->updateLanded($data);
				break;
			case 'activated':
				$this->updateActivated($data);
				break;
			case 'coins':
				$this->updateCoins($data);
				break;
			case 'sips':
				$this->updateSips($data);
				break;
		}
	}

	private function updateDatabase($data){
		$check = 0;
		$this->db->where('gameId',$data[2]);
		$this->db->where('player',$data[3]);
		$check = $this->db->update($data[1],$dbData);
	}

	private function insertGame($data){
		# $data = [debug, 'games']
		$id = 0;
		$dbData = array(
			'ip' => 'IP',
			'browser' => 'prolly Chrome',
			'started' => 'NOW()'
			);
		$this->db->insert($data[1],$dbData);
		$id = $this->db->insert_id();
		return $id;
	}

	private function updateRolls($data){
		# $data = [debug, 'rolls', gameID, player, dice]
		$dbData = array(
			$data[4] => $data[4]+"+1",
			'last' => "NOW()"
			);

		$check = $this->updateDatabase($data);

		if($check==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]+"+1",
				'first' => "NOW()",
				'last' => "NOW()"
				);
			$this->db->insert($data[1],$dbData);

		}
	}

	private function updateLanded($data){
		# $data = [debug, 'landed', gameID, player, field]
		$dbData = array(
			$data[4] => $data[4]+"+1",
			);

		$check = $this->updateDatabase($data);

		if($check ==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]+"+1"
				);

			$this->db->insert($data[1],$dbData);

		}
	}

	private function updateActivated($data){
		# $data = [debug, 'activated', gameID, player, field]
		$dbData = array(
			$data[4] => $data[4]+"+1",
			);

		$check = $this->updateDatabase($data);

		if($check ==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]+"+1"
				);
			$this->db->insert($data[1],$dbData);

		}
	}

	private function updateCoins($data){
		# $data = [debug, 'coins', gameID, player, fromPlayer, gold, silver, whore]
		$dbData = array(
			'gameId' => $data[2],
			'player' => $data[3],
			'fromPlayer' => $data[4],
			'gold' => $data[5],
			'silver' => $data[6],
			'whore' => $data[7]
			);
		$this->db->insert($data[1],$dbData);
	}

	private function updateSips($data){
		# $data = [debug, 'sips', gameID, player, taken, given]
		$dbData = array(
			'taken' => $data[4],
			'given' => $data[5]
			);

		$check = $this->updateDatabase($data);

		if($check==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				'taken' => $data[4],
				'given' => $data[5]
				);
			$this->db->insert($data[1],$dbData);
		}
	}
}