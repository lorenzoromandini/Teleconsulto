<?php
    $conn = new mysqli('localhost','root', '', 'id17412788_teleconsulto_db');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        if (isset($_GET['cognome'])) { 
            $data = array(); 
            $cognome = $conn->real_escape_string($_GET['cognome']);
            $sql = $conn->query("SELECT cognome, nome, professione, data_nascita, codice_fiscale, gender, email FROM medico WHERE cognome LIKE '%$cognome%' ORDER BY cognome");
            while ($d = $sql->fetch_assoc())
                $data[] = $d;
        } else if (isset($_GET['professione'])) {
            $data = array();
            $professione = $conn->real_escape_string($_GET['professione']);
            $sql = $conn->query("SELECT cognome, nome, professione, data_nascita, codice_fiscale, gender, email FROM medico WHERE cognome LIKE '%$professione%' ORDER BY cognome");
            while ($d = $sql->fetch_assoc())
                $data[] = $d;
        } else {
            $data = array();
            $sql = $conn->query("SELECT cognome, nome, professione, data_nascita, codice_fiscale, gender, email FROM medico ORDER BY cognome");
            while ($d = $sql->fetch_assoc())
                $data[] = $d;
        }
        exit(json_encode($data));

    } else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        if (!isset($_GET['codice_fiscale']))
            exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs in the URL')));

        $codice_fiscale = $conn->real_escape_string($_GET['codice_fiscale']);
        $data = urldecode(file_get_contents('php://input'));

        if (strpos($data, '=') !== false) {
            $allPairs = array();
            $data = explode('&', $data);
            foreach($data as $pair) {
                $pair = explode('=', $pair);
                $allPairs[$pair[0]] = $pair[1];
            }

            if (isset($allPairs['gender']) && isset($allPairs['professione'])) {
                $conn->query("UPDATE medico SET gender='".$allPairs['gender']."', professione='".$allPairs['professione']."' WHERE codice_fiscale='$codice_fiscale'");
            } else if (isset($allPairs['gender'])) {
                $conn->query("UPDATE medico SET gender='".$allPairs['gender']."' WHERE codice_fiscale='$codice_fiscale'");
            } else if (isset($allPairs['professione'])) {
                $conn->query("UPDATE medico SET professione='".$allPairs['professione']."' WHERE codice_fiscale='$codice_fiscale'");
            } else
                exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs in the Body')));

            exit(json_encode(array("status" => 'success')));
        } else
            exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs')));

    } else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if (!isset($_GET['codice_fiscale']))
            exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs')));

        $codice_fiscale = $conn->real_escape_string($_GET['codice_fiscale']);
        $conn->query("DELETE FROM medico WHERE codice_fiscale='$codice_fiscale'");
        exit(json_encode(array("status" => 'success')));
    }
?>