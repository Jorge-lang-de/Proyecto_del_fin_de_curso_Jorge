<?php
// 1. Forzar que se vean errores si existen
ini_set('display_errors', 1);
error_reporting(E_ALL);


// 2. Incluir conexión
include 'conexion.php'; 

if (!isset($conexion)) {
    die("ERROR: No se pudo incluir el archivo de conexión o la variable \$conexion no existe.");
}

// 3. Consulta
$sql = "SELECT * FROM favoritos";
$resultado = mysqli_query($conexion, $sql);

if (!$resultado) {
    die("ERROR SQL: " . mysqli_error($conexion));
}

// 4. Contar filas
$filas = mysqli_num_rows($resultado);
echo "Conexión exitosa. Se encontraron " . $filas . " resultados en la tabla favoritos.<br>";

// 5. Mostrar datos
if ($filas > 0) {
    echo "<pre>"; // Etiqueta para que se vea ordenado
    while ($row = mysqli_fetch_assoc($resultado)) {
        print_r($row); // Imprime el array para ver qué hay dentro
    }
} else {
    echo "La tabla está vacía.";
}

// Silenciamos cualquier error de PHP que pueda imprimir texto
ini_set('display_errors', 0);
header('Content-Type: application/json');
//  Guardamos a favoritos
include 'conexion.php';
// Verificar que la conexión se estableció correctamente
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    // Usamos prepared statements para evitar inyecciones SQL y asegurarnos de que los datos se insertan correctamente
    $stmt = $conexion->prepare("INSERT INTO favoritos (id, titulo, precio, ubicacion, img, hab, banos, metros) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    // Asumimos que los datos vienen en el orden correcto
    $stmt->bind_param("isssssss",
        $data['id'],
        $data['titulo'],
        $data['precio'],
        $data['ubicacion'],
        $data['img'],
        $data['hab'],
        $data['banos'],
        $data['metros']
    );
    // Ejecutamos la consulta y verificamos si fue exitosa
    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conexion->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No se recibieron datos"]);
}
exit; // Terminamos el script aquí

?>