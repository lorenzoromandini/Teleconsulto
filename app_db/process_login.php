<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$password = md5($postjson['password']);

    $logindata = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM medico WHERE email = '$postjson[email]' AND password = '$password' "));

    $data = array(
        'id' => $logindata['id'],
        'codice_fiscale' => $logindata['codice_fiscale'],
        'nome' => $logindata['nome'],
        'cognome' => $logindata['cognome'],
        'professione' => $logindata['professione'],
        'gender' => $logindata['gender'],
        'data_nascita' => $logindata['data_nascita'],
        'email' => $logindata['email'],
        'password' => $password
    );

    if ($logindata) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;