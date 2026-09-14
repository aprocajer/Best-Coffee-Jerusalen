document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.querySelector(".btn-login");
    const modalLogin = document.getElementById("modal-login");
    const cerrarLogin = document.getElementById("cerrar-login");
    const formLogin = document.getElementById("form-login");
    const btnSubmit = document.getElementById("btn-login-submit");
    const mensajeLogin = document.getElementById("mensaje-login");

    // URL de tu script de autenticación (lo configuraremos en el backend)
    const AUTH_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxT0EyjrXmxxl0SLDli35zK4Gpy4vuGkG8C-c2uYCCebV5OvA3zlg00XBWL_d02P80P/exec";

    // Abrir modal
    if (btnLogin && modalLogin) {
        btnLogin.addEventListener("click", (e) => {
            e.preventDefault();
            modalLogin.style.display = "flex";
        });
    }

    // Cerrar modal al hacer clic en la X
    if (cerrarLogin) {
        cerrarLogin.addEventListener("click", () => {
            modalLogin.style.display = "none";
            mensajeLogin.textContent = "";
        });
    }

    // Cerrar modal si hace clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target === modalLogin) {
            modalLogin.style.display = "none";
            mensajeLogin.textContent = "";
        }
    });

    // Procesar Inicio de Sesión
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            btnSubmit.textContent = "Verificando...";
            btnSubmit.disabled = true;
            mensajeLogin.textContent = "";

            const formData = new FormData(formLogin);

            fetch(AUTH_SCRIPT_URL, {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    mensajeLogin.style.color = "green";
                    mensajeLogin.textContent = `¡Bienvenido, ${data.nombre}!`;
                    
                    // Guardar sesión en el navegador (localStorage)
                    localStorage.setItem("usuario_aprocajer", JSON.stringify(data));

                    setTimeout(() => {
                        modalLogin.style.display = "none";
                        formLogin.reset();
                        btnSubmit.textContent = "Ingresar";
                        btnSubmit.disabled = false;
                        
                        // Redirigir o actualizar interfaz
                        alert(`Sesión iniciada con exito como ${data.nombre}`);
                    }, 1200);
                } else {
                    mensajeLogin.style.color = "red";
                    mensajeLogin.textContent = data.message || "Credenciales incorrectas.";
                    btnSubmit.textContent = "Ingresar";
                    btnSubmit.disabled = false;
                }
            })
            .catch(err => {
                console.error("Error al autenticar:", err);
                mensajeLogin.style.color = "red";
                mensajeLogin.textContent = "Error al conectar con el servidor.";
                btnSubmit.textContent = "Ingresar";
                btnSubmit.disabled = false;
            });
        });
    }
});

// Dentro de la respuesta exitosa del login:
if (data.status === "success") {
    // 1. Ocultar el botón de login
    document.querySelector('.btn-login').style.display = 'none';
    
    // 2. Mostrar un saludo o botón de perfil
    const contenedorMenu = document.querySelector('.nav-links'); // O el selector de tu menú
    contenedorMenu.insertAdjacentHTML('beforeend', `
        <div class="user-profile-menu">
            <span>Bienvenido, <strong>${data.nombre}</strong></span>
            <a href="portal.html" class="btn-portal">Ir a mi Portal</a>
            <button id="btn-logout" class="btn-logout">Cerrar Sesión</button>
        </div>
    `);
}

//dirigir a pag exclusiva
setTimeout(() => {
    window.location.href = "portal.html";
}, 1000);

//cerrar sesion
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'btn-logout') {
        localStorage.removeItem('usuario_aprocajer');
        window.location.reload(); // Recargar la página
    }
});
