$(document).ready(function () {
  const containerProducts = $("#container-products");
  const rowProduct = document.querySelector(".cart-preview__products");
  const cartEmpty = document.querySelector(".cart-preview__empty");
  const cartNotEmpty = document.querySelector(".cart-preview__not-empty");

  let allProducts = [];

  const valorTotal = document.querySelector(
    ".cart-preview__total_precio_precio"
  );
  const countProducts = document.querySelector(
    ".cart-preview__total_cantidad_cantidad"
  );

  containerProducts.on("click", function (e) {
    if (!e.target.classList.contains("btn-add-cart")) return;

    const product = e.target.parentElement.parentElement;

    const infoProduct = {
      title: product.querySelector(".card-title").textContent,
      price: product.querySelector(".card-price").textContent,
      src: product.querySelector(".card-producto").src,
      quantity: 1,
    };

    const existProduct = allProducts.some(
      (product) => product.title === infoProduct.title
    );

    if (existProduct) {
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
        }
        return product;
      });

      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    updateCart();
    showToast("Carrito de compra", "Producto agregado al carrito.", true);
  });

  rowProduct.addEventListener("click", function (e) {
    if (!e.target.classList.contains("bi-trash")) return;

    const product = e.target.parentElement.parentElement;
    const title = product.querySelector(
      ".cart-preview__product_item_info_nombre h6"
    ).textContent;

    allProducts = allProducts.filter((product) => product.title !== title);

    updateCart();
    showToast("Carrito de compra", "Producto eliminado del carrito.", true);
  });

  function updateCart() {
    if (!allProducts.length) {
      cartEmpty.classList.remove("hidden");
      cartNotEmpty.classList.add("hidden");
    } else {
      cartEmpty.classList.add("hidden");
      cartNotEmpty.classList.remove("hidden");
    }

    rowProduct.innerHTML = "";

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach((product) => {
      const containerProduct = document.createElement("div");
      containerProduct.classList.add("cart-preview__product_item");

      containerProduct.innerHTML = `
              <div class="cart-preview__product_item_img">
                <img src="${product.src}" alt="${product.title}" class="cart-preview-item-img">
              </div>
  
              <div class="cart-preview__product_item_info">
                <div class="cart-preview__product_item_info_nombre">
                  <h6>${product.title}</h6>
                </div>
                <div class="cart-preview__product_item_info_cantidad">
                  Unidades:
                  <span class="cart-preview__product_item_info_cantidad_cantidad">${product.quantity}</span>
                </div>
                <div class="cart-preview__product_item_info_precio">
                  Precio: ${product.price}
                </div>
              </div>
  
              <div class="cart-preview__product_item_delete">
                <i class="bi bi-trash" id="cart-preview__product_item_delete"></i>
              </div>
        `;

      rowProduct.append(containerProduct);

      productPrice = product.price.slice(1).replace(",", "").replace(".", "");
      total += parseInt(productPrice * product.quantity);
      totalOfProducts += product.quantity;
    });

    valorTotal.innerHTML = `$${total}`;
    countProducts.innerHTML = totalOfProducts;
  }
});
