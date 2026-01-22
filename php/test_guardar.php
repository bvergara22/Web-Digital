<?php
// Archivo de prueba para verificar que guardar_sitio_web.php funciona

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Test Guardar Sitio Web</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; }
        input, select, textarea { width: 100%; padding: 8px; margin: 5px 0 15px 0; box-sizing: border-box; }
        button { background: #6200ea; color: white; padding: 10px 20px; border: none; cursor: pointer; }
        .result { margin-top: 20px; padding: 15px; border-radius: 5px; }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <h1>Test de Formulario - Guardar Sitio Web</h1>
    
    <form id="testForm">
        <label>Nombre:</label>
        <input type="text" name="nombre" value="Juan Perez" required>
        
        <label>Empresa:</label>
        <input type="text" name="empresa" value="Mi Empresa" required>
        
        <label>Email:</label>
        <input type="email" name="email" value="juan@test.com" required>
        
        <label>Telefono:</label>
        <input type="text" name="telefono" value="1234567890" required>
        
        <label>Empleados:</label>
        <select name="empleados">
            <option value="">Seleccionar</option>
            <option value="1-5" selected>1-5 empleados</option>
            <option value="6-20">6-20 empleados</option>
        </select>
        
        <label>Sector:</label>
        <select name="sector">
            <option value="">Seleccionar</option>
            <option value="Tecnología" selected>Tecnología</option>
            <option value="Salud">Salud</option>
        </select>
        
        <label>Mensaje:</label>
        <textarea name="mensaje">Mensaje de prueba</textarea>
        
        <button type="submit">Enviar Prueba</button>
    </form>
    
    <div id="result"></div>
    
    <script>
        document.getElementById('testForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<p>Enviando...</p>';
            
            const formData = new FormData(this);
            
            // Mostrar datos que se envían
            console.log('Datos enviados:');
            for (let [key, value] of formData.entries()) {
                console.log(key + ': ' + value);
            }
            
            try {
                const response = await fetch('guardar_sitio_web.php', {
                    method: 'POST',
                    body: formData
                });
                
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);
                
                const text = await response.text();
                console.log('Response text:', text);
                
                let result;
                try {
                    result = JSON.parse(text);
                } catch (parseError) {
                    resultDiv.innerHTML = `
                        <div class="result error">
                            <h3>Error al parsear respuesta JSON</h3>
                            <p><strong>Respuesta del servidor:</strong></p>
                            <pre>${text}</pre>
                            <p>Esto indica un error PHP. Revisa los logs de Apache.</p>
                        </div>
                    `;
                    return;
                }
                
                if (result.success) {
                    resultDiv.innerHTML = `
                        <div class="result success">
                            <h3>EXITO!</h3>
                            <p>${result.message}</p>
                            <p>Los datos se guardaron correctamente en la base de datos.</p>
                        </div>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <div class="result error">
                            <h3>Error del servidor</h3>
                            <p>${result.message}</p>
                        </div>
                    `;
                }
                
            } catch (error) {
                console.error('Fetch error:', error);
                resultDiv.innerHTML = `
                    <div class="result error">
                        <h3>Error de conexion</h3>
                        <p>${error.message}</p>
                        <p>Verifica que el archivo guardar_sitio_web.php existe en la carpeta php/</p>
                    </div>
                `;
            }
        });
    </script>
</body>
</html>
