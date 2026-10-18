document.addEventListener("DOMContentLoaded", () => {
    const formContacto = document.getElementById("form-contacto");
    const btnEnviar = document.getElementById("btn");
    const mensajeRespuesta = document.getElementById("mensaje-respuesta");

    // URL de tu Google Apps Script
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydgW1DoI84g1i01h_w3SmYkd6eD8188Htv07p8hUiLHkZVXB0w3PmEJoAAjYdKfQfD/exec";

    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();

            btnEnviar.textContent = "Enviando...";
            btnEnviar.disabled = true;

            const formData = new FormData(formContacto);
            const data = new URLSearchParams(formData);

            fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: data
            })
            .then(() => {
                mensajeRespuesta.style.color = "green";
                mensajeRespuesta.textContent = "¡Mensaje enviado con éxito!";
                formContacto.reset();
            })
            .catch((error) => {
                mensajeRespuesta.style.color = "red";
                mensajeRespuesta.textContent = "Ocurrió un error al enviar. Intenta nuevamente.";
                console.error("Error:", error);
            })
            .finally(() => {
                btnEnviar.textContent = "Enviar mensaje";
                btnEnviar.disabled = false;
            });
        });
    }
});
