$(document).ready(function () {
  const btnAgregarProducto = $("#btn-add-product");
  const btnEliminarProducto = $(".btn-delete-product");
  const btnModificarProducto = $("#btn-modify-product");
  const btnModalProducto = $(".btn-modal-product");

  const nombre = $("#nombre-producto");
  const imagen = $("#imagen-producto");
  const precio = $("#precio-producto");
  const descuento = $("#descuento-producto");
  const stock = $("#stock-producto");
  const descripcion = $("#descripcion-producto");
  const categoria = $("#categoria-producto");

  const modalNombre = $("#nombre-producto-modal");
  const modalImagen = $("#imagen-producto-modal");
  const modalPrecio = $("#precio-producto-modal");
  const modalDescuento = $("#descuento-producto-modal");
  const modalStock = $("#stock-producto-modal");
  const modalDescripcion = $("#descripcion-producto-modal");
  const modalCategoria = $("#categoria-producto-modal");

  let oldImagenProducto = "";

  const btnAgregarCategoria = $("#btn-add-categoria");

  const nombreCategoria = $("#nombre-categoria");
  const imagenCategoria = $("#imagen-categoria");

  btnAgregarProducto.on("click", async function () {
    if (!validarNombre(nombre.val())) {
      showToast("Dashboard", "Debe ingresar un nombre para el producto.");

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

    if (!validarImagen(imagen.val())) {
      showToast("Dashboard", "Debe ingresar una imagen para el producto.");

      imagen.focus();
      imagen
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      imagen
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    if (!validarEntero(precio.val())) {
      showToast("Dashboard", "Debe ingresar un precio para el producto.");

      precio.focus();
      precio
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      precio
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    if (!validarEntero(stock.val())) {
      showToast("Dashboard", "Debe ingresar un stock para el producto.");

      stock.focus();
      stock
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      stock
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    let descuentoValue = descuento.val();

    if (descuentoValue === "") {
      descuentoValue = 0;
    } else {
      descuentoValue = parseInt(descuentoValue);
    }

    if (!validarDescripcion(descripcion.val())) {
      showToast("Dashboard", "Debe ingresar una descripción para el producto.");

      descripcion.focus();
      descripcion
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      descripcion
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    const file = imagen[0].files[0];
    const fileBytes = new Uint8Array(await file.arrayBuffer());

    const response = await fetch("/api/dashboard/productos/agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        csrf_token: CSRF_TOKEN,
        nombre: nombre.val(),
        imagen: file.name,
        imagen_data: Array.from(fileBytes),
        precio: precio.val(),
        descuento: descuentoValue,
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

  btnEliminarProducto.on("click", async function () {
    const response = await fetch("/api/dashboard/productos/eliminar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        csrf_token: CSRF_TOKEN,
        id_producto: $(this).data("id-producto"),
      }),
    });

    const data = await response.json();

    if (data.success) {
      showToast("Dashboard", "Producto eliminado correctamente.", true);

      $(this).prop("disabled", true);

      setTimeout(function () {
        location.reload();
      }, 1000);
    } else {
      showToast("Dashboard", "Ocurrió un error al eliminar el producto.");
    }
  });

  btnModalProducto.on("click", async function () {
    const response = await fetch("/api/dashboard/productos/obtener", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        csrf_token: CSRF_TOKEN,
        id_producto: $(this).data("id-producto"),
      }),
    });

    const data = await response.json();

    modalNombre.attr("value", data.nombre).attr("placeholder", data.nombre);
    modalPrecio.attr("value", data.precio).attr("placeholder", data.precio);
    modalDescuento
      .attr("value", data.descuento)
      .attr("placeholder", data.descuento);
    modalStock.attr("value", data.stock).attr("placeholder", data.stock);
    modalDescripcion
      .attr("value", data.descripcion)
      .attr("placeholder", data.descripcion);
    btnModificarProducto.attr("data-id-producto", data.id);

    oldImagenProducto = data.imagen;
  });

  btnModificarProducto.on("click", async function () {
    const file = modalImagen[0].files[0];
    const fileBytes = new Uint8Array(await file.arrayBuffer());

    const response = await fetch("/api/dashboard/productos/modificar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        csrf_token: CSRF_TOKEN,
        id: $(this).data("id-producto"),
        nombre: modalNombre.val(),
        imagen: file.name,
        imagen_data: Array.from(fileBytes),
        precio: modalPrecio.val(),
        descuento: modalDescuento.val(),
        stock: modalStock.val(),
        descripcion: modalDescripcion.val(),
        categoria: modalCategoria.val(),
        old_imagen: oldImagenProducto,
      }),
    });

    const data = await response.json();

    if (data.success) {
      showToast("Dashboard", "Producto modificado correctamente.", true);

      setTimeout(function () {
        location.reload();
      }, 1000);
    } else {
      showToast("Dashboard", "Ocurrió un error al modificar el producto.");
    }
  });

  btnAgregarCategoria.on("click", async function () {
    if (!validarNombre(nombreCategoria.val())) {
      showToast("Dashboard", "Debe ingresar un nombre para la categoría.");

      nombreCategoria.focus();
      nombreCategoria
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      nombreCategoria
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    if (!validarImagen(imagenCategoria.val())) {
      showToast("Dashboard", "Debe ingresar una imagen para la categoría.");

      imagenCategoria.focus();
      imagenCategoria
        .removeClass("is-valid text-success")
        .addClass("is-invalid text-danger");

      return;
    } else {
      imagenCategoria
        .removeClass("is-invalid text-danger")
        .addClass("is-valid text-success");
    }

    const file = imagenCategoria[0].files[0];
    const fileBytes = new Uint8Array(await file.arrayBuffer());

    const response = await fetch("/api/dashboard/categorias/agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        csrf_token: CSRF_TOKEN,
        nombre: nombreCategoria.val().toLowerCase(),
        imagen: file.name,
        imagen_data: Array.from(fileBytes),
      }),
    });

    const data = await response.json();

    if (data.success) {
      showToast("Dashboard", "Categoría agregada correctamente.", true);

      setTimeout(function () {
        location.reload();
      }, 1000);
    } else {
      showToast("Dashboard", "Ocurrió un error al agregar la categoría.");
    }
  });

  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
});

function validarNombre(nombre) {
  return nombre.length <= 40 && nombre.length != "";
}

function validarImagen(imagen) {
  return imagen.length !== 0;
}

function validarEntero(entero) {
  return entero.length != "" && !isNaN(entero) && entero >= 0;
}

function validarDescripcion(descripcion) {
  return descripcion.length != "";
}
