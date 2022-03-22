<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$query = mysqli_query($mysqli, "SELECT id, cognome, nome, codice_fiscale, data_nascita FROM paziente 
    WHERE cognome LIKE '%$postjson[paziente_cognome]%' AND nome LIKE '%$postjson[paziente_nome]%' 
    AND codice_fiscale LIKE '%$postjson[paziente_cf]%'  ORDER BY cognome, nome");

    while ($rows = mysqli_fetch_array($query)) {

        $data[] = array(
            'id' => $rows['id'],
            'cognome' => $rows['cognome'],
            'nome' => $rows['nome'],
            'codice_fiscale' => $rows['codice_fiscale'],
            'data_nascita' => $rows['data_nascita'],
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;