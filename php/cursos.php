<?php
global $conexion;
require_once ('conexion.php');

// Agregar curso
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nomCurso = $_POST["nombreCurso"];
    $descripcion = $_POST["descripcionCurso"];
    $idDocente = $_POST["docenteCurso"];

    $sql = "INSERT INTO cursos (nombre, descripcion, docente_id) VALUES ('$nomCurso', '$descripcion', '$idDocente')";

    if ($conexion->query($sql) === TRUE) {
        echo "Curso agregado correctamente";
    } else {
        echo "Error al agregar el curso: " . $conexion->error;
    }

}

// Listar cursos
if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $qsl = "SELECT cursos.id, cursos.nombre, cursos.descripcion, docentes.nombre AS docente FROM cursos INNER JOIN docentes ON cursos.docente_id = docentes.id";
    $resultado = $conexion->query($qsl);
    $cursos = $resultado->fetch_all(MYSQLI_ASSOC);
    echo json_encode($cursos);
}

$conexion->close();