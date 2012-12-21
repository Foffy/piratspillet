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
				echo $id;
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

	private function updateDatabase($data, $dbData){
		$this->db->where('gameId',$data[2]);
		$this->db->where('player',$data[3]);
		$this->db->update($data[1],$dbData);
		$check = mysqli_affected_rows();
		return $check;
	}

	private function insertGame($data){
		# $data = [debug, 'games']
		$dbData = array(
			'ip' => $_SERVER['REMOTE_ADDR'],
			'browser' => 'TODO',
			'started' => 'NOW()'
			);
		$this->db->insert($data[1],$dbData);
		$id = $this->db->insert_id();
		return $id;
	}

	private function updateRolls($data){
		# $data = [debug, 'rolls', gameID, player, dice]

		date_default_timezone_set('Europe/Belgrade');
		$date = new DateTime();

		$dbData = array(
			$data[4] => $data[4]+"+1",
			'last' => echo $dateTime->format("Y-m-d H:i:s")
			);

		$check = $this->updateDatabase($data, $dbData);

		if($check==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]+"+1",
				'first' => echo $dateTime->format("Y-m-d H:i:s"),
				'last' => echo $$dateTime->format("Y-m-d H:i:s")
				);
			$this->db->insert($data[1],$dbData);

		}
	}

	private function updateLanded($data){
		# $data = [debug, 'landed', gameID, player, field]
		$dbData = array(
			$data[4] => $data[4]+"+1",
			);

		$check = $this->updateDatabase($data,$dbData);

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

		$check = $this->updateDatabase($data,$dbData);

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
			'taken' => 'taken +'+$data[4],
			'given' => 'given +'+$data[5]
			);

		$check = $this->updateDatabase($data,$dbData);

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