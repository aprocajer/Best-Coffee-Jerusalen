/**
 * main.js - Lógica global y automatizaciones del sitio
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Detectar si la URL incluye un código de lote vía QR (ej: ?codigo=LOTE-8492-AG)
    procesarCodigoURL();

    // 2. Resaltar enlace activo en la barra de navegación
    marcarEnlaceActivo();
});

/**
 * Lee la URL del navegador para ver si el usuario llegó escaneando un QR
 * con parámetros de consulta.
 */
function procesarCodigoURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const codigoURL = urlParams.get('codigo');

    if (codigoURL) {
        const inputCodigo = document.getElementById('codigo-lote');
        const formTrazabilidad = document.getElementById('form-trazabilidad');

        if (inputCodigo && formTrazabilidad) {
            // Escribe el código en el campo de texto
            inputCodigo.value = codigoURL;

            // Dispara automáticamente la consulta de trazabilidad
            formTrazabilidad.dispatchEvent(new Event('submit'));
        }
    }
}

/**
 * Detecta qué página está abierta y le agrega la clase 'active' al enlace correspondiente
 */
function marcarEnlaceActivo() {
    const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
    const enlacesNav = document.querySelectorAll('.nav-links a');

    enlacesNav.forEach(enlace => {
        const href = enlace.getAttribute('href');
        if (href === paginaActual) {
            enlace.classList.add('active');
        } else if (paginaActual === '' && href === 'index.html') {
            enlace.classList.add('active');
        }
    });
}