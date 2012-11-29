<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Updatedb extends CI_Controller {

	public function index()
	{
		$data = $this->input->post('data');

		switch($data[0]){
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

	private function updateRolls($data){
		# $data = ['rolls', gameID, player, dice]
		$dbData = array(
			$data[3] => $data[3]+"+1",
			'last' => "NOW()"
			);

		$this->db->where('gameID',$data[1]);
		$this->db->where('player',$data[2]);
		$this->db->update($data[0],$dbData);
		$check = $this->db->affected_rows();

		if($check==0){
			$dbData = array(
				'gameID' => $data[1],
				'player' => $data[2],
				$data[3] => $data[3]+"+1",
				'first' => "NOW()",
				'last' => "NOW()"
				);
			$this->db->insert($data[0],$dbData);
		}
	}

	private function updateLanded($data){
		# $data = ['landed', gameID, player, field]
		$dbData = array(
			$data[3] => $data[3]+"+1",
			);

		$this->db->where('gameID',$data[1]);
		$this->db->where('player',$data[2]);
		$this->db->update($data[0],$dbData);
		$check = $this->db->affected_rows();

		if($check ==0){
			$dbData = array(
				'gameId' => $data[1],
				'player' => $data[2],
				$data[3] => $data[3]+"+1"
				);
			$this->db->insert($data[0],$dbData);
		}
	}

	private function updateActivated($data){
		# $data = ['activated', gameID, player, field]
		$dbData = array(
			$data[3] => $data[3]+"+1",
			);

		$this->db->where('gameID',$data[1]);
		$this->db->where('player',$data[2]);
		$this->db->update($data[0],$dbData);
		$check = $this->db->affected_rows();

		if($check ==0){
			$dbData = array(
				'gameId' => $data[1],
				'player' => $data[2],
				$data[3] => $data[3]+"+1"
				);
			$this->db->insert($data[0],$dbData);
		}
	}

	private function updateCoins($data){
		# $data = ['coins', gameID, player, gold, silver, whore]
		$dbData = array(
			'gold' => 'gold'+$data[3],
			'silver' => 'silver'+$data[4],
			'whore' => 'whore'+$data[5]
			);
		$this->db->where('gameID',$data[1]);
		$this->db->where('player',$data[2]);
		$this->db->update($data[0],$dbData);
		$check = $this->db->affected_rows();

		if($check==0){
			$dbData = array(
				'gameID' => $data[1],
				'player' => $data[2],
				'gold' => $data[3],
				'silver' => $data[4],
				'whore' => $data[5]
				);
			$this->db->insert($data[0],$dbData);
		}
	}

	private function updateSips($data){
		# $data = ['sips', gameID, player, taken, given]
		$dbData = array(
			'taken' => $data[3],
			'given' => $data[4]
			);
		$this->db->where('gameID',$data[1]);
		$this->db->where('player',$data[2]);
		$this->db->update($data[0],$dbData);
		$check = $this->db->affected_rows();

		if($check==0){
			$dbData = array(
				'gameID' => $data[1],
				'player' => $data[2],
				'taken' => $data[3],
				'given' => $data[4]
				);
			$this->db->insert($data[0],$dbData);
		}
	}
}