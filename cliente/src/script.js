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
const CAT_FILTER = document.getElementById("genre-filter")
const NOMBRE_USUARIO = document.getElementById("nombre");

const BTN_COLECCIONABLES = document.getElementById("coleccionables-button");
const BTN_CARRITO = document.getElementById("carrito-button");

let movieList = [];
let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

console.log("Selectores cargados:", AGE_FILTER, CAT_FILTER);


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
        temp_append += `<a id="movie-${e.id}" href="#" class="container-producto">

                <div class="card-producto">

                    <div class="prod-img-container">
                        <div class="clasificacion-edad">
                            <strong>${e.clasificacion}</strong>
                        </div>
                        <div class="movie-time">
                            <span>${e.duracion}H</span>
                        </div>
                        <img src="${e.imagen}" alt="${e.titulo}" class="imagen-prod">
                    </div>

                    <div class="prod-text">
                        <h3 class="movie-title">${e.titulo.toUpperCase()}</h3>
                        <p>${e.tags.split(',').join(' - ')}</p>
                        </div><button id=boton-${e.id} class="boton-añadir">Añadir</button></div>
                    </div>
                </div>

            </a>
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
})

// Detectar click en filtro para llamar la función
AGE_FILTER.addEventListener("change", filters)
CAT_FILTER.addEventListener("change", filters) 

BTN_CARRITO.addEventListener("click", () => {

    location.href = "pages/carrito.html";

});

BTN_COLECCIONABLES.addEventListener("click", () => {

    location.href = "pages/coleccionables.html";

});

function addToCart(id){

    if(carrito.some((m) => m.id === id)){
        return;
    }

    movie = movieList.find((movie) => movie.id === id);
    movie.cantidad = 1;

    carrito.push(movie);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);

}

function buttonEvents(){

    movieList.forEach((movie) => {
        const button = document.getElementById(`boton-${movie.id}`);

        button.addEventListener("click", (event) => {

            event.stopPropagation();
            addToCart(movie.id);
        });

    });

}

function movieEvents(){

    movieList.forEach((movie) => {

        const MOVIE = document.getElementById(`movie-${movie.id}`);

        MOVIE.addEventListener("click", (event) => {
            
            event.stopPropagation();

            sessionStorage.setItem("movie", JSON.stringify(movie));
            location.href = "pages/pelicula.html";

        });

    });

}

function verificar_nombre(){

    let nombre = sessionStorage.getItem("nombre");

    if(!nombre){
        location.href = "index.html";
    }

    NOMBRE_USUARIO.innerHTML = "Hola, " + nombre;

}


async function init(){
    verificar_nombre();
    movieList = await getMovies();
    setMovies(movieList);
    buttonEvents();
    movieEvents();
}

init();