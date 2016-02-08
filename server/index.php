<?php
	include(__DIR__.'/cors.php');
	include(__DIR__.'/data.php');

	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

	switch ($method) {
	  case 'POST':
	  		$data=file_get_contents('php://input');
	  		$res = json_decode($data);
	    	DataController::sendMail($res,$res->sendTo);
	    break;
	  case 'GET':
	  	if(isset($request) && !empty($request) && $request[0] !== ''){
	  		$id = $request[0];
	  		
	  	}else{
	  		DataController::getData();
	  	}
	    break;
	  case 'DELETE':
	  	if(isset($request) && !empty($request)){
	  		$id = $request[0];
	  		
	  	}else{
	  		
	  	}	   
	    break;
	  default:
	    print json_encode('developed by: Philip Cesar B. Garay');
	    break;
	}
	exit();
	
?>