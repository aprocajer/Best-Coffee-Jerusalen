/**
 * qr-scanner.js - Gestión de la cámara y lectura de códigos QR
 * Requiere la librería HTML5-QRCode cargada en el HTML.
 */

let html5QrcodeScanner = null;

/**
 * Inicializa y enciende el escáner de cámara
 * @param {string} elementId - ID del contenedor HTML donde se mostrará la cámara
 */
function iniciarEscanerQR(elementId = 'lector-qr') {
    // Verificar si la librería externa está cargada en la página
    if (typeof Html5QrcodeScanner === 'undefined') {
        console.error('La librería Html5Qrcode no está cargada en el HTML.');
        return;
    }

    // Configuración del escáner (resolución y área de enfoque)
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        aspectRatio: 1.0
    };

    html5QrcodeScanner = new Html5QrcodeScanner(elementId, config, /* verbose= */ false);

    // Arrancar la cámara pasando el callback de éxito
    html5QrcodeScanner.render(alEscanearExitoso, alEscanearError);
}

/**
 * Función que se ejecuta cuando la cámara detecta y lee un QR
 * @param {string} textoDecodificado - El contenido o URL grabado en el QR
 */
function alEscanearExitoso(textoDecodificado) {
    console.log(`Código QR detectado: ${textoDecodificado}`);

    // Si el QR contiene una URL completa (ej: https://tumarca.com/index.html?codigo=LOTE-8492-AG)
    if (textoDecodificado.startsWith('http://') || textoDecodificado.startsWith('https://')) {
        window.location.href = textoDecodificado;
        return;
    }

    // Si el QR contiene solo el código del lote (ej: LOTE-8492-AG)
    const inputCodigo = document.getElementById('codigo-lote');
    const formTrazabilidad = document.getElementById('form-trazabilidad');

    if (inputCodigo && formTrazabilidad) {
        inputCodigo.value = textoDecodificado;

        // Ocultar o detener el escáner al encontrar resultado
        detenerEscanerQR();

        // Ejecutar la búsqueda en el JSON
        formTrazabilidad.dispatchEvent(new Event('submit'));
    }
}

/**
 * Callback para errores de lectura continuos (se ignora para no saturar la consola)
 */
function alEscanearError(errorMessage) {
    // Se deja vacío porque se ejecuta en cada fotograma que no detecta un QR
}

/**
 * Apaga la cámara y limpia el contenedor del escáner
 */
function detenerEscanerQR() {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.clear().catch(error => {
            console.error('Error al detener el escáner:', error);
        });
    }
}