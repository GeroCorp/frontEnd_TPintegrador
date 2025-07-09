let url = "http://localhost:3000";
let detail_button = document.querySelector("button");
let hide_button = document.querySelector("ocultarBTN");
const LISTADO = document.getElementById("listado");


function showMovies(array) {
    let htmlElement = "";

    array.forEach(movie => {
        htmlElement +=`
            <div class="card">
                    <div class="card-image">
                        <img src="../../cliente/src/img/${movie.imagen}" alt="Placeholder Image" class="card-image">
                    </div>

                    <div class="card-content">
                        <h3>${movie.titulo.toUpperCase()}</h3>
                        <div class="detalles">
                        <p>ID: ${movie.id}</p>
                        <p>Categoria: ${movie.categoria}</p>
                        <p>Duración: ${movie.duracion} horas</p>
                        <p>Clasificacion: ${movie.clasificacion}</p>
                        <p>Tags: ${movie.tags.split(',').join(' - ')}</p>
                    </div>
                    </div>
                    
                    <button class="detallesBTN" onclick="showDetails(this)">Ver Detalles</button>
                    <button class="ocultarBTN" onclick="hideDetails(this)">Ocultar Detalles</button>
                </div>
        `
    });

    LISTADO.innerHTML = htmlElement;

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
}

init()