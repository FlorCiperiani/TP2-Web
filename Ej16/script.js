/* ---------------------------------------------------------
   VALIDACIÓN DE CUIT / CUIL - Algoritmo Módulo 11
   Tipos válidos:
     Personas físicas: 20, 23, 24, 27
     Empresas:         30, 33, 34
--------------------------------------------------------- */

const TIPOS_VALIDOS = ["20", "23", "24", "27", "30", "33", "34"];

// Multiplicadores aplicados de izquierda a derecha a los primeros 10 dígitos
// (equivale a aplicar la serie 2,3,4,5,6,7 de derecha a izquierda, reiniciando
// la serie cuando se llega a 7).
const MULTIPLICADORES = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

/**
 * Valida un CUIT/CUIL.
 * @param {string} valorIngresado - Número con o sin guiones. Ej: "20-12345678-6" o "20123456786"
 * @returns {{valido: boolean, mensaje: string, detalle: string}}
 */
function validarCuitCuil(valorIngresado) {
  let detalle = "";

  if (typeof valorIngresado !== "string" || valorIngresado.trim() === "") {
    return { valido: false, mensaje: "Debe ingresar un número.", detalle: "" };
  }

  // 1) Quitar guiones, puntos y espacios
  const limpio = valorIngresado.replace(/[-.\s]/g, "");

  // 2) Debe tener exactamente 11 dígitos numéricos
  if (!/^\d{11}$/.test(limpio)) {
    return {
      valido: false,
      mensaje: "El número debe tener 11 dígitos (tipo + número + dígito verificador).",
      detalle: ""
    };
  }

  // 3) Separar las tres partes: tipo (2), número (8), dígito verificador (1)
  const tipo = limpio.substring(0, 2);
  const numero = limpio.substring(2, 10);
  const digitoIngresado = parseInt(limpio.substring(10, 11), 10);

  detalle += `Número recibido: ${limpio}\n`;
  detalle += `Tipo: ${tipo} | Número: ${numero} | Dígito verificador ingresado: ${digitoIngresado}\n\n`;

  // 4) Validar que el tipo sea uno de los permitidos
  if (!TIPOS_VALIDOS.includes(tipo)) {
    return {
      valido: false,
      mensaje: `El tipo "${tipo}" no es válido. Debe ser 20, 23, 24, 27 (personas) o 30, 33, 34 (empresas).`,
      detalle
    };
  }

  // 5) Armar los 10 dígitos a utilizar en el cálculo (tipo + número)
  const diez = tipo + numero; // 10 caracteres
  const digitos = diez.split("").map(Number);

  // 6) Multiplicar cada dígito por su correspondiente multiplicador y sumar
  let sumaProductos = 0;
  detalle += "Cálculo del dígito verificador:\n";
  for (let i = 0; i < 10; i++) {
    const producto = digitos[i] * MULTIPLICADORES[i];
    sumaProductos += producto;
    detalle += `  ${digitos[i]} x ${MULTIPLICADORES[i]} = ${producto}\n`;
  }
  detalle += `Suma de productos = ${sumaProductos}\n`;

  // 7) Aplicar módulo 11
  const resto = sumaProductos % 11;
  detalle += `${sumaProductos} mod 11 = ${resto}\n`;

  // 8) Once menos el resto
  let onceMenos = 11 - resto;
  detalle += `11 - ${resto} = ${onceMenos}\n`;

  let digitoCalculado;
  if (onceMenos === 11) {
    digitoCalculado = 0;
  } else if (onceMenos === 10) {
    // Con este tipo no existe dígito verificador válido (habría que cambiar
    // el tipo a 23/33 y recalcular). Para esta validación simple, se informa error.
    return {
      valido: false,
      mensaje:
        "El resultado del cálculo da 10, lo cual no es válido para este tipo. " +
        "Debería probarse con tipo 23 o 33.",
      detalle
    };
  } else {
    digitoCalculado = onceMenos;
  }

  detalle += `Dígito verificador calculado: ${digitoCalculado}\n`;

  // 9) Comparar el dígito calculado con el ingresado
  const esValido = digitoCalculado === digitoIngresado;

  return {
    valido: esValido,
    mensaje: esValido
      ? `Verdadero: el CUIT/CUIL ${tipo}-${numero}-${digitoCalculado} es válido.`
      : `Falso: el dígito verificador debería ser ${digitoCalculado}, pero se ingresó ${digitoIngresado}.`,
    detalle
  };
}

/* ---------------------------------------------------------
   Conexión con la interfaz (HTML)
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("cuit");
  const boton = document.getElementById("btnValidar");
  const resultadoDiv = document.getElementById("resultado");
  const detalleCalculo = document.getElementById("detalleCalculo");

  function ejecutarValidacion() {
    const resultado = validarCuitCuil(input.value);

    resultadoDiv.textContent = resultado.mensaje;
    resultadoDiv.classList.remove("valido", "invalido");
    resultadoDiv.classList.add(resultado.valido ? "valido" : "invalido");

    detalleCalculo.textContent = resultado.detalle || "Sin datos suficientes para calcular.";
  }

  boton.addEventListener("click", ejecutarValidacion);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") ejecutarValidacion();
  });
});