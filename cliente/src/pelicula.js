const MOVIE = JSON.parse(sessionStorage.getItem("movie"));

const TITULO = document.getElementById("titulo");
const IMAGEN = document.getElementById("imagen");
const SINOPSIS = document.getElementById("sinopsis");
const GENERO = document.getElementById("genero");
const DURACION = document.getElementById("duracion");
const CLASIFICACION = document.getElementById("clasificacion");
const SALAS = document.getElementById("salas");

const ENTRADA_1 = document.getElementById("en1")
const ENTRADA_2 = document.getElementById("en2")


function verificar_nombre(){

    let nombre = sessionStorage.getItem("nombre");

    if(!nombre){
        location.href = "../index.html";
    }

    //NOMBRE_USUARIO.innerHTML = "Hola, " + nombre;

}

function verificar_pelicula(){

    if(!MOVIE){
        location.href = "cartelera.html";
    }
}

function mostrar_info_pelicula(){
    TITULO.innerHTML = MOVIE.titulo.toUpperCase();
    IMAGEN.src = `../src/img/peliculas/${MOVIE.imagen}`;
    IMAGEN.alt = MOVIE.titulo.toUpperCase();
    SINOPSIS.innerHTML = MOVIE.sinopsis;
    GENERO.innerHTML = `Genero: ${MOVIE.categoria}`;
    DURACION.innerHTML = `Duracion: ${MOVIE.duracion} min`;
    CLASIFICACION.innerHTML = "Clasificacion: " + MOVIE.clasificacion;
    SALAS.innerHTML = "Salas: " + MOVIE.tags.split(',').join(' - ');
}
ENTRADA_1.addEventListener("click", e =>{

    const td = ENTRADA_1.getElementsByTagName("td");

    let entrada ={
         horario : td[0].textContent,
         fecha : td[1].textContent,
         sala : td[2].textContent
    } 

    addToCart(MOVIE, entrada)

})

ENTRADA_2.addEventListener("click", e =>{

    const td = ENTRADA_2.getElementsByTagName("td");

    let entrada ={
         horario : td[0].textContent,
         fecha : td[1].textContent,
         sala : td[2].textContent
    } 

    addToCart(MOVIE, entrada)

})


function init(){
    verificar_nombre();
    verificar_pelicula();
    mostrar_info_pelicula();
}

init();