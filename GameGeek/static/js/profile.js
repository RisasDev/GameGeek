$(document).ready(function () {
  const nombre = $("#nombre-mis-datos");
  const apellido = $("#apellido-mis-datos");
  const telefono = $("#telefono-mis-datos");
  const email = $("#email-mis-datos");
  const actualPassword = $("#actual-password");
  const newPassword = $("#new-password");

  const btnGuardarMisDatos = $("#btn-guardar-mis-datos");

  btnGuardarMisDatos.on("click", async function () {
    const response = await fetch("/api/account/mis-datos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        csrf_token: CSRF_TOKEN,
        nombre: nombre.val(),
        apellido: apellido.val(),
        telefono: telefono.val(),
        email: email.val(),
        actual_password: actualPassword.val(),
        new_password: newPassword.val(),
      }),
    });

    if (!validarNombre(nombre.val())) {
      showToast("Perfil", "El nombre ingresado no tiene un formato válido.");

      nombre.focus();
      nombre
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      nombre
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    if (!validarApellido(apellido.val())) {
      showToast("Perfil", "El apellido ingresado no tiene un formato válido.");

      apellido.focus();
      apellido
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      apellido
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    if (!validarTelefono(telefono.val())) {
      showToast("Perfil", "El teléfono ingresado no tiene un formato válido.");

      telefono.focus();
      telefono
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      telefono
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    if (!validarEmail(email.val())) {
      showToast("Perfil", "El email ingresado no tiene un formato válido.");

      email.focus();
      email
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      email
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    const data = await response.json();

    if (data.emailExist) {
      showToast("Perfil", "El email ingresado ya se encuentra registrado.");

      email.focus();
      email
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      email
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    if (data.passwordIncorrect) {
      showToast("Perfil", "La contraseña actual es incorrecta.");

      actualPassword.focus();
      actualPassword.addClass("is-invalid text-danger");
      return;
    }
    
    if (actualPassword.val() !== "") {
      actualPassword
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    if (newPassword.val() !== "" || actualPassword.val() !== "") {
      let lista = validarPasswordLista(newPassword.val());

      if (lista.length > 0) {
        showToast(
          "Perfil",
          "La contraseña ingresada no cumple con los siguientes requisitos: " +
            lista.join(", ")
        );

        newPassword.focus();
        newPassword.addClass("is-invalid text-danger");
        return;
      }
    }

    if (data.success) {
      showToast(
        "Perfil",
        "Tus datos han sido actualizados correctamente.",
        true
      );
    } else {
      showToast("Pefil", "Ha ocurrido un error al actualizar tus datos.");
    }

    setTimeout(function () {
      location.reload();
    }, 1000);
  });
});
