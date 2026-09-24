// Pop-up de la calculadora
(function () {
    var popup = document.getElementById('popup-calculadora');
    var cerrar = document.getElementById('popup-cerrar');
    if (!popup || !cerrar) return;

    var ultimoFoco = null;
    //nuevo
    function abrir() {
        ultimoFoco = document.activeElement;
        popup.hidden = false;
        document.body.style.overflow = 'hidden';
        // Un frame después, para que la transición de entrada se vea
        requestAnimationFrame(function () {
            popup.classList.add('visible');
        });
        cerrar.focus();
    }
    //nuevo
    function cerrarPopup() {
        popup.classList.remove('visible');
        document.body.style.overflow = '';
        setTimeout(function () {
            popup.hidden = true;
            if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
        }, 300);
    }

    cerrar.addEventListener('click', cerrarPopup);

    // Click en el fondo oscuro (fuera de la tarjeta)
    popup.addEventListener('click', function (e) {
        if (e.target === popup) cerrarPopup();
    });

    // Tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !popup.hidden) cerrarPopup();
    });

    // Aparece un poquito después de cargar la página
    window.addEventListener('load', function () {
        setTimeout(abrir, 3000);
    });
})();