<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Updatedb extends CI_Controller {

	public function index()
	{
		$data = $this->input->post('data');
		if($data[0]=='debug'){
			$this->load->database('debug', TRUE); 
		}

		switch($data[1]){
			case 'games':
				$id = $this->insertGame($data);
				echo $this->db->mysql_insert_id();
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
				break
fa;			case 'sips':
				$this->updateSips($data);
				break;
		}
	}

	private function updateDatabase($data){
		$check = 0;
		$this->db->where('gameID',$data[2]);
		$this->db->where('player',$data[3]);
		$this->db->update($data[1],$dbData);
		$check = $this->db->affected_rows();
	}

	private function insertGame($data){
		# $data = ['games']
		$id = 0;
		$dbData = array(
			'ip' => 'IP',
			'browser' => 'prolly Chrome',
			'started' => 'NOW()'
			);
			$id = $this->db->insert($data[1],$dbData);
		return $id;
	}

	private function updateRolls($data){
		# $data = ['rolls', gameID, player, dice]
		$dbData = array(
			$data[4] => $data[4]+"+1",
			'last' => "NOW()"
			);

		$check = $this->updateDatabase($data);

		if($check==0){
			$dbData = array(
				'gameID' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]+"+1",
				'first' => "NOW()",
				'last' => "NOW()"
				);
			$this->db->insert($data[1],$dbData);

		}
	}

	private function updateLanded($data){
		# $data = ['landed', gameID, player, field]
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
		# $data = ['activated', gameID, player, field]
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
		# $data = ['coins', gameID, player, gold, silver, whore]
		$dbData = array(
			'gold' => 'gold'+$data[4],
			'silver' => 'silver'+$data[5],
			'whore' => 'whore'+$data[6]
			);

		$check = $this->updateDatabase($data);

		if($check==0){
			$dbData = array(
				'gameID' => $data[2],
				'player' => $data[3],
				'gold' => $data[4],
				'silver' => $data[5],
				'whore' => $data[6]
				);
			$this->db->insert($data[1],$dbData);
		}
	}

	private function updateSips($data){
		# $data = ['sips', gameID, player, taken, given]
		$dbData = array(
			'taken' => $data[4],
			'given' => $data[5]
			);

		$check = $this->updateDatabase($data);

		if($check==0){
			$dbData = array(
				'gameID' => $data[2],
				'player' => $data[3],
				'taken' => $data[4],
				'given' => $data[5]
				);
			$this->db->insert($data[1],$dbData);
		}
	}
}