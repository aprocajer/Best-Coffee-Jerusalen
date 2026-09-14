document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menuLinks = document.getElementById("menu-links");

    if (menuToggle && menuLinks) {
        // Al hacer clic en el botón de tres líneas (≡)
        menuToggle.addEventListener("click", () => {
            menuLinks.classList.toggle("active");
        });

        // Ocultar el menú automáticamente al hacer clic en un enlace
        const links = menuLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                menuLinks.classList.remove("active");
            });
        });
    }
});


//Para el login
document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.querySelector(".btn-login");
    const modalLogin = document.getElementById("modal-login");
    const cerrarLogin = document.getElementById("cerrar-login");

    // Abrir modal
    if (btnLogin && modalLogin) {
        btnLogin.addEventListener("click", () => {
            modalLogin.style.display = "flex";
        });
    }

    // Cerrar modal al hacer clic en la X
    if (cerrarLogin) {
        cerrarLogin.addEventListener("click", () => {
            modalLogin.style.display = "none";
        });
    }

    // Cerrar modal al hacer clic fuera del cuadro
    window.addEventListener("click", (e) => {
        if (e.target === modalLogin) {
            modalLogin.style.display = "none";
        }
    });
});
