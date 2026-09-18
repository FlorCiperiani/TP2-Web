const inicio = new Date();
const elemento = document.getElementById('contador');

function actualizarContador() {
    let diferencia = Date.now() - inicio.getTime();
    if (diferencia < 0) diferencia = 0;

    const dias = Math.floor(diferencia / 86400000);
    diferencia -= dias * 86400000;

    const horas = Math.floor(diferencia / 3600000);
    diferencia -= horas * 3600000;

    const minutos = Math.floor(diferencia / 60000);
    diferencia -= minutos * 60000;

    const segundos = Math.floor(diferencia / 1000);

    elemento.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}
const ahora = new Date();
function mostrarFechaHora() {

    const dia = ahora.getDate();
    const mes = ahora.getMonth() + 1;
    const anio = ahora.getFullYear();

    // Armamos el texto a mostrar, agregando ceros adelante si el número es menor a 10
    const fechaTexto = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
    
    // Insertamos el resultado en el párrafo con id "fechaHora"
    document.getElementById("fechaTexto").textContent = `Hoy es ${fechaTexto}`;
}
// Llamamos la función una vez al cargar, para que no tarde 1 segundo en aparecer
mostrarFechaHora();
// Y la repetimos cada 1000 milisegundos (1 segundo)
setInterval(mostrarFechaHora, 1000);
// padStart(2, '0')
// agrega un cero adelante si el número tiene un solo dígito(por ejemplo, convierte "5" en "05"), para que se vea prolijo.-- >
actualizarContador();
setInterval(actualizarContador, 1000);