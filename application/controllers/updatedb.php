<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Updatedb extends CI_Controller {

	public function index()
	{
		$data = $this->input->post('data');
		$curDB = $this->db;
		if($data[0]=='debug'){
			$this->db_debug = $this->CI->load->database('debug',TRUE);
			$curDB = $this->db_debug;
		}

		switch($data[1]){
			case 'games':
				$this->insertGame($data);
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
	private function insertGame($data){
		# $data = ['games']
		$dbData = array(
			'ip' => $_SERVER['REMOTE_ADDR'],
			'browser' => 'prolly Chrome',
			'started' => 'NOW()'
			);
		$id = $curDB->insert($data[1],$dbData);
	}

	private function updateRolls($data){
		# $data = ['rolls', gameID, player, dice]
		$dbData = array(
			$data[4] => $data[4]+"+1",
			'last' => "NOW()"
			);

		$curDB->where('gameID',$data[2]);
		$curDB->where('player',$data[3]);
		$curDB->update($data[1],$dbData);
		$check = $curDB->affected_rows();

		if($check==0){
			$dbData = array(
				'gameID' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]+"+1",
				'first' => "NOW()",
				'last' => "NOW()"
				);
			$curDB->insert($data[1],$dbData);
		}
	}

	private function updateLanded($data){
		# $data = ['landed', gameID, player, field]
		$dbData = array(
			$data[4] => $data[4]+"+1",
			);

		$curDB->where('gameID',$data[2]);
		$curDB->where('player',$data[3]);
		$curDB->update($data[1],$dbData);
		$check = $curDB->affected_rows();

		if($check ==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]+"+1"
				);
			$curDB->insert($data[1],$dbData);
		}
	}

	private function updateActivated($data){
		# $data = ['activated', gameID, player, field]
		$dbData = array(
			$data[4] => $data[4]+"+1",
			);

		$curDB->where('gameID',$data[2]);
		$curDB->where('player',$data[3]);
		$curDB->update($data[1],$dbData);
		$check = $curDB->affected_rows();

		if($check ==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]+"+1"
				);
			$curDB->insert($data[1],$dbData);
		}
	}

	private function updateCoins($data){
		# $data = ['coins', gameID, player, gold, silver, whore]
		$dbData = array(
			'gold' => 'gold'+$data[4],
			'silver' => 'silver'+$data[5],
			'whore' => 'whore'+$data[6]
			);
		$curDB->where('gameID',$data[2]);
		$curDB->where('player',$data[3]);
		$curDB->update($data[1],$dbData);
		$check = $curDB->affected_rows();

		if($check==0){
			$dbData = array(
				'gameID' => $data[2],
				'player' => $data[3],
				'gold' => $data[4],
				'silver' => $data[5],
				'whore' => $data[6]
				);
			$curDB->insert($data[1],$dbData);
		}
	}

	private function updateSips($data){
		# $data = ['sips', gameID, player, taken, given]
		$dbData = array(
			'taken' => $data[4],
			'given' => $data[5]
			);
		$curDB->where('gameID',$data[2]);
		$curDB->where('player',$data[3]);
		$curDB->update($data[1],$dbData);
		$check = $curDB->affected_rows();

		if($check==0){
			$dbData = array(
				'gameID' => $data[2],
				'player' => $data[3],
				'taken' => $data[4],
				'given' => $data[5]
				);
			$curDB->insert($data[1],$dbData);
		}
	}
}