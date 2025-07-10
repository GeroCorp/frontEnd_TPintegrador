const BTN_COLECCIONABLES = document.getElementById("coleccionables-button");
const BTN_CARRITO = document.getElementById("carrito-button");
const BTN_MOVIES = document.getElementById("movies-button");


BTN_CARRITO.addEventListener("click", () => {

    location.href = "carrito.html";

});

BTN_COLECCIONABLES.addEventListener("click", () => {

    location.href = "coleccionables.html";

});

BTN_MOVIES.addEventListener("click", () => {

    location.href = "cartelera.html";

});