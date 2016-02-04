<?php

class DataController {

	public static function getData(){
		$string = file_get_contents("../../server/data.json");
		return $string;
	}

}
?>