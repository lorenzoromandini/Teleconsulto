<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$insert = mysqli_query($mysqli, "INSERT INTO partecipanti SET
    id_medico = '$postjson[id_medico]',
    id_consulto = '$postjson[id_consulto]',
    richiedente = '$postjson[richiedente]'
    ");

    if ($insert) {
        $result = json_encode(array('success' => true, 'msg' => "Nuovo consulto inserito"));
    } else {
        $result = json_encode(array('success' => false, 'msg' => "Errore nell'inserimento del richiedente"));
    }

    echo $result;