<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$query = mysqli_query($mysqli, "SELECT id, cognome, nome, codice_fiscale, professione FROM medico WHERE cognome LIKE '%$postjson[medico_cognome]%' 
    AND nome LIKE '%$postjson[medico_nome]%' AND professione LIKE '%$postjson[medico_professione]%' ORDER BY cognome, nome");

    while ($rows = mysqli_fetch_array($query)) {

        $data[] = array(
            'id' => $rows['id'],
            'cognome' => $rows['cognome'],
            'nome' => $rows['nome'],
            'codice_fiscale' => $rows['codice_fiscale'],
            'professione' => $rows['professione'],
            'boolPartecipante' => false
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;