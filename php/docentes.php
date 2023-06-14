<?php

global $conexion;

require_once('conexion.php');


// Agregar docentes
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST["nombre"];
    $especialidad = $_POST["especialidad"];
    $correo = $_POST["correo"];

    $sql = "INSERT INTO docentes (nombre, especialidad, correo) VALUES ('$nombre', '$especialidad', '$correo')";
    if ($conexion -> query($sql) === TRUE) {
        echo "Docente agregado correctamente";
    } else {
        echo "Error al agregar el docente".$conexion->error;
    }

}

// Listar docentes
if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $qsl = "SELECT * FROM docentes";
    $resultado = $conexion->query($qsl);
    $docentes = $resultado->fetch_all(MYSQLI_ASSOC);
    echo json_encode($docentes);
}

$conexion->close();