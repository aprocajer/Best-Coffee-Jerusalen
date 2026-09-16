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
    const container = document.getElementById("carrusel-certificaciones");
    const track = document.getElementById("carrusel-track");

    if (!container || !track) return;

    // 1. Duplicar elementos para simular la cinta infinita
    const itemsOriginales = Array.from(track.children);
    for (let i = 0; i < 6; i++) {
        itemsOriginales.forEach(item => {
            track.appendChild(item.cloneNode(true));
        });
    }

    // Centrar la posición inicial del scroll
    let anchoUnidad = track.scrollWidth / 7;
    container.scrollLeft = anchoUnidad * 3;

    // 2. Desplazamiento Automático Continuo
    let autoScrollSpeed = 1; // Velocidad del movimiento (ajusta si quieres más rápido/lento)
    let isInteracting = false;

    function autoMove() {
        if (!isInteracting) {
            container.scrollLeft += autoScrollSpeed;
            verificarResetLoop();
        }
        requestAnimationFrame(autoMove);
    }
    requestAnimationFrame(autoMove);

    // 3. Reajuste Inaudible para evitar topes (Loop Infinito real)
    function verificarResetLoop() {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft <= 10) {
            container.scrollLeft = anchoUnidad * 3;
        } else if (container.scrollLeft >= maxScroll - 10) {
            container.scrollLeft = anchoUnidad * 3;
        }
    }

    // 4. Arrastre Manual (Ratón / Mouse)
    let isDown = false;
    let startX;
    let scrollLeftPos;

    container.addEventListener("mousedown", (e) => {
        isDown = true;
        isInteracting = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeftPos = container.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        if (isDown) {
            isDown = false;
            setTimeout(() => { isInteracting = false; }, 1000);
        }
    });

    container.addEventListener("mouseleave", () => {
        if (isDown) {
            isDown = false;
            isInteracting = false;
        }
    });

    container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeftPos - walk;
        verificarResetLoop();
    });

    // 5. Arrastre en Móviles (Táctil)
    container.addEventListener("touchstart", () => {
        isInteracting = true;
    }, { passive: true });

    container.addEventListener("touchend", () => {
        setTimeout(() => { isInteracting = false; }, 1500);
    }, { passive: true });

    container.addEventListener("scroll", () => {
        verificarResetLoop();
    }, { passive: true });
});
