<?php

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname = "ss11_php";

$conexion = new mysqli($servername, $username, $password, $dbname);

if ($conexion -> connect_error) {
    die("Error de conexión a la bd: ").$conexion -> connect_error;
}

//echo "Conexión exitosa!";