$(document).ready(function(){

    let rut = $("#rut").val();

    validarRut(rut);
});


function validarRut(rut) {

    $("#rut").on("focusout", function() {
        let rutString = String(rut);
        alert(rutString)
        
    });

}