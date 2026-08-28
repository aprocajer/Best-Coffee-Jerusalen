document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const menuLinks = document.getElementById("menu-links");

    if (menuToggle && menuLinks) {
        // Alternar el menú desplegable al hacer clic en el botón
        menuToggle.addEventListener("click", () => {
            menuLinks.classList.toggle("active");
        });

        // Cerrar el menú automáticamente al hacer clic en cualquier enlace
        const links = menuLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                menuLinks.classList.remove("active");
            });
        });
    }
});
