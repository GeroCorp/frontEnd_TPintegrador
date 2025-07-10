let url = "http://localhost:3000";
let detail_button = document.querySelector("button");
let hide_button = document.querySelector("ocultarBTN");
const LISTADO_PELICULAS = document.getElementById("listado-peliculas");
const LISTADO_COLECCIONABLES = document.getElementById("listado-coleccionables");


function showMovies(array) {
    let htmlElement = "";

    array.forEach(movie => {
        htmlElement +=`
            <div class="card">
                    <div class="card-image">
                        <img src="../../cliente/src/img/peliculas/${movie.imagen}" alt="Placeholder Image" class="card-image">
                    </div>

                    <div class="card-content">
                        <h3>${movie.titulo.toUpperCase()}</h3>
                        <div class="detalles">
                        <p>ID: ${movie.id}</p>
                        <p>Categoria: ${movie.categoria}</p>
                        <p>Duración: ${movie.duracion} horas</p>
                        <p>Clasificacion: ${movie.clasificacion}</p>
                        <p>Tags: ${movie.tags.split(',').join(' - ')}</p>
                        <p>Precio: $${movie.precio}</p>
                    </div>
                    </div>
                    
                    <button class="detallesBTN" onclick="showDetails(this)">Ver Detalles</button>
                    <button class="ocultarBTN" onclick="hideDetails(this)">Ocultar Detalles</button>
                </div>
        `
    });

    LISTADO_PELICULAS.innerHTML = htmlElement;

}

function showCollectibles(array) {
    let htmlElement = "";

    array.forEach(collect => {
        
        htmlElement +=`
            <div class="card">
                    <div class="card-image">
                        <img src="${collect.imagen}" alt="Placeholder Image" class="card-image">
                    </div>

                    <div class="card-content">
                        <h3>${collect.nombre.toUpperCase()}</h3>
                        <div class="detalles">
                        <p>ID: ${collect.id}</p>
                        <p>Descripción: ${collect.descripcion}</p>
                        <p>Precio: $${collect.precio}</p>
                    </div>
                    </div>
                    
                    <button class="detallesBTN" onclick="showDetails(this)">Ver Detalles</button>
                    <button class="ocultarBTN" onclick="hideDetails(this)">Ocultar Detalles</button>
                </div>
        `
    });

    LISTADO_COLECCIONABLES.innerHTML = htmlElement;

}

async function getMovies() {
    try{

        let peliculas = await fetch(`${url}/movies`);

        let datos = await peliculas.json();

        showMovies(datos.payload)

    } catch(error){

        console.error(error);

    }
}

async function getCollectibles() {
    try {
        
        let coleccionables = await fetch(`${url}/collectibles`)

        let datos = await coleccionables.json();


        showCollectibles(datos.payload)

    } catch (error) {
        console.error(error);
        
    }
}

function showDetails (obj){
    const card = obj.closest(".card")
    const detalles = card.querySelector(".detalles")
    const hideBtn = card.querySelector(".ocultarBTN")

    detalles.style.display = "block";
    obj.style.display = "none";
    hideBtn.style.display = "inline";

}

function hideDetails(obj){
    const card = obj.closest(".card")
    const detalles = card.querySelector(".detalles")
    const showBtn = card.querySelector(".detallesBTN")

    detalles.style.display = "none";
    obj.style.display = "none";
    showBtn.style.display = "inline";

}

function init(){
    getMovies();
    getCollectibles();
}

init()