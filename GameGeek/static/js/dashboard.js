$(document).ready(function () {
  const btnAgregarProducto = $("#btn-add-product");
  const nombre = $("#nombre-producto");
  const imagen = $("#imagen-producto");
  const precio = $("#precio-producto");
  const descuento = $("#descuento-producto");
  const stock = $("#stock-producto");
  const descripcion = $("#descripcion-producto");
  const categoria = $("#categoria-producto");

  btnAgregarProducto.on("click", async function () {
    const response = await fetch("/api/dashboard/productos/agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        csrf_token: CSRF_TOKEN,
        nombre: nombre.val(),
        imagen: imagen.val(),
        precio: precio.val(),
        descuento: descuento.val(),
        stock: stock.val(),
        descripcion: descripcion.val(),
        categoria: categoria.val(),
      }),
    });

    const data = await response.json();

    if (data.success) {
      showToast("Dashboard", "Producto agregado correctamente.", true);

      setTimeout(function () {
        location.reload();
      }, 1000);
    } else {
      showToast("Dashboard", "Ocurrió un error al agregar el producto.");
    }
  });

  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
});

function validarNombreProducto(nombre) {
  return nombre.length <= 40 && nombre.length != "";
}

function validarImagenProducto(imagen) {
  return imagen.length != "";
}

function validarEntero(entero) {
  return entero.length != "" && !isNaN(entero) && entero >= 0;
}

function validarDescuento(descuento) {
  return (
    descuento.length != "" &&
    !isNaN(descuento) &&
    descuento >= 0 &&
    descuento <= 100
  );
}

function validarDescripcion(descripcion) {
  return descripcion.length != "";
}
