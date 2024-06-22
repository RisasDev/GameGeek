$(document).ready(function () {
  const validaciones = {
    rut: false,
    password: false,
  };

  const rutField = $("#rut-modal-login");
  const rutFeedback = $("#rut-modal-feedback");
  const passwordField = $("#password-modal-login");
  const passwordFeedback = $("#password-modal-feedback");

  const button = $("#button-modal-login");

  // Validar Rut Login Modal //
  rutField.on("focusout", function () {
    let val = $(this).val();

    if (val === "") {
      rutField
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      rutFeedback
        .html("Ingrese un rut válido: 12345678-K")
        .addClass("d-block text-danger");
    }
  });

  rutField.on("keyup", function () {
    let val = $(this).val();
    let valido = validarRut(val);

    validaciones.rut = valido;
    validarDatos(validaciones);

    if (valido) {
      rutField
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      rutFeedback.removeClass("d-block text-danger");
      rutFeedback.html("").addClass("d-block text-success");
    } else {
      rutField
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      rutFeedback
        .html("Ingrese un rut válido: 12345678-K")
        .addClass("d-block text-danger");
    }
  });

  // Validar Password Login Modal //
  passwordField.on("focusout", function () {
    let val = $(this).val();

    if (val === "") {
      passwordField
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      passwordFeedback
        .html("Ingrese una contraseña válida")
        .addClass("d-block text-danger");
    }
  });

  passwordField.on("keyup", function () {
    let val = $(this).val();
    let valido = validarPassword(val);

    validaciones.password = valido;
    validarDatos(validaciones);

    if (valido) {
      passwordField
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
      passwordFeedback.removeClass("d-block text-danger");
      passwordFeedback.html("").addClass("d-block text-success");
    } else {
      passwordField
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");
      passwordFeedback
        .html("Ingrese una contraseña válida")
        .addClass("d-block text-danger");
    }
  });

  // Botón Ingresar Login Modal //
  button.on("click", async function () {
    if (validarDatos(validaciones)) {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          csrf_token: CSRF_TOKEN,
          rut: rutField.val(),
          password: passwordField.val(),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        showToastLogin("El rut o la contraseña son incorrectos.");
        return;
      }

      showToastLogin("Inicio de sesión exitoso.", "success");

      // Iniciar sesión
    } 
    else {
      showToastLogin("Debes completar todos los campos para iniciar sesión.");
    }
  });
});

function validarDatos(validaciones) {
  return Object.values(validaciones).every((value) => value);
}
