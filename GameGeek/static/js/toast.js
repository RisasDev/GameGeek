function showToast(title, message, type) {
  const toast = document.getElementById("toast");
  const toastTitle = document.getElementById("toast-title");
  const toastBody = document.getElementById("toast-body");

  toastTitle.innerHTML = title;
  toastBody.innerHTML = message;

  if (type === "success") {
    toastTitle.classList.remove("text-danger");
    toastTitle.classList.add("text-success");

    toastBody.classList.remove("text-danger");
    toastBody.classList.add("text-success");
  } 
  else {
    toastTitle.classList.remove("text-success");
    toastTitle.classList.add("text-danger");

    toastBody.classList.remove("text-success");
    toastBody.classList.add("text-danger");
  }

  bootstrap.Toast.getOrCreateInstance(toast).show();
}

function showToastLogin(message, type) {
  showToast("Inicio de sesión", message, type);
}
