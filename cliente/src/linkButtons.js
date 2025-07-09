const BTN_COLECCIONABLES = document.getElementById("coleccionables-button");
const BTN_CARRITO = document.getElementById("carrito-button");


BTN_CARRITO.addEventListener("click", () => {

    location.href = "pages/carrito.html";

});

BTN_COLECCIONABLES.addEventListener("click", () => {

    location.href = "pages/coleccionables.html";

});