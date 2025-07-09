const MOVIE = JSON.parse(sessionStorage.getItem("movie"));

const TITULO = document.getElementById("titulo");
const IMAGEN = document.getElementById("imagen");
const SINOPSIS = document.getElementById("sinopsis");
const GENERO = document.getElementById("genero");
const DURACION = document.getElementById("duracion");
const CLASIFICACION = document.getElementById("clasificacion");


function verificar_nombre(){

    let nombre = sessionStorage.getItem("nombre");

    if(!nombre){
        location.href = "../index.html";
    }

    //NOMBRE_USUARIO.innerHTML = "Hola, " + nombre;

}

function verificar_pelicula(){

    if(!MOVIE){
        location.href = "../main.html";
    }
}

function mostrar_info_pelicula(){
    TITULO.innerHTML = MOVIE.titulo.toUpperCase();
    IMAGEN.src = MOVIE.imagen;
    IMAGEN.alt = MOVIE.titulo.toUpperCase();
    SINOPSIS.innerHTML = MOVIE.sinopsis;
    GENERO.innerHTML = "Genero: " + MOVIE.categoria;
    DURACION.innerHTML = "Duracion: " + MOVIE.duracion;
    CLASIFICACION.innerHTML = "Clasificacion: " + MOVIE.clasificacion;
}

function init(){
    verificar_nombre();
    verificar_pelicula();
    mostrar_info_pelicula();
}

init();