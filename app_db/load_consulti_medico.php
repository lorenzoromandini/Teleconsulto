<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$query = mysqli_query($mysqli, "SELECT DISTINCT consulto.id AS id_consulto, oggetto, data_inizio, paziente.nome AS paziente_nome, 
    paziente.cognome AS paziente_cognome, paziente.codice_fiscale AS paziente_cf, paziente.data_nascita AS paziente_data_nascita, 
    medico.nome AS richiedente_nome, medico.cognome AS richiedente_cognome FROM partecipanti p, partecipanti q, consulto, paziente, medico 
    WHERE p.id_medico = '$postjson[id_medico]' AND p.id_consulto = consulto.id AND consulto.paziente = paziente.id AND q.id_consulto = consulto.id 
    AND q.richiedente = true AND medico.id = q.id_medico ORDER BY paziente.cognome, paziente.nome, paziente.codice_fiscale;");

    while ($rows = mysqli_fetch_array($query)) {

        $data[] = array(
            'oggetto' => $rows['oggetto'],
            'data_inizio' => $rows['data_inizio'],
            'paziente_nome' => $rows['paziente_nome'],
            'paziente_cognome' => $rows['paziente_cognome'],
            'paziente_cf' => $rows['paziente_cf'],
            'paziente_data_nascita' => $rows['paziente_data_nascita'],
            'id_consulto' => $rows['id_consulto'],
            'richiedente_nome' => $rows['richiedente_nome'],
            'richiedente_cognome' => $rows['richiedente_cognome'],
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;