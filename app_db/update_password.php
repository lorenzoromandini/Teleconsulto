<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$password = md5($postjson['nuova_password']);

    $update = mysqli_query($mysqli, "UPDATE medico SET password = '$password' WHERE id = '$postjson[id]' ");

        if ($update) {
            $result = json_encode(array('success' => true, 'msg' => "Password modificata correttamente"));
        } else {
            $result = json_encode(array('success' => false, 'msg' => "Errore"));
        }

    echo $result;