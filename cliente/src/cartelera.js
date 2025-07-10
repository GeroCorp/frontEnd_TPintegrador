///////////////////////
// Conexión backEnd //
const url = "http://localhost:3000";

async function getMovies() {
    try{

        let peliculas = await fetch(`${url}/movies`); // Recupera todas las peliculas de la base de datos

        let datos = await peliculas.json();


        return datos.payload;

    } catch(error){

        console.error(error);

    }
}


/////////////////////////
// Constantes globales //
const SECTION_MOVIES = document.getElementById("section-productos");
const SEARCH_BAR = document.getElementById("search-input");
const AGE_FILTER = document.getElementById("age-filter");
const CAT_FILTER = document.getElementById("genre-filter");
const NOMBRE_USUARIO = document.getElementById("nombre");


let movieList = [];
let carrito = JSON.parse(sessionStorage.getItem("carrito_pelicula")) || [];


// Filtrar peliculas 
function filters() {

    let list = movieList; // Lista de filtro

    // Filtro por edad
    const age = parseInt(AGE_FILTER.value);
    if (age !== -1) {
        list = list.filter(m => {
            if (age === 0) return m.clasificacion === "ATP";
            if (age === 1) return m.clasificacion === "+13";
            if (age === 2) return m.clasificacion === "+16";
            if (age === 3) return m.clasificacion === "+18";
        });
    }

    // Filtro por categoría/genero
    const cat = CAT_FILTER.value.toLowerCase();
    if (cat !== "all") {
        list = list.filter(m => m.categoria.toLowerCase() === cat);
    }

    setMovies(list);
}

// Display de peliculas en la lista
function setMovies(array){
    let temp_append= "";
    array.forEach(e => {
        temp_append += `<div id="movie-${e.id}" class="container-producto" style="cursor: pointer;">

                <div class="card-producto">

                    <div class="prod-img-container">
                        <div class="clasificacion-edad">
                            <strong>${e.clasificacion}</strong>
                        </div>
                        <div class="movie-time">
                            <span>${e.duracion}Min</span>
                        </div>
                        <img src="../src/img/peliculas/${e.imagen}" alt="${e.titulo}" class="imagen-prod"> 
                    </div>

                    <div class="prod-text">
                        <h3 class="movie-title">${e.titulo.toUpperCase()}</h3>
                        <p>${e.tags.split(',').join(' - ')}</p>                    </div>
                </div>

            </div>
        `;
        SECTION_MOVIES.innerHTML = temp_append;     


    });
} 



// Funcionalidad de barra de busqueda, funciona solo con nombres, no categoria/clasificación.
SEARCH_BAR.addEventListener("keyup", e  =>{
    let inputValue = SEARCH_BAR.value.toUpperCase();

    let filtered = movieList.filter(
        m => m.titulo.toUpperCase().includes(inputValue)
    );

    setMovies(filtered);
});

// Detecta cambio en las opciones de select
AGE_FILTER.addEventListener("change", filters);
CAT_FILTER.addEventListener("change", filters); 

function addToCart(movie,ticket){
    
    if(carrito.some((m) => m.id === movie.id)){
        console.error("Already in cart")
        alert("La entrada ya está en el carrito")
        return;
    }
    
    movie.entrada = ticket;
    movie.cantidad = 1;

    carrito.push(movie);
    sessionStorage.setItem("carrito_pelicula", JSON.stringify(carrito));

    location.href="./carrito.html"

}

function movieEvents(){

    movieList.forEach((movie) => {

        const MOVIE = document.getElementById(`movie-${movie.id}`);

        MOVIE.addEventListener("click", (event) => {
            
            event.stopPropagation();

            sessionStorage.setItem("movie", JSON.stringify(movie));
            location.href = "pelicula.html";

        });

    });

}

function verificar_nombre(){

    let nombre = sessionStorage.getItem("nombre");

    if(!nombre){
        location.href = "../index.html";
    }

    NOMBRE_USUARIO.innerHTML = "Hola, " + nombre;

}


async function init(){
    verificar_nombre();
    movieList = await getMovies();
    setMovies(movieList);
    movieEvents();
}

init();