<?php
header('Content-Type: text/html; charset=utf-8');

echo "<h1>Test de Conexion a Base de Datos</h1>";

// Configuración
$servidor = "127.0.0.1";
$usuario = "root";
$password = "";
$basedatos = "digitalcx_db";

echo "<p><strong>Servidor:</strong> $servidor</p>";
echo "<p><strong>Usuario:</strong> $usuario</p>";
echo "<p><strong>Base de datos:</strong> $basedatos</p>";
echo "<hr>";

// Intentar conexión
$conexion = new mysqli($servidor, $usuario, $password, $basedatos);

if ($conexion->connect_error) {
    echo "<p style='color: red;'><strong>ERROR DE CONEXION:</strong> " . $conexion->connect_error . "</p>";
} else {
    echo "<p style='color: green;'><strong>CONEXION EXITOSA!</strong></p>";
    
    // Verificar si existe la tabla sitio_web
    $result = $conexion->query("SHOW TABLES LIKE 'sitio_web'");
    
    if ($result->num_rows > 0) {
        echo "<p style='color: green;'><strong>Tabla 'sitio_web' EXISTE</strong></p>";
        
        // Mostrar estructura de la tabla
        echo "<h3>Estructura de la tabla:</h3>";
        $columns = $conexion->query("DESCRIBE sitio_web");
        echo "<table border='1' cellpadding='5'>";
        echo "<tr><th>Campo</th><th>Tipo</th><th>Null</th><th>Key</th></tr>";
        while ($col = $columns->fetch_assoc()) {
            echo "<tr><td>{$col['Field']}</td><td>{$col['Type']}</td><td>{$col['Null']}</td><td>{$col['Key']}</td></tr>";
        }
        echo "</table>";
    } else {
        echo "<p style='color: red;'><strong>Tabla 'sitio_web' NO EXISTE</strong></p>";
        echo "<p>Debes ejecutar el siguiente SQL en DataGrip:</p>";
        echo "<pre style='background: #f4f4f4; padding: 10px;'>";
        echo "USE digitalcx_db;

CREATE TABLE sitio_web (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    empresa VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    empleados VARCHAR(50),
    sector VARCHAR(100),
    mensaje TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";
        echo "</pre>";
    }
    
    $conexion->close();
}
?>
</content>
</invoke>
