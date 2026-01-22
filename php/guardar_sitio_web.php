<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'conexion.php';

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Obtener y limpiar datos
    $nombre = trim($_POST['nombre'] ?? '');
    $empresa = trim($_POST['empresa'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $empleados = trim($_POST['empleados'] ?? '');
    $sector = trim($_POST['sector'] ?? '');
    $mensaje = trim($_POST['mensaje'] ?? '');
    
    // Validaciones de campos obligatorios
    if (empty($nombre) || empty($empresa) || empty($email) || empty($telefono)) {
        $response['success'] = false;
        $response['message'] = 'Los campos nombre, empresa, email y teléfono son obligatorios';
        echo json_encode($response);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['success'] = false;
        $response['message'] = 'El correo electrónico no es válido';
        echo json_encode($response);
        exit;
    }
    
    // Preparar consulta
    $stmt = $conexion->prepare("INSERT INTO sitio_web (nombre, empresa, email, telefono, empleados, sector, mensaje) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $nombre, $empresa, $email, $telefono, $empleados, $sector, $mensaje);
    
    // Ejecutar
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = '¡Gracias! Hemos recibido tu solicitud. Te contactaremos pronto.';
    } else {
        $response['success'] = false;
        $response['message'] = 'Error al guardar los datos. Intenta de nuevo.';
    }
    
    $stmt->close();
    
} else {
    $response['success'] = false;
    $response['message'] = 'Método no permitido';
}

$conexion->close();
echo json_encode($response);
?>
