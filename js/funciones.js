$(document).ready(function(){

    let rut = $("#rut");
    let rutfeedback = $("#rut-feedback");
    let nombre = $("#nombre");
    let nombreFeedback = $("#nombre-feedback");
    let apellido = $("#apellido");
    let apellidoFeedback = $("#apellido-feedback");
    let telefono = $("#telefono");
    let telefonoFeedback = $("#telefono-feedback");
    let email = $("#email");
    let emailFeedback = $("#email-feedback");
    let password = $("#password");
    let passwordFeedback = $("#password-feedback");
    let calle = $("#direccion");
    let calleFeedback = $("#direccion-feedback");
    let dest = $("#dest");
    let destFeedback = $("#dest-feedback");
    let nro = $("#nro");
    let nroFeedback = $("#nro-feedback");
    let depto = $("#depto");
    let deptoFeedback = $("#depto-feedback");

    // Validar Rut //
    rut.on("keyup", function() {
        let rutval = $(this).val();
        let valido = validarRut(rutval);
        if (valido) {
          rut.removeClass("is-invalid text-danger").addClass("is-valid text-success");
          rutfeedback.removeClass("d-block text-danger");
          rutfeedback.html("Rut válido").addClass("d-block text-success");
        } else {
          rut.removeClass("is-valid text-success").addClass("is-invalid text-danger");
          rutfeedback.html("El rut debe ser: 12345678-k").addClass("d-block text-danger");
        }
    });

    // Validar Nombre //
    nombre.on("keyup", function() {
        let nombreVal = $(this).val();
        let valido = validarNombre(nombreVal); 
      
        if (valido) {
          nombre.removeClass("is-invalid text-danger").addClass("is-valid text-success");
          nombreFeedback.removeClass("d-block text-danger");
          nombreFeedback.html("Nombre válido").addClass("d-block text-success");
        } else {
          nombre.removeClass("is-valid text-success").addClass("is-invalid text-danger");
          nombreFeedback.html("El nombre no cumple los requisitos").addClass("d-block text-danger");
        }
    });

    // Validar Apellido //
    apellido.on("keyup", function() {
        let apellidoVal = $(this).val();
        let valid = validarApellido(apellidoVal); 
        
        if (valid) {
            apellido.removeClass("is-invalid text-danger").addClass("is-valid text-success");
            apellidoFeedback.removeClass("d-block text-danger");
            apellidoFeedback.html("Apellido válido").addClass("d-block text-success");
        } else {
            apellido.removeClass("is-valid text-success").addClass("is-invalid text-danger");
            apellidoFeedback.html("El apellido no cumple los requisitos").addClass("d-block text-danger");
        }
    });
      
    // Validar Telefono //
    telefono.on("keyup", function() {
        let telefonoVal = $(this).val();
        let valido = validarTelefono(telefonoVal);
      
        if (valido) {
          telefono.removeClass("is-invalid text-danger").addClass("is-valid text-success");
          telefonoFeedback.removeClass("d-block text-danger");
          telefonoFeedback.html("Teléfono válido").addClass("d-block text-success");
        } else {
          telefono.removeClass("is-valid text-success").addClass("is-invalid text-danger");
          telefonoFeedback.html("El número debe ser de 8 digitos").addClass("d-block text-danger");
        }
    });

    // Validar Correo //
    email.on("keyup", function() {
        let emailVal = $(this).val();
        let valido = validarEmail(emailVal);
      
        if (valido) {
          email.removeClass("is-invalid text-danger").addClass("is-valid text-success");
          emailFeedback.removeClass("d-block text-danger");
          emailFeedback.html("Correo electrónico válido").addClass("d-block text-success");
        } else {
          email.removeClass("is-valid text-success").addClass("is-invalid text-danger");
          emailFeedback.html("El correo no cumple el formato correcto").addClass("d-block text-danger");
        }
    });

    // Validar Contraseña //
    password.on("keyup", function() {
        let passwordVal = $(this).val();
        let valido = validarPassword(passwordVal);
      
        if (valido) {
          password.removeClass("is-invalid text-danger").addClass("is-valid text-success");
          passwordFeedback.removeClass("d-block text-danger");
          passwordFeedback.html("Contraseña válida").addClass("d-block text-success");
        } else {
          password.removeClass("is-valid text-success").addClass("is-invalid text-danger");
          passwordFeedback.html("La contraseña debe tener minimo 12 caracteres").addClass("d-block text-danger");
        }
    });

    // Validar Destinatario //
    dest.on("keyup", function() {
      let destVal = $(this).val();
      let valido = validardest(destVal); 
    
      if (valido) {
        dest.removeClass("is-invalid text-danger").addClass("is-valid text-success");
        destFeedback.removeClass("d-block text-danger");
        destFeedback.html("Nombre válido").addClass("d-block text-success");
      } else {
        dest.removeClass("is-valid text-success").addClass("is-invalid text-danger");
        destFeedback.html("El destinatario no debe estar vacio").addClass("d-block text-danger");
      }
    });

    // Validar Direccion //
    calle.on("keyup", function() {
      let calleValor = $(this).val();
      let valido = validarCalle(calleValor); 
    
      if (valido) {
        calle.removeClass("is-invalid text-danger").addClass("is-valid text-success");
        calleFeedback.removeClass("d-block text-danger");
        calleFeedback.html("Nombre de calle válido").addClass("d-block text-success");
      } else {
        calle.removeClass("is-valid text-success").addClass("is-invalid text-danger");
        calleFeedback.html("El nombre de calle no puede estar vacio").addClass("d-block text-danger");
      }
    });

    // Validar N° de Casa //
    nro.on("keyup", function() {
      let nroVal = $(this).val();
      let valido = validarnro(nroVal); 
    
      if (valido) {
        nro.removeClass("is-invalid text-danger").addClass("is-valid text-success");
        nroFeedback.removeClass("d-block text-danger");
        nroFeedback.html("Número válido").addClass("d-block text-success");
      } else {
        nro.removeClass("is-valid text-success").addClass("is-invalid text-danger");
        nroFeedback.html("El número no debe estar vacio").addClass("d-block text-danger");
      }
    });

    // Validar N° de Casa //
    depto.on("keyup", function() {
      let deptoVal = $(this).val();
      let valido = validardepto(deptoVal); 
    
      if (valido) {
        depto.removeClass("is-invalid text-danger").addClass("is-valid text-success");
        deptoFeedback.removeClass("d-block text-danger");
        deptoFeedback.html("Número válido").addClass("d-block text-success");
      } else {
        depto.removeClass("is-valid text-success").addClass("is-invalid text-danger");
        deptoFeedback.html("El número de departamento no debe estar vacio").addClass("d-block text-danger");
      }
    });

});

$("btl-log").click(function(){
    let rut = $("#rut").val();
    let pass = $("#password").val();
    let res = validarDatos(rut, pass);
    if (res) {
        $("#exampleModal").modal("show");
            $("#res").html("")
            $("#res").append("<p>");
            $("#res").append("Rut: " + rut + "<br>");
            $("#res").append("Password: " + pass + "<br>");
            $("#res").append("</p>");
            console.log("Rut:", rut);
            console.log("Password:", pass);
    }
});

function validarNombre(nombre) {
    if (nombre.length > 40) {
      return false;
    }
    
    if (nombre === "") {
      return false;
    }
    return true;
}

function validarApellido(apellido) {
    if (apellido.length > 50) {
        return false;
    }

    if (apellido === "") {
        return false;
    }
    return true;
}

function validarTelefono(telefono) {
    return telefono.length === 8;
}

function validarEmail(email) {
    let partes = email.split("@");
  
    if (partes.length !== 2) {
      return false;
    }
  
    let usuario = partes[0];
    const usuarioRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+/;
    if (!usuarioRegex.test(usuario)) {
      return false;
    }
  
    let dominio = partes[1];
    if (dominio !== "gmail.com") {
      return false;
    }
    return true;
}

function validarRut(rutCompleto) {
    let rut = rutCompleto.split('-')[0];
    let dv = rutCompleto.split('-')[1];
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
        dvCalculado = 'K';
    }
    return dv == dvCalculado;

}

$.ajax({
  type: "GET",
  url: "https://apis.digital.gob.cl/dpa/regiones",
  data: "data",
  dataType: "JSONP",
  success: function (data) {
      $.each(data, function (i, tmp) {
          $("#region").append("" +
              "<option value='" + tmp.codigo +
              "'>" + tmp.nombre + "</option>"
          )
      })
  }
});
$("#region").change(function () {
  let comuna = $("#region").val();
  $.ajax({
      type: "GET",
      url: "https://apis.digital.gob.cl/dpa/regiones/" + comuna + "/comunas",
      data: "data",
      dataType: "JSONP",
      success: function (data) {
          $("#comuna").html("");
          $.each(data, function (i, tmp) {
              $("#comuna").append("" +
                  "<option>" + tmp.nombre + "</option>"
              )
          })
      }
  });
});

function validardest(dest) {
  return dest.length <= 40 && dest.length != "";
}

function validarnro(nro) {
  return nro.length <= 4 && dest.length != "";
}

function validardepto(depto) {
  return depto.length <= 40 && depto.length != "";
}

function validarCalle(calleValor) {
  if (calleValor.length > 40) {
    return false;
  }

  if (calleValor === "") {
    return false;
  }

  const regex = /[^A-Za-z0-9-\s]/g;
  if (regex.test(calleValor)) {
    return false;
  }

  return true;
}

function validarPassword(password) {
    let MIN_LENGTH = 12;
    let hasMayuscula = /[A-Z]/.test(password);
    let hasMinuscula = /[a-z]/.test(password);
    let hasNumero = /[0-9]/.test(password);
    let hasSimbolo = /[!"#$%&'()*+,-./:;<=>?@[]^_{|}~]/;

  
    return (
      password.length >= MIN_LENGTH &&
      hasMayuscula &&
      hasMinuscula &&
      hasNumero &&
      hasSimbolo
    );
}

