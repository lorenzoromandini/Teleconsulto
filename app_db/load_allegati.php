<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$query = mysqli_query($mysqli, "SELECT messaggi.id AS id_messaggio, medico.id AS mittente_id, medico.nome AS mittente_nome, 
    medico.cognome AS mittente_cognome, testo, data_ora, allegato
    FROM messaggi, medico WHERE id_consulto = '$postjson[id_consulto]' AND medico.id = messaggi.id_medico 
    AND allegato IS NOT NULL ORDER BY data_ora DESC");

    while ($rows = mysqli_fetch_array($query)) {

        $data[] = array(
            'id_messaggio' => $rows['id_messaggio'],
            'mittente_id' => $rows['mittente_id'],
            'mittente_nome' => $rows['mittente_nome'],
            'mittente_cognome' => $rows['mittente_cognome'],
            'testo' => $rows['testo'],
            'allegato' => $rows['allegato'],
            'data_ora' => $rows['data_ora'],
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;