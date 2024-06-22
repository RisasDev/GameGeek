function validarRut(rutCompleto) {
  let rut = rutCompleto.split("-")[0];
  let dv = rutCompleto.split("-")[1];
  let rutString = String(rut);
  let suma = 0;
  let multiplo = 2;
  let dvCalculado = 0;

  for (let i = rutString.length - 1; i >= 0; i--) {
    suma += parseInt(rutString[i]) * multiplo;
    multiplo++;

    if (multiplo > 7) {
      multiplo = 2;
    }
  }

  dvCalculado = 11 - (suma % 11);

  if (dvCalculado == 11) {
    dvCalculado = 0;
  } else if (dvCalculado == 10) {
    dvCalculado = "K";
  }
  return dv == dvCalculado;
}

function validarPassword(password) {
  let hasLength = password.length >= 12;
  let hasMayuscula = /[A-Z]/.test(password);
  let hasNumero = /[0-9]/.test(password);
  let hasSimbolo = /[!@#-_\$%\^&\*]/.test(password);

  return hasLength && hasMayuscula && hasNumero && hasSimbolo;
}
