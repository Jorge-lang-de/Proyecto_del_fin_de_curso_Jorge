<?php
$host = "127.0.0.1:3306";
$user = "root";
$pass = ""; // <--- AQUÍ ES DONDE SE CAMBIA. Asegúrate de que no haya ni un espacio.
$db   = "inmoluxury";

$conexion = new mysqli($host, $user, $pass, $db);

// Si esto falla, el "Fatal Error" te lo dirá aquí
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>