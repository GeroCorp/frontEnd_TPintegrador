

const BTN_MOVIES = document.getElementById("movies-button");
const BTN_CARRITO = document.getElementById("carrito-button");

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

BTN_MOVIES.addEventListener("click", () => {
    location.href = "../main.html";
});

BTN_CARRITO.addEventListener("click", () => {
    location.href = "carrito.html";
});

function verificar_nombre(){

    let nombre = sessionStorage.getItem("nombre");

    if(!nombre){
        location.href = "../index.html";
    }

    NOMBRE_USUARIO.innerHTML = "Hola, " + nombre;

}

function init(){
    verificar_nombre();
}