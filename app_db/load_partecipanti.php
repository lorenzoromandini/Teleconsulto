<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$query = mysqli_query($mysqli, "SELECT medico.id AS medico_id, medico.cognome AS medico_cognome, medico.nome AS medico_nome, 
    partecipanti.richiedente AS richiedente 
    FROM consulto, medico, partecipanti WHERE consulto.id = '$postjson[id_consulto]' AND consulto.id = partecipanti.id_consulto 
    AND partecipanti.id_medico = medico.id ORDER BY medico_cognome ");

    while ($rows = mysqli_fetch_array($query)) {

        $data[] = array(
            'medico_id' => $rows['medico_id'],
            'medico_cognome' => $rows['medico_cognome'],
            'medico_nome' => $rows['medico_nome'],
            'richiedente' => $rows['richiedente'],
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;