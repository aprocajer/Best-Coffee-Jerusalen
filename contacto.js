document.addEventListener("DOMContentLoaded", () => {
    const formContacto = document.getElementById("form-contacto");
    const btnEnviar = document.getElementById("btn-enviar");
    const mensajeRespuesta = document.getElementById("mensaje-respuesta");

    // REEMPLAZA ESTA URL CON LA QUE TE DIO GOOGLE APPS SCRIPT
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzIn9KHvh5TRZvrS177Vuwdgg6eF3graWffL4qVRw4tF9GErcjtofXdCSAQ3T8F5g05/exec";

    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();

            btnEnviar.textContent = "Enviando...";
            btnEnviar.disabled = true;

            const formData = new FormData(formContacto);

            fetch(SCRIPT_URL, {
                method: "POST",
                body: formData
            })
            .then(response => {
                mensajeRespuesta.style.color = "green";
                mensajeRespuesta.textContent = "¡Mensaje enviado con éxito!";
                formContacto.reset();
            })
            .catch(error => {
                mensajeRespuesta.style.color = "red";
                mensajeRespuesta.textContent = "Ocurrió un error al enviar. Intenta nuevamente.";
                console.error("Error:", error);
            })
            .finally(() => {
                btnEnviar.textContent = "Enviar";
                btnEnviar.disabled = false;
            });
        });
    }
});