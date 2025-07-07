const BTN_CARTELERA = document.getElementById("movies-button");

BTN_CARTELERA.addEventListener("click", () => {
    location.href = "../main.html";
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

init();