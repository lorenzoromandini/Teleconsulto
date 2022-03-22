<?php

require "config.php";

$postjson = json_decode(file_get_contents('php://input'), true);

$query = mysqli_query($mysqli, "DELETE FROM messaggi WHERE messaggi.id = '$postjson[message_id]' ");

    if ($query) {
        $result = json_encode(array('success' => true));
    } else {
        $result = json_encode(array('success' => false));
    }

    echo $result;