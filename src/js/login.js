document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos
    const botonesLogin = document.querySelectorAll(".btn-login");
    const modalLogin = document.getElementById("modal-login");
    const cerrarLogin = document.getElementById("cerrar-login");
    const formLogin = document.getElementById("form-login");
    const btnSubmit = document.getElementById("btn-login-submit");
    const mensajeLogin = document.getElementById("mensaje-login");
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    // URL de tu script de autenticación en Google Apps Script
    const AUTH_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxT0EyjrXmxxl0SLDli35zK4Gpy4vuGkG8C-c2uYCCebV5OvA3zlg00XBWL_d02P80P/exec";

    // 1. Control del menú hamburguesa en móviles
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("nav-menu_visible");
        });
    }

    // 2. Verificar si ya hay una sesión activa al cargar la página
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario_aprocajer"));
    if (usuarioGuardado) {
        mostrarMenuUsuario(usuarioGuardado);
    }

    // 3. Abrir modal al hacer clic en CUALQUIER botón de "Iniciar Sesión" (móvil y PC)
    if (botonesLogin.length > 0 && modalLogin) {
        botonesLogin.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                modalLogin.style.display = "flex";

                // Si el menú móvil está abierto, lo cierra para ver el modal limpiamente
                if (navLinks && navLinks.classList.contains("nav-menu_visible")) {
                    navLinks.classList.remove("nav-menu_visible");
                }
            });
        });
    }

    // 4. Cerrar modal al hacer clic en la X
    if (cerrarLogin) {
        cerrarLogin.addEventListener("click", () => {
            modalLogin.style.display = "none";
            if (mensajeLogin) mensajeLogin.textContent = "";
        });
    }

    // 5. Cerrar modal si se hace clic fuera del contenido
    window.addEventListener("click", (e) => {
        if (e.target === modalLogin) {
            modalLogin.style.display = "none";
            if (mensajeLogin) mensajeLogin.textContent = "";
        }
    });

    // 6. Procesar Inicio de Sesión
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            if (btnSubmit) {
                btnSubmit.textContent = "Verificando...";
                btnSubmit.disabled = true;
            }
            if (mensajeLogin) mensajeLogin.textContent = "";

            const formData = new FormData(formLogin);

            fetch(AUTH_SCRIPT_URL, {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    if (mensajeLogin) {
                        mensajeLogin.style.color = "green";
                        mensajeLogin.textContent = `¡Bienvenido, ${data.nombre}!`;
                    }

                    // Guardar sesión en el navegador
                    localStorage.setItem("usuario_aprocajer", JSON.stringify(data));

                    // Actualizar menú
                    mostrarMenuUsuario(data);

                    // Ocultar modal y redirigir al portal
                    setTimeout(() => {
                        if (modalLogin) modalLogin.style.display = "none";
                        formLogin.reset();
                        if (btnSubmit) {
                            btnSubmit.textContent = "Ingresar";
                            btnSubmit.disabled = false;
                        }
                        window.location.href = "portal.html";
                    }, 1000);

                } else {
                    if (mensajeLogin) {
                        mensajeLogin.style.color = "red";
                        mensajeLogin.textContent = data.message || "Credenciales incorrectas.";
                    }
                    if (btnSubmit) {
                        btnSubmit.textContent = "Ingresar";
                        btnSubmit.disabled = false;
                    }
                }
            })
            .catch(err => {
                console.error("Error al autenticar:", err);
                if (mensajeLogin) {
                    mensajeLogin.style.color = "red";
                    mensajeLogin.textContent = "Error al conectar con el servidor.";
                }
                if (btnSubmit) {
                    btnSubmit.textContent = "Ingresar";
                    btnSubmit.disabled = false;
                }
            });
        });
    }

    // 7. Manejo de Cierre de Sesión (Logout)
    document.addEventListener("click", (e) => {
        if (e.target && e.target.id === "btn-logout") {
            localStorage.removeItem("usuario_aprocajer");
            window.location.href = "index.html";
        }
    });
});

// Función para reemplazar los botones de login por la info del usuario
function mostrarMenuUsuario(usuario) {
    const botonesLogin = document.querySelectorAll(".btn-login");
    botonesLogin.forEach(btn => btn.style.display = "none");

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
