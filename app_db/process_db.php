<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

if ($postjson['request'] == "process_register") { 
 
    $checkemail = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM medico WHERE email = '$postjson[email]'"));

    if ($checkemail) {
        $result = json_encode(array('success' => false, 'msg' => "Email già registrata"));
    } else {

        $password = md5($postjson['password']);

        $insert = mysqli_query($mysqli, "INSERT INTO medico SET
    codice_fiscale = '$postjson[codice_fiscale]',
    nome = '$postjson[nome]',
    cognome = '$postjson[cognome]',
    data_nascita = '$postjson[data_nascita]',
    professione = '$postjson[professione]',
    email = '$postjson[email]',
    gender = '$postjson[gender]',
    password = '$password'
    ");

        if ($insert) {
            $result = json_encode(array('success' => true, 'msg' => "Registrazione completata"));
        } else {
            $result = json_encode(array('success' => false, 'msg' => "Errore nella registrazione"));
        }
    }

    echo $result;
} elseif ($postjson['request'] == "process_login") {

    $password = md5($postjson['password']);

    $logindata = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM medico WHERE email = '$postjson[email]' AND password = '$password' "));

    $data = array(
        'id' => $logindata['id'],
        'codice_fiscale' => $logindata['codice_fiscale'],
        'nome' => $logindata['nome'],
        'cognome' => $logindata['cognome'],
        'professione' => $logindata['professione'],
        'gender' => $logindata['gender'],
        'data_nascita' => $logindata['data_nascita'],
        'email' => $logindata['email'],
        'password' => $password
    );

    if ($logindata) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;
} elseif ($postjson['request'] == "load_consulti_medico") {

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
} elseif ($postjson['request'] == "load_partecipanti") {

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

} elseif ($postjson['request'] == "update_password") {
   
    $password = md5($postjson['nuova_password']);

    $update = mysqli_query($mysqli, "UPDATE medico SET password = '$password' WHERE id = '$postjson[id]' ");

        if ($update) {
            $result = json_encode(array('success' => true, 'msg' => "Password modificata correttamente"));
        } else {
            $result = json_encode(array('success' => false, 'msg' => "Errore"));
        }

    echo $result;
    
} elseif ($postjson['request'] == "search_partecipants") {

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
} elseif ($postjson['request'] == "search_paziente") {

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

}  elseif ($postjson['request'] == "nuovo_consulto") {

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

} elseif ($postjson['request'] == "nuovo_consultoPartecipante") {

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

}

elseif ($postjson['request'] == "add_partecipante") {

    $insert = mysqli_query($mysqli, "INSERT INTO partecipanti SET
    id_medico = '$postjson[id_partecipante]',
    id_consulto = '$postjson[id_consulto]',
    richiedente = '$postjson[richiedente]'
    ");

    if ($insert) {
        $result = json_encode(array('success' => true, 'msg' => "Medico aggiunto"));
    } else {
        $result = json_encode(array('success' => false, 'msg' => "Errore nell'inserimento di un nuovo partecipante"));
    }

    echo $result;

} elseif ($postjson['request'] == "remove_partecipante") {

    $query = mysqli_query($mysqli, "DELETE FROM partecipanti WHERE partecipanti.id_medico = '$postjson[id_partecipante]' 
    AND partecipanti.id_consulto = '$postjson[id_consulto]' ");

    if ($query) {
        $result = json_encode(array('success' => true));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;

} elseif ($postjson['request'] == "load_messages") {

    $query = mysqli_query($mysqli, "SELECT messaggi.id AS id_messaggio, medico.id AS mittente_id, medico.nome AS mittente_nome, 
    medico.cognome AS mittente_cognome, testo, data_ora 
    FROM messaggi, medico WHERE id_consulto = '$postjson[id_consulto]' AND medico.id = messaggi.id_medico ORDER BY data_ora");

    while ($rows = mysqli_fetch_array($query)) {

        $data[] = array(
            'id_messaggio' => $rows['id_messaggio'],
            'mittente_id' => $rows['mittente_id'],
            'mittente_nome' => $rows['mittente_nome'],
            'mittente_cognome' => $rows['mittente_cognome'],
            'testo' => $rows['testo'],
            'data_ora' => $rows['data_ora'],
        );
    }

    if ($query) {
        $result = json_encode(array('success' => true, 'result' => $data));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;
} elseif ($postjson['request'] == "send_message") {

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
} elseif ($postjson['request'] == "delete_message") {

    $query = mysqli_query($mysqli, "DELETE FROM messaggi WHERE messaggi.id = '$postjson[message_id]' ");

    if ($query) {
        $result = json_encode(array('success' => true));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;

} elseif ($postjson['request'] == "load_allegati") {

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

} elseif ($postjson['request'] == "send_allegato") {

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
}