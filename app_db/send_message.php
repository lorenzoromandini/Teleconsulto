<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$insert = mysqli_query($mysqli, "INSERT INTO messaggi SET
    id = '$postjson[id_messaggio]',
    id_medico = '$postjson[id_utente]',
    id_consulto = '$postjson[id_consulto]',
    testo = '$postjson[testo]'
    ");

    if ($insert) {
        $result = json_encode(array('success' => true));
    } else {
        $result = json_encode(array('success' => false, 'msg' => "Errore nell'invio del messaggio"));
    }

    echo $result;