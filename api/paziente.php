<?php
    $conn = new mysqli('localhost','root', '', 'id17412788_teleconsulto_db');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') { 
        if (isset($_GET['cognome'])) { 
            $data = array();
            $cognome = $conn->real_escape_string($_GET['cognome']);
            $sql = $conn->query("SELECT cognome, nome, data_nascita, codice_fiscale, gender FROM paziente WHERE cognome LIKE '%$cognome%' ORDER BY cognome");
            while ($d = $sql->fetch_assoc())
                $data[] = $d;
        } else if (isset($_GET['gender'])) {
            $data = array();
            $gender = $conn->real_escape_string($_GET['gender']);
            $sql = $conn->query("SELECT cognome, nome, data_nascita, codice_fiscale FROM paziente WHERE gender='$gender' ORDER BY cognome");
            while ($d = $sql->fetch_assoc())
                $data[] = $d;
        } else if (isset($_GET['codice_fiscale'])) {
            $data = array();
            $gender = $conn->real_escape_string($_GET['codice_fiscale']);
            $sql = $conn->query("SELECT cognome, nome, data_nascita, codice_fiscale, gender FROM paziente WHERE codice_fiscale='$codice_fiscale' ORDER BY cognome");
            while ($d = $sql->fetch_assoc())
                $data[] = $d;
        } else {
            $data = array();
            $sql = $conn->query("SELECT cognome, nome, data_nascita, codice_fiscale, gender FROM paziente ORDER BY cognome");
            while ($d = $sql->fetch_assoc())
                $data[] = $d;
        }
        
        if($data) {
            exit(json_encode($data));

        } else echo "Nessun risultato disponibile";

    } else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if (isset($_POST['cognome']) && isset($_POST['nome']) && isset($_POST['data_nascita']) && isset($_POST['codice_fiscale']) && isset($_POST['gender'])) {
            $cognome = $conn->real_escape_string($_POST['cognome']);
            $nome = $conn->real_escape_string($_POST['nome']);
            $data_nascita = $conn->real_escape_string($_POST['data_nascita']);
            $codice_fiscale = $conn->real_escape_string($_POST['codice_fiscale']);
            $gender = $conn->real_escape_string($_POST['gender']);

            $conn->query("INSERT INTO paziente (nome, cognome, codice_fiscale, gender, data_nascita) VALUES ('$nome', '$cognome', '$codice_fiscale', '$gender', '$data_nascita')");
            exit(json_encode(array("status" => 'success')));
        } else
            exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs')));

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

            if (isset($allPairs['gender'])) {
                $conn->query("UPDATE paziente SET gender='".$allPairs['gender']."' WHERE codice_fiscale='$codice_fiscale'");
            } else
                exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs in the Body')));

            exit(json_encode(array("status" => 'success')));
        } else
            exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs')));

    } else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
        if (!isset($_GET['codice_fiscale']))
            exit(json_encode(array("status" => 'failed', 'reason' => 'Check Your Inputs')));

        $codice_fiscale = $conn->real_escape_string($_GET['codice_fiscale']);
        $conn->query("DELETE FROM paziente WHERE codice_fiscale='$codice_fiscale'");
        exit(json_encode(array("status" => 'success')));
    }
?>