<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$insert = mysqli_query($mysqli, "INSERT INTO consulto SET
    id = '$postjson[id_consulto]',
    oggetto = '$postjson[oggetto]',
    paziente = '$postjson[paziente]'
    ");

    if ($insert) {
        $result = json_encode(array('success' => true));
    } else {
        $result = json_encode(array('success' => false, 'msg' => "Errore nell'inserimento di un nuovo consulto"));
    }

    echo $result;