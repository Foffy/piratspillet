<?php
	// create the view
	if($header == "default"){
		$this->load->view('includes/header');
	}else{
		$this->load->view($header);
	}
	$this->load->view($main_content);
	$this->load->view('includes/footer');
?>