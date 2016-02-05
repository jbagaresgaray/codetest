<?php

include ($_SERVER['DOCUMENT_ROOT'].'/vendor/mandrill/mandrill/src/Mandrill.php');

class DataController {
	
	function __construct(){
    }

    public static function sendMail($data,$to){
		$mandrill = new Mandrill('BqCdfa7PNOzYJl9qiBT1iA');
		$message = new stdClass();
		$message->text = $data->message;
		$message->subject = $data->subject;
		$message->from_email = $data->email;
		$message->from_name  = "Your name";
		// $message->to = array($to);
		// $message->to = array(array("email" => ));
		$message->to = array(array(
									'email' => $to->email,
			            			'name' => $to->name,
			            			'type' => 'to'
		            			)
		            		);
		$message->track_opens = true;

		$response = $mandrill->messages->send($data->message);

		return print_r(json_encode($response));
		// return print_r(json_encode(array('$data'=>$data,'$to'=>$to)));
	}

	public static function getData(){
		$string = file_get_contents(__DIR__.'/data.json');
		return print $string;
	}

}
?>