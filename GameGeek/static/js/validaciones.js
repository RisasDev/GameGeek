function validarNombre(nombre) {
  return nombre.length <= 40 && nombre.length != "";
}

function validarApellido(apellido) {
  return apellido.length <= 40 && apellido.length != "";
}

function validarTelefono(telefono) {
  return telefono.length === 9;
}

function validarEmail(email) {
  let partes = email.split("@");
  if (partes.length !== 2) return false;

  let usuario = partes[0];
  const usuarioRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+/;
  if (!usuarioRegex.test(usuario)) return false;

  let dominioSplit = partes[1].split(".");

  let dominio = dominioSplit[0];
  let dominioEnd = dominioSplit[1];

  return dominioEnd != null && dominio.length !== 0 && dominioEnd.length !== 0;
}

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

function validarDestinatario(destinatario) {
  return destinatario.length <= 40 && destinatario.length != "";
}

function validarNumeroCalle(nro) {
  return nro.length != "";
}

function validarDepto(depto) {
  return depto.length <= 40 && depto.length != "";
}

function validarCalle(calleValor) {
  if (calleValor === "") return false;

  const regex = /[^A-Za-z0-9-\s]/g;
  return !regex.test(calleValor);
}

function validarPassword(password) {
  let hasLength = password.length >= 12;
  let hasMayuscula = /[A-Z]/.test(password);
  let hasNumero = /[0-9]/.test(password);
  let hasSimbolo = /[!@#-_\$%\^&\*]/.test(password);

  return hasLength && hasMayuscula && hasNumero && hasSimbolo;
}

function validarConfirmarPassword(password, confirmPassword) {
  return confirmPassword !== "" && password === confirmPassword;
}

function validarPasswordLista(password) {
  let hasMayuscula = /[A-Z]/.test(password);
  let hasNumero = /[0-9]/.test(password);
  let hasSimbolo = /[!@#-_\$%\^&\*]/.test(password);

  const lista = [];

  if (password.length < 12) lista.push(PASSWORD_ERROR.CARACTER_MINIMO);
  if (!hasMayuscula) lista.push(PASSWORD_ERROR.MAYUSCULA);
  if (!hasNumero) lista.push(PASSWORD_ERROR.NUMERO);
  if (!hasSimbolo) lista.push(PASSWORD_ERROR.CARACTER_ESPECIAL);

  return lista;
}

const PASSWORD_ERROR = {
  CARACTER_MINIMO: "La contraseña debe tener minimo 12 caracteres",
  CARACTER_ESPECIAL: "La contraseña debe tener al menos un caracter especial",
  MAYUSCULA: "La contraseña debe tener al menos una mayúscula",
  NUMERO: "La contraseña debe tener al menos un número",
};
