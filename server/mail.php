<?php

require_once 'mandrill-api-php/src/Mandrill.php';

class SendMail {

	function __construct(){
    }

    public static function sendMail($email,$to,$subject,$content){
		$mandrill = new Mandrill('BqCdfa7PNOzYJl9qiBT1iA');
		$message = new stdClass();
		$message->text = $content;
		$message->subject = $subject;
		$message->from_email = $email;
		$message->from_name  = "Your name";
		$message->to = $to;
		// $message->to = array(array("email" => ));
		/*$message->to = array(
							array(
								'email' => 'recipient.email@example.com',
		            			'name' => 'Recipient Name',
		            			'type' => 'to')
		            		);*/
		$message->track_opens = true;

		$response = $mandrill->messages->send($message);

		return print_r(json_encode($response));
	}
}
?>