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

	private function updateRolls($data){
		# $data = [debug, 'rolls', gameID, player, dice]

		date_default_timezone_set('CET');
		$date = new DateTime();

		$dbData = array(
			$data[4] => $data[4]." + 1",
			'last' => $date->format("Y-m-d H:i:s")
			);

		$check = $this->updateDatabase($data, $dbData);

		if($check==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]." + 1",
				'first' => $date->format("Y-m-d H:i:s"),
				'last' => $date->format("Y-m-d H:i:s")
				);
			$this->db->insert($data[1],$dbData);

		}
	}

	private function updateLanded($data){
		# $data = [debug, 'landed', gameID, player, field]
		$dbData = array(
			$data[4] => $data[4]." + 1",
			);

		$check = $this->updateDatabase($data,$dbData);

		if($check ==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]." + 1"
				);

			$this->db->insert($data[1],$dbData);

		}
	}

	private function updateActivated($data){
		# $data = [debug, 'activated', gameID, player, field]
		$dbData = array(
			$data[4] => $data[4]." + 1",
			);

		$check = $this->updateDatabase($data,$dbData);

		if($check ==0){
			$dbData = array(
				'gameId' => $data[2],
				'player' => $data[3],
				$data[4] => $data[4]." + 1"
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

	function getBrowser() 
	{ 
	    $u_agent = $_SERVER['HTTP_USER_AGENT']; 
	    $bname = 'Unknown';
	    $platform = 'Unknown';
	    $version= "";

	    //First get the platform?
	    if (preg_match('/linux/i', $u_agent)) {
	        $platform = 'linux';
	    }
	    elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
	        $platform = 'mac';
	    }
	    elseif (preg_match('/windows|win32/i', $u_agent)) {
	        $platform = 'windows';
	    }
	    
	    // Next get the name of the useragent yes seperately and for good reason
	    if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)) 
	    { 
	        $bname = 'Internet Explorer'; 
	        $ub = "MSIE"; 
	    } 
	    elseif(preg_match('/Firefox/i',$u_agent)) 
	    { 
	        $bname = 'Mozilla Firefox'; 
	        $ub = "Firefox"; 
	    } 
	    elseif(preg_match('/Chrome/i',$u_agent)) 
	    { 
	        $bname = 'Google Chrome'; 
	        $ub = "Chrome"; 
	    } 
	    elseif(preg_match('/Safari/i',$u_agent)) 
	    { 
	        $bname = 'Apple Safari'; 
	        $ub = "Safari"; 
	    } 
	    elseif(preg_match('/Opera/i',$u_agent)) 
	    { 
	        $bname = 'Opera'; 
	        $ub = "Opera"; 
	    } 
	    elseif(preg_match('/Netscape/i',$u_agent)) 
	    { 
	        $bname = 'Netscape'; 
	        $ub = "Netscape"; 
	    } 
	    
	    // finally get the correct version number
	    $known = array('Version', $ub, 'other');
	    $pattern = '#(?<browser>' . join('|', $known) .
	    ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
	    if (!preg_match_all($pattern, $u_agent, $matches)) {
	        // we have no matching number just continue
	    }
	    
	    // see how many we have
	    $i = count($matches['browser']);
	    if ($i != 1) {
	        //we will have two since we are not using 'other' argument yet
	        //see if version is before or after the name
	        if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
	            $version= $matches['version'][0];
	        }
	        else {
	            $version= $matches['version'][1];
	        }
	    }
	    else {
	        $version= $matches['version'][0];
	    }
	    
	    // check if we have a number
	    if ($version==null || $version=="") {$version="?";}
	    
	    return array(
	        'userAgent' => $u_agent,
	        'name'      => $bname,
	        'version'   => $version,
	        'platform'  => $platform,
	        'pattern'    => $pattern
	    );
	} 

}