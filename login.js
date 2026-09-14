document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.querySelector(".btn-login");
    const modalLogin = document.getElementById("modal-login");
    const cerrarLogin = document.getElementById("cerrar-login");
    const formLogin = document.getElementById("form-login");
    const btnSubmit = document.getElementById("btn-login-submit");
    const mensajeLogin = document.getElementById("mensaje-login");

    // URL de tu script de autenticación en Google Apps Script
    const AUTH_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxT0EyjrXmxxl0SLDli35zK4Gpy4vuGkG8C-c2uYCCebV5OvA3zlg00XBWL_d02P80P/exec";

    // 1. Verificar si ya hay una sesión activa al cargar la página
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario_aprocajer"));
    if (usuarioGuardado) {
        mostrarMenuUsuario(usuarioGuardado);
    }

    // 2. Abrir modal al hacer clic en "Iniciar Sesión"
    if (btnLogin && modalLogin) {
        btnLogin.addEventListener("click", (e) => {
            e.preventDefault();
            modalLogin.style.display = "flex";
        });
    }

    // 3. Cerrar modal al hacer clic en la X
    if (cerrarLogin) {
        cerrarLogin.addEventListener("click", () => {
            modalLogin.style.display = "none";
            mensajeLogin.textContent = "";
        });
    }

    // 4. Cerrar modal si se hace clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target === modalLogin) {
            modalLogin.style.display = "none";
            mensajeLogin.textContent = "";
        }
    });

    // 5. Procesar Inicio de Sesión
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

                    // Guardar sesión en el navegador
                    localStorage.setItem("usuario_aprocajer", JSON.stringify(data));

                    // Actualizar el menú de navegación con el perfil del usuario
                    mostrarMenuUsuario(data);

                    // Ocultar modal y redirigir
                    setTimeout(() => {
                        modalLogin.style.display = "none";
                        formLogin.reset();
                        btnSubmit.textContent = "Ingresar";
                        btnSubmit.disabled = false;

                        // REDIRIGIR AL PORTAL EXCLUSIVO (Ajusta la ruta si es necesario)
                        window.location.href = "portal.html";
                    }, 1000);

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

    // 6. Manejo de Cierre de Sesión (Logout)
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "btn-logout") {
            localStorage.removeItem("usuario_aprocajer");
            window.location.href = "index.html"; // Redirigir al inicio o recargar
        }
    });
});

// Función para reemplazar el botón de login por la información del usuario
function mostrarMenuUsuario(usuario) {
    const btnLogin = document.querySelector(".btn-login");
    if (btnLogin) btnLogin.style.display = "none";

    const contenedorMenu = document.querySelector(".nav-links");
    if (contenedorMenu && !document.getElementById("btn-logout")) {
        contenedorMenu.insertAdjacentHTML("beforeend", `
            <div class="user-profile-menu">
                <span>Bienvenido, <strong>${usuario.nombre}</strong></span>
                <a href="portal.html" class="btn-portal">Ir a mi Portal</a>
                <button id="btn-logout" class="btn-logout">Cerrar Sesión</button>
            </div>
        `);
    }
}
