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
  const destinatario = $("#dest");
  const region = $("#region");
  const comuna = $("#comuna");
  const calle = $("#direccion");
  const nro = $("#nro");
  const depto = $("#depto");
  const check = $("#check");
  const buttonRegister = $("#btn-register");
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
    } else {
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
    } else {
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
    validarRegistro(validacionesTitular, buttonRegister);

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
    validarRegistro(validacionesTitular, buttonRegister);

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
    validarRegistro(validacionesTitular, buttonRegister);

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
    validarRegistro(validacionesTitular, buttonRegister);

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
    validarRegistro(validacionesTitular, buttonRegister);

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
    let lista = validarPasswordRegister(passwordVal);
    let validoConfirmPassword = validarConfirmarPassword(
      passwordVal,
      confirmPassword.val()
    );

    validacionesTitular.password = lista.length === 0;
    validarRegistro(validacionesTitular, buttonRegister);

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
    validarRegistro(validacionesTitular, buttonRegister);

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
  destinatario.on("keyup", function () {
    let destVal = $(this).val();
    let valido = validarDestinatario(destVal);

    if (valido) {
      destinatario
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    } else {
      destinatario
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
    }
  });

  // Validar Direccion //
  calle.on("keyup", function () {
    let calleValor = $(this).val();
    let valido = validarNumeroCalle(calleValor);

    if (valido) {
      calle
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    } else {
      calle
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
    }
  });

  // Validar N° de Casa //
  nro.on("keyup", function () {
    let nroVal = $(this).val();
    let valido = validarNumeroCalle(nroVal);

    if (valido) {
      nro
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    } else {
      nro
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
    }
  });

  // Validar N° Depto //
  depto.on("keyup", function () {
    let deptoVal = $(this).val();
    let valido = validarDepto(deptoVal);

    if (valido) {
      depto
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    } else {
      depto
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
    }
  });

  // Validar CheckBox //
  check.on("click", function () {
    let checkbox = $(this);
    validacionesTitular.check = checkbox.is(":checked");
    validarRegistro(validacionesTitular, buttonRegister);
  });

  // Register Button
  buttonRegister.on("click", async function () {
    if (!validarRegistro(validacionesTitular, buttonRegister)) {
      showToastRegister("Complete todos los campos");
    } else {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          csrf_token: CSRF_TOKEN,
          rut: rut.val(),
          nombre: nombre.val(),
          apellido: apellido.val(),
          telefono: telefono.val(),
          email: email.val(),
          password: password.val(),
          destinatario: destinatario.val(),
          region: region.val(),
          comuna: comuna.val(),
          calle: calle.val(),
          numero: nro.val(),
          depto: depto.val(),
        }),
      });

      const data = await response.json();

      if (data.userExist) {
        showToastRegister("El rut ya se encuentra registrado.");
        return;
      }

      if (data.emailExist) {
        showToastRegister("El correo ya se encuentra registrado.");
        return;
      }

      if (data.success) {
        showToastRegister("Registro exitoso.", true);
        buttonRegister.attr("disabled", "disabled");

        setTimeout(function () {
          window.reload();
        }, 2000);
      }
    }
  });
});

$.ajax({
  type: "GET",
  url: "https://apis.digital.gob.cl/dpa/regiones/",
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
  let region = regions.find(
    (region) => region.nombre === $("#region").val()
  ).codigo;

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

function validarRegistro(validacionesTitular, button) {
  const validado = Object.values(validacionesTitular).every((value) => value);

  if (validado) {
    button.removeAttr("disabled");
  } else {
    button.attr("disabled", "disabled");
  }

  return validado;
}

function validarPasswordRegister(password) {
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
