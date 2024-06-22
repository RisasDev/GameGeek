$(document).ready(function () {
  const validacionesTitular = {
    rut: false,
    nombre: false,
    apellido: false,
    telefono: false,
    email: false,
    password: false,
    confirmPassword: false,
    check: false,
  };

  const rut = $("#rut");
  const rutfeedback = $("#rut-feedback");
  const nombre = $("#nombre");
  const nombreFeedback = $("#nombre-feedback");
  const apellido = $("#apellido");
  const apellidoFeedback = $("#apellido-feedback");
  const telefono = $("#telefono");
  const telefonoFeedback = $("#telefono-feedback");
  const email = $("#email");
  const emailFeedback = $("#email-feedback");
  const password = $("#password");
  const confirmPassword = $("#confirm-password");
  const confirmPasswordFeedback = $("#confirm-password-feedback");
  const passwordFeedback1 = $("#password-feedback-1");
  const passwordFeedback2 = $("#password-feedback-2");
  const passwordFeedback3 = $("#password-feedback-3");
  const passwordFeedback4 = $("#password-feedback-4");
  const calle = $("#direccion");
  const calleFeedback = $("#direccion-feedback");
  const dest = $("#dest");
  const destFeedback = $("#dest-feedback");
  const nro = $("#nro");
  const nroFeedback = $("#nro-feedback");
  const depto = $("#depto");
  const deptoFeedback = $("#depto-feedback");
  const check = $("#check");
  const boton = $("#btn-register");
  const formRegister = $("#form-register");
  const toastRegister = $("#toast-register");
  const toastNoRegister = $("#toast-no-register");
  const buttonTogglePassword = $("#toggle-password");
  const buttonToggleConfirmPassword = $("#toggle-confirm-password");
  let regions = [];

  // Toggle Password //
  buttonTogglePassword.on("click", function () {
    const passwordType = password.attr("type");
    const icon = buttonTogglePassword.find("i");

    if (passwordType === "password") {
      password.attr("type", "text");
      icon.removeClass("bi bi-eye").addClass("bi bi-eye-slash");
    } 
    else {
      password.attr("type", "password");
      icon.removeClass("bi bi-eye-slash").addClass("bi bi-eye");
    }
  });

  // Toggle Confirm Password //
  buttonToggleConfirmPassword.on("click", function () {
    const confirmPasswordType = confirmPassword.attr("type");
    const icon = buttonToggleConfirmPassword.find("i");

    if (confirmPasswordType === "password") {
      confirmPassword.attr("type", "text");
      icon.removeClass("bi bi-eye").addClass("bi bi-eye-slash");
    } 
    else {
      confirmPassword.attr("type", "password");
      icon.removeClass("bi bi-eye-slash").addClass("bi bi-eye");
    }
  });

  // Validar Rut //
  rut.on("focusout", function () {
    let rutval = $(this).val();

    if (rutval === "") {
      rut
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      rutfeedback
        .html("El rut debe ser: 12345678-K")
        .addClass("d-block text-danger");
    }
  });

  rut.on("keyup", function () {
    let rutval = $(this).val();
    let valido = validarRut(rutval);

    validacionesTitular.rut = valido;
    validarDatos(validacionesTitular, boton);

    if (valido) {
      rut
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      rutfeedback.removeClass("d-block text-danger");
      rutfeedback.html("Rut válido").addClass("d-block text-success");
    } else {
      rut
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      rutfeedback
        .html("El rut debe ser: 12345678-K")
        .addClass("d-block text-danger");
    }
  });

  // Validar Nombre //
  nombre.on("focusout", function () {
    let nombreVal = $(this).val();

    if (nombreVal === "") {
      nombre
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      nombreFeedback
        .html("Ingrese un nombre válido")
        .addClass("d-block text-danger");
    }
  });

  nombre.on("keyup", function () {
    let nombreVal = $(this).val();
    let valido = validarNombre(nombreVal);

    validacionesTitular.nombre = valido;
    validarDatos(validacionesTitular, boton);

    if (valido) {
      nombre
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      nombreFeedback.removeClass("d-block text-danger");
      nombreFeedback.html("Nombre válido").addClass("d-block text-success");
    } else {
      nombre
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      nombreFeedback
        .html("Ingrese un nombre válido")
        .addClass("d-block text-danger");
    }
  });

  // Validar Apellido //
  apellido.on("focusout", function () {
    let apellidoVal = $(this).val();

    if (apellidoVal === "") {
      apellido
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      apellidoFeedback
        .html("Ingrese un apellido válido")
        .addClass("d-block text-danger");
    }
  });

  apellido.on("keyup", function () {
    let apellidoVal = $(this).val();
    let valid = validarApellido(apellidoVal);

    validacionesTitular.apellido = valid;
    validarDatos(validacionesTitular, boton);

    if (valid) {
      apellido
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      apellidoFeedback.removeClass("d-block text-danger");
      apellidoFeedback.html("Apellido válido").addClass("d-block text-success");
    } else {
      apellido
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      apellidoFeedback
        .html("Ingrese un apellido válido")
        .addClass("d-block text-danger");
    }
  });

  // Validar Telefono //
  telefono.on("focusout", function () {
    let telefonoVal = $(this).val();

    if (telefonoVal === "") {
      telefono
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      telefonoFeedback
        .html("El número debe ser de 9 digitos")
        .addClass("d-block text-danger");
    }
  });

  telefono.on("keyup", function () {
    let telefonoVal = $(this).val();
    let valido = validarTelefono(telefonoVal);

    validacionesTitular.telefono = valido;
    validarDatos(validacionesTitular, boton);

    if (valido) {
      telefono
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      telefonoFeedback.removeClass("d-block text-danger");
      telefonoFeedback.html("Teléfono válido").addClass("d-block text-success");
    } else {
      telefono
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      telefonoFeedback
        .html("El número debe ser de 9 digitos")
        .addClass("d-block text-danger");
    }
  });

  // Validar Correo //
  email.on("focusout", function () {
    let emailVal = $(this).val();

    if (emailVal === "") {
      email
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      emailFeedback
        .html("El correo no cumple el formato correcto")
        .addClass("d-block text-danger");
    }
  });

  email.on("keyup", function () {
    let emailVal = $(this).val();
    let valido = validarEmail(emailVal);

    validacionesTitular.email = valido;
    validarDatos(validacionesTitular, boton);

    if (valido) {
      email
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      emailFeedback.removeClass("d-block text-danger");
      emailFeedback
        .html("Correo electrónico válido")
        .addClass("d-block text-success");
    } else {
      email
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      emailFeedback
        .html("El correo no cumple el formato correcto")
        .addClass("d-block text-danger");
    }
  });

  // Validar Contraseña //
  password.on("focusout", function () {
    let passwordVal = $(this).val();

    if (passwordVal === "") {
      password
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      passwordFeedback1
        .html(PASSWORD_ERROR.CARACTER_MINIMO)
        .addClass("d-block text-danger");
      passwordFeedback2
        .html(PASSWORD_ERROR.MAYUSCULA)
        .addClass("d-block text-danger");
      passwordFeedback3
        .html(PASSWORD_ERROR.NUMERO)
        .addClass("d-block text-danger");
      passwordFeedback4
        .html(PASSWORD_ERROR.CARACTER_ESPECIAL)
        .addClass("d-block text-danger");
    }
  });

  password.on("keyup", function () {
    let passwordVal = $(this).val();
    let lista = validarPassword(passwordVal);
    let validoConfirmPassword = validarConfirmarPassword(
      passwordVal,
      confirmPassword.val()
    );

    validacionesTitular.password = lista.length === 0;
    validarDatos(validacionesTitular, boton);

    if (validoConfirmPassword) {
      confirmPassword
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      confirmPasswordFeedback.removeClass("d-block text-danger");
      confirmPasswordFeedback
        .html("Contraseña válida")
        .addClass("d-block text-success");
    } else {
      confirmPassword
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      confirmPasswordFeedback
        .html("La contraseña no coincide con la anterior")
        .addClass("d-block text-danger");
    }

    if (lista.length === 0) {
      password
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      passwordFeedback1
        .html("Contraseña válida")
        .addClass("d-block text-success");
      passwordFeedback1.removeClass("d-block text-danger");
      passwordFeedback2.html("").addClass("d-block text-success");
      passwordFeedback2.removeClass("d-block text-danger");
      passwordFeedback3.html("").addClass("d-block text-success");
      passwordFeedback3.removeClass("d-block text-danger");
      passwordFeedback4.html("").addClass("d-block text-success");
      passwordFeedback4.removeClass("d-block text-danger");
    } else {
      password
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      if (lista.includes(PASSWORD_ERROR.CARACTER_MINIMO)) {
        passwordFeedback1
          .html(PASSWORD_ERROR.CARACTER_MINIMO)
          .addClass("d-block text-danger");
      } else {
        passwordFeedback1.removeClass("d-block text-danger");
        passwordFeedback1.html("").addClass("d-block text-success");
      }

      if (lista.includes(PASSWORD_ERROR.MAYUSCULA)) {
        passwordFeedback2
          .html(PASSWORD_ERROR.MAYUSCULA)
          .addClass("d-block text-danger");
      } else {
        passwordFeedback2.removeClass("d-block text-danger");
        passwordFeedback2.html("").addClass("d-block text-success");
      }

      if (lista.includes(PASSWORD_ERROR.NUMERO)) {
        passwordFeedback3
          .html(PASSWORD_ERROR.NUMERO)
          .addClass("d-block text-danger");
      } else {
        passwordFeedback3.removeClass("d-block text-danger");
        passwordFeedback3.html("").addClass("d-block text-success");
      }

      if (lista.includes(PASSWORD_ERROR.CARACTER_ESPECIAL)) {
        passwordFeedback4
          .html(PASSWORD_ERROR.CARACTER_ESPECIAL)
          .addClass("d-block text-danger");
      } else {
        passwordFeedback4.removeClass("d-block text-danger");
        passwordFeedback4.html("").addClass("d-block text-success");
      }
    }
  });

  // Validar Confirmar Contraseña //
  confirmPassword.on("focusout", function () {
    let confirmPasswordVal = $(this).val();

    if (confirmPasswordVal === "") {
      confirmPassword
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      confirmPasswordFeedback
        .html("La contraseña no coincide con la anterior")
        .addClass("d-block text-danger");
    }
  });

  confirmPassword.on("keyup", function () {
    let confirmPasswordVal = $(this).val();
    let valido = validarConfirmarPassword(password.val(), confirmPasswordVal);

    validacionesTitular.confirmPassword = valido;
    validarDatos(validacionesTitular, boton);

    if (valido) {
      confirmPassword
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      confirmPasswordFeedback.removeClass("d-block text-danger");
      confirmPasswordFeedback
        .html("Contraseña válida")
        .addClass("d-block text-success");
    } else {
      confirmPassword
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      confirmPasswordFeedback
        .html("La contraseña no coincide con la anterior")
        .addClass("d-block text-danger");
    }
  });

  // Validar Destinatario //
  dest.on("keyup", function () {
    let destVal = $(this).val();
    let valido = validardest(destVal);

    if (valido) {
      dest
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      destFeedback.removeClass("d-block text-danger");
      destFeedback.html("Nombre válido").addClass("d-block text-success");
    } 
    else {
      dest
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      destFeedback
        .html("El destinatario no debe estar vacio")
        .addClass("d-block text-danger");
    }
  });

  // Validar Direccion //
  calle.on("keyup", function () {
    let calleValor = $(this).val();
    let valido = validarCalle(calleValor);

    if (valido) {
      calle
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      calleFeedback.removeClass("d-block text-danger");
      calleFeedback
        .html("Nombre de calle válido")
        .addClass("d-block text-success");
    } 
    else {
      calle
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      calleFeedback
        .html("El nombre de calle no puede estar vacio")
        .addClass("d-block text-danger");
    }
  });

  // Validar N° de Casa //
  nro.on("keyup", function () {
    let nroVal = $(this).val();
    let valido = validarnro(nroVal);

    if (valido) {
      nro
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      nroFeedback.removeClass("d-block text-danger");
      nroFeedback.html("Número válido").addClass("d-block text-success");
    } else {
      nro
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      nroFeedback
        .html("El número no debe estar vacio")
        .addClass("d-block text-danger");
    }
  });

  // Validar N° Depto //
  depto.on("keyup", function () {
    let deptoVal = $(this).val();
    let valido = validardepto(deptoVal);

    if (valido) {
      depto
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      deptoFeedback.removeClass("d-block text-danger");
      deptoFeedback.html("Número válido").addClass("d-block text-success");
    } else {
      depto
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      deptoFeedback
        .html("El número de departamento no debe estar vacio")
        .addClass("d-block text-danger");
    }
  });

  // Validar CheckBox //
  check.on("click", function () {
    let checkbox = $(this);
    validacionesTitular.check = checkbox.is(":checked");
    validarDatos(validacionesTitular, boton);
  });

  // Register Button
  boton.on("click", function () {
      if (!validarDatos(validacionesTitular, boton)) {
        const toastNoRegisterIntance = bootstrap.Toast.getOrCreateInstance(toastNoRegister)
        toastNoRegisterIntance.show()
      }
      else {
        const toastRegisterIntance = bootstrap.Toast.getOrCreateInstance(toastRegister)
        toastRegisterIntance.show()

        boton.attr("disabled", "disabled");
  
        setTimeout(function () {
          formRegister.submit()
        }, 2000);
      }
  });
});

$.ajax({
  type: "GET",
  url: "https://apis.digital.gob.cl/dpa/regiones",
  data: "data",
  dataType: "JSONP",
  success: function (data) {
    regions = data;

    $.each(data, function (i, tmp) {
      $("#region").append(
        "" + "<option value='" + tmp.nombre + "'>" + tmp.nombre + "</option>"
      );
    });
  },
});
$("#region").change(function () {
  let region = regions.find((region) => region.nombre === $("#region").val()).codigo;

  $.ajax({
    type: "GET",
    url: "https://apis.digital.gob.cl/dpa/regiones/" + region + "/comunas",
    data: "data",
    dataType: "JSONP",
    success: function (data) {
      $("#comuna").html("");
      $.each(data, function (i, tmp) {
        $("#comuna").append("" + "<option>" + tmp.nombre + "</option>");
      });
    },
  });
});

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

function validardest(dest) {
  return dest.length <= 40 && dest.length != "";
}

function validarnro(nro) {
  return nro.length <= 4 && nro.length != "";
}

function validardepto(depto) {
  return depto.length <= 40 && depto.length != "";
}

function validarCalle(calleValor) {
  if (calleValor === "") return false;

  const regex = /[^A-Za-z0-9-\s]/g;
  return !regex.test(calleValor);
}

function validarPassword(password) {
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

function validarConfirmarPassword(password, confirmPassword) {
  return confirmPassword !== "" && password === confirmPassword;
}

function validarDatos(validacionesTitular, boton) {
  const validado = Object.values(validacionesTitular).every((value) => value);

  if (validado) {
    boton.removeAttr("disabled");
  } 
  else {
    boton.attr("disabled", "disabled");
  }

  return validado;
}

const PASSWORD_ERROR = {
  CARACTER_MINIMO: "La contraseña debe tener minimo 12 caracteres",
  CARACTER_ESPECIAL: "La contraseña debe tener al menos un caracter especial",
  MAYUSCULA: "La contraseña debe tener al menos una mayúscula",
  NUMERO: "La contraseña debe tener al menos un número",
};