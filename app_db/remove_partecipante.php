<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$query = mysqli_query($mysqli, "DELETE FROM partecipanti WHERE partecipanti.id_medico = '$postjson[id_partecipante]' 
    AND partecipanti.id_consulto = '$postjson[id_consulto]' ");

    if ($query) {
        $result = json_encode(array('success' => true));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;