<?php

include ($_SERVER['DOCUMENT_ROOT'].'/vendor/mandrill/mandrill/src/Mandrill.php');

class DataController {
	
	function __construct(){
    }

    public static function sendMail($data,$to){
    	try {
			$mandrill = new Mandrill('BqCdfa7PNOzYJl9qiBT1iA');
			$message = array(
				'text' => $data->message,
				'subject' => $data->subject,
				'from_email' => $data->email,
				'from_name'  => "John Doe",
				'to' => array(
					array('email' => $to->email,'name' => $to->name)
			    ),
				'track_opens' => true
			);
			$response = $mandrill->messages->send($message);

			return print_r(json_encode($response));
			// return print_r(json_encode(array('$data'=>$data,'$to'=>$to)));
		} catch(Mandrill_Error $e) {
		//     // Mandrill errors are thrown as exceptions
		    return print_r('A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage());
		//     // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		     throw $e;
		}
	}

	public static function getData(){
		$string = file_get_contents(__DIR__.'/data.json');
		return print $string;
	}

}
?>