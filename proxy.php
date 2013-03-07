<?php

if($_SERVER['REQUEST_METHOD']=='GET'){
	header('Content-Type: application/xml');
	header('Access-Control-Allow-Origin: *');

	$url = $_GET['url'];
	$handle = fopen($url, "r");

	if($handle){
		while(!feof($handle)){
			$buffer = fgets($handle, 4096);
			echo $buffer;
		}
		fclose($handle);
	}
	else{
		header('HTTP/1.1 500 Internal Server Error');
	}
}
else{
	header('HTTP/1.1 405 Method Not Allowed');
}