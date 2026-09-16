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

// Carrusel interactivo de certificaciones de aprocajer
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".carrusel-container");
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("dragging");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("dragging");
    });

    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("dragging");
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Velocidad de arrastre
        slider.scrollLeft = scrollLeft - walk;
    });
});
