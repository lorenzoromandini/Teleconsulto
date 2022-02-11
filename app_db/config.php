<?php
define("DB_NAME", "id17412788_teleconsulto_db");
define("DB_USER", "id17412788_lorenzo_romandini");
define("DB_PASSWORD", "");
define("DB_HOST", "localhost");

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME); 

date_default_timezone_set("Europe/Rome"); 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token, Application");
header("Content-Type: application/json; charset=utf-8");
?>