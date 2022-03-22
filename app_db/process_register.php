<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM medico WHERE email = '$postjson[email]'"));

    if ($checkemail) {
        $result = json_encode(array('success' => false, 'msg' => "Email già registrata"));
    } else {

        $password = md5($postjson['password']);

        $insert = mysqli_query($mysqli, "INSERT INTO medico SET
    codice_fiscale = '$postjson[codice_fiscale]',
    nome = '$postjson[nome]',
    cognome = '$postjson[cognome]',
    data_nascita = '$postjson[data_nascita]',
    professione = '$postjson[professione]',
    email = '$postjson[email]',
    gender = '$postjson[gender]',
    password = '$password'
    ");

        if ($insert) {
            $result = json_encode(array('success' => true, 'msg' => "Registrazione completata"));
        } else {
            $result = json_encode(array('success' => false, 'msg' => "Errore nella registrazione"));
        }
    }

    echo $result;