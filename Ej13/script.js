
const visor = document.getElementById('visor');

const historial = document.getElementById('historial');

const musicaEspecial = document.getElementById('musicaEspecial');
const contenedorEfectos = document.getElementById('contenedorEfectos');

let calculoFinalizado = false;



// BOTONES NUMÉRICOS


document.querySelectorAll('.numero').forEach(function (boton) {

    boton.addEventListener('click', function () {

        if (calculoFinalizado) {

            visor.textContent = '';

            historial.textContent = '';

            calculoFinalizado = false;

        }

        visor.textContent += boton.textContent;
        quitarEfectoEspecial();

    });

});

// BOTONES DE OPERACIÓN

document.querySelectorAll('.operacion').forEach(function (boton) {

    boton.addEventListener('click', function () {

        quitarEfectoEspecial();
        const operacion = boton.textContent;
        

        // BOTÓN ±

        if (operacion === '±') {

            const expresion = visor.textContent;

            const ultimoMas = expresion.lastIndexOf('+');
            const ultimoMenos = expresion.lastIndexOf('-');
            const ultimoMultiplicacion = expresion.lastIndexOf('x');
            const ultimoDivision = expresion.lastIndexOf('÷');

            const ultimoOperador = Math.max(
                ultimoMas,
                ultimoMenos,
                ultimoMultiplicacion,
                ultimoDivision
            );

            const inicioNumero = ultimoOperador + 1;

            const numeroActual = expresion.substring(inicioNumero);

            if (numeroActual !== '') {

                if (numeroActual.startsWith('-')) {

                    visor.textContent =
                        expresion.substring(0, inicioNumero) +
                        numeroActual.substring(1);

                } else {

                    visor.textContent =
                        expresion.substring(0, inicioNumero) +
                        '-' +
                        numeroActual;

                }

            }

            return;
        }

        // BOTÓN %

        if (operacion === '%') {

            const expresion = visor.textContent;

            const ultimoMas = expresion.lastIndexOf('+');
            const ultimoMenos = expresion.lastIndexOf('-');
            const ultimoMultiplicacion = expresion.lastIndexOf('x');
            const ultimoDivision = expresion.lastIndexOf('÷');

            const ultimoOperador = Math.max(
                ultimoMas,
                ultimoMenos,
                ultimoMultiplicacion,
                ultimoDivision
            );

            const inicioNumero = ultimoOperador + 1;

            const numeroActual = expresion.substring(inicioNumero);

            if (numeroActual !== '') {

                const porcentaje = Number(numeroActual) / 100;

                visor.textContent =
                    expresion.substring(0, inicioNumero) +
                    porcentaje;

            }

            return;
        }

        // OPERACIONES + - x ÷

        if (calculoFinalizado) {

            historial.textContent = visor.textContent + operacion;

            visor.textContent = '';

            calculoFinalizado = false;

        } else {

            visor.textContent += operacion;

        }

        

    });

});


// BOTÓN C

document.querySelectorAll('#borrar-calculos').forEach(function (boton) {

    boton.addEventListener('click', function () {
        quitarEfectoEspecial();

        visor.textContent = '';

        historial.textContent = '';

        calculoFinalizado = false;

    });

});

// BOTÓN CE

document.querySelectorAll('#borrar-entrada').forEach(function (boton) {

    boton.addEventListener('click', function () {

        let expresion = visor.textContent.trim();

        // Si acabamos de calcular un resultado

        if (calculoFinalizado) {

            visor.textContent = '';

            historial.textContent = '';

            calculoFinalizado = false;
            quitarEfectoEspecial();

            return;

        }

        // Si no hay nada para borrar

        if (expresion === '') {

            return;

        }

        const ultimoCaracter = expresion.charAt(expresion.length - 1);

        const esNumero = !isNaN(ultimoCaracter) || ultimoCaracter === '.';


        if (esNumero) {

            // Buscamos el último operador
            const ultimoMas = expresion.lastIndexOf('+');
            const ultimoMenos = expresion.lastIndexOf('-');
            const ultimoMultiplicacion = expresion.lastIndexOf('x');
            const ultimoDivision = expresion.lastIndexOf('÷');

            const ultimoOperador = Math.max(
                ultimoMas,
                ultimoMenos,
                ultimoMultiplicacion,
                ultimoDivision
            );


            // Si existe un operador, dejamos todo hasta ese operador
            if (ultimoOperador !== -1) {

                visor.textContent =
                    expresion.substring(0, ultimoOperador + 1).trim();

            } else {

                // Si no hay operador, borramos el número completo
                visor.textContent = '';

            }

        }

        // Si ya no queda un número y termina en un operador, CE borra el operador

        else {

            visor.textContent =
                expresion.substring(0, expresion.length - 1).trim();

        }

    });

});

// BOTÓN =

document.querySelectorAll('.igual').forEach(function (boton) {

    boton.addEventListener('click', function () {

        try {

            const expresionCompleta = (
                historial.textContent + visor.textContent
            )
                .replaceAll('÷', '/')
                .replaceAll('x', '*');


            const resultado = eval(expresionCompleta);


            // El resultado queda en el visor principal
            visor.textContent = resultado;

            // El historial desaparece
            historial.textContent = '';

            // Indicamos que acabamos de calcular
            calculoFinalizado = true;

            activarEfectoEspecial();

        } catch (error) {

            visor.textContent = 'Error';

            historial.textContent = '';

            calculoFinalizado = true;

        }

    });

});

// EFECTO VISUAL DE LOS BOTONES

document.querySelectorAll('.box').forEach(function (boton) {

    boton.addEventListener('click', function () {

        boton.classList.add('numero-press');

        setTimeout(function () {

            boton.classList.remove('numero-press');

        }, 150);

    });

});

const imagenesEfecto = [
    'recursos/gift-funciones.gif',
    'recursos/gift-que-paso-ayer.gif',
    'recursos/gift-gato.gif',
    'recursos/imagen-einstein.jpg',
    'recursos/imagen-homero.avif',
    'recursos/imagen-gallo-claudio.jpg'
    
];

function activarEfectoEspecial(){
    document.body.classList.add('modo-ecuaciones');
    contenedorEfectos.innerHTML = '';

    // Separamos las imágenes en dos grupos: izquierda y derecha
    const mitad = Math.ceil(imagenesEfecto.length / 2);
    const grupoIzquierda = imagenesEfecto.slice(0, mitad);
    const grupoDerecha = imagenesEfecto.slice(mitad);

    function ubicarGrupo(grupo, esIzquierda){
        const cantidad = grupo.length;
        if (cantidad === 0) return;

        // Margen vertical de seguridad arriba y abajo
        const margenSuperior = 10; // antes empezaba en 5vh
        const margenInferior = 15; // antes llegaba hasta 80vh
        const alturaDisponible = 100 - margenSuperior - margenInferior;
        const alturaCasillero = alturaDisponible / cantidad;

        grupo.forEach(function (src, i) {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'imagen-flotante';

            // Posición horizontal con margen de seguridad respecto al borde
            const distanciaAlBorde = Math.random() * 8 + 4; // entre 4vw y 12vw del borde

            if (esIzquierda) {
                img.style.left = distanciaAlBorde + 'vw';
            } else {
                img.style.right = distanciaAlBorde + 'vw';
            }

            // Posición vertical: casillero exclusivo + margen interno
            const topBase = margenSuperior + (i * alturaCasillero);
            const margenInterno = alturaCasillero * 0.15;
            const top = topBase + margenInterno + Math.random() * (alturaCasillero - margenInterno * 2);

            img.style.top = top + 'vh';
            img.style.animationDelay = (i * 0.1) + 's';

            contenedorEfectos.appendChild(img);
        });
    }

    ubicarGrupo(grupoIzquierda, true);
    ubicarGrupo(grupoDerecha, false);

    musicaEspecial.currentTime = 0;
    musicaEspecial.play().catch(function(err){
        console.log('No se pudo reproducir el audio:', err);
    });
}

function quitarEfectoEspecial(){
    document.body.classList.remove('modo-ecuaciones');
    contenedorEfectos.innerHTML = '';
    musicaEspecial.pause();
    musicaEspecial.currentTime = 0;
}