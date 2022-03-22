<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$insert = mysqli_query($mysqli, "INSERT INTO messaggi SET
    id = '$postjson[id_messaggio]',
    id_medico = '$postjson[id_utente]',
    id_consulto = '$postjson[id_consulto]',
    testo = '$postjson[testo]',
    allegato = '$postjson[allegato]'
    ");

    if ($insert) {
        $result = json_encode(array('success' => true, 'msg' => "File caricato"));
    } else {
        $result = json_encode(array('success' => false, 'msg' => "Errore nel caricamento del file"));
    }

    echo $result;