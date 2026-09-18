
const form = document.getElementById('form-producto');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // evita el envío tradicional del form

    // Acá podrías leer los datos si quisieras hacer algo con ellos antes de redirigir
    // const datos = new FormData(form);

    window.location.href = 'confirmacion.html';
});

document.querySelectorAll('.campo').forEach(campo => {
    const input = campo.querySelector('input, textarea');
    const mensaje = campo.querySelector('.mensaje-campo');
    if (!input || !mensaje) return;

    input.addEventListener('input', () => {
        const completo = input.value.trim() !== '' && input.checkValidity();

        if (completo) {
            campo.classList.add('completo');
            mensaje.textContent = mensaje.dataset.textoOk;
        } else {
            campo.classList.remove('completo');
            mensaje.textContent = '';
        }
    });
});