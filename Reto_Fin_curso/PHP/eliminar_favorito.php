<?php
include 'conexion.php';
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    $id = $data['id'];
    
    // Usamos una sentencia preparada para evitar inyección SQL
    $stmt = $conexion->prepare("DELETE FROM favoritos WHERE casa_id = ?");
    $stmt->bind_param("s", $id); // "s" significa que el ID es un string
    $stmt->execute();
    
    echo json_encode(["status" => "deleted"]);
}
?>