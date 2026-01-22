<?php
// Configuración de la base de datos
$servidor = "127.0.0.1";
$usuario = "root";
$password = "";
$basedatos = "digitalcx_db";

// Crear conexión
$conexion = new mysqli($servidor, $usuario, $password, $basedatos);

// Verificar conexión
if ($conexion->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Error de conexión: ' . $conexion->connect_error
    ]));
}

// Configurar charset
$conexion->set_charset("utf8");
?>
