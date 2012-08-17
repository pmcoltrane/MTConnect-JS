<?php

if($_SERVER['REQUEST_METHOD']=='GET'){
	
	$url = urldecode($_SERVER['QUERY_STRING']);
	$contents = file_get_contents($url);
	
	if($contents===false){
		header('HTTP/1.1 500 Internal Server Error');
	}
	else{
	
		header('Access-Control-Allow-Origin:*');
		echo $contents;
	}
}
else{
	header('HTTP/1.1 405 Method Not Allowed');
}

?>