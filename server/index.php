<?php
	include(__DIR__.'/cors.php');
	include(__DIR__.'/data.php');
	include( __DIR__.'/mail.php');

	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

	switch ($method) {
	  case 'POST':
	    
	    break;
	  case 'GET':
	  	if(isset($request) && !empty($request) && $request[0] !== ''){
	  		$id = $request[0];
	  		
	  	}else{
	  		
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