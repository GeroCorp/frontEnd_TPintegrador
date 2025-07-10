const url = "http://localhost:3000/"
const movieForm = document.getElementById("get-movie");
const collectForm = document.getElementById("get-collect");
const movieRes = document.getElementById("get-movie-result");
const collectRes = document.getElementById("get-collect-result");



movieForm.addEventListener("submit", e=>{
    e.preventDefault();

    const DATA = new FormData(movieForm);


    let id = parseInt(DATA.get("ID"))

    getByID("movies",id)


})


collectForm.addEventListener("submit", e=>{
    e.preventDefault();

    const DATA = new FormData(collectForm);


    let id = parseInt(DATA.get("ID"))

    getByID("collectibles",id)


})

async function getByID(target,id){

    try{
        
        let res = await fetch(`${url}${target}/${id}`)

        if(!res.ok){
            console.error("Producto no encontrado");
            alert("Item no encontrado")
            return ;
        }

        const data = await res.json();

        let item = data.payload[0];

        target == "movies" ? showMovieRes(item) : showCollectRes(item)

    }catch(e){
        console.error(e);
        
    }


}

function showMovieRes(movie){

    if (!movie || !movie.id) {
        movieRes.innerHTML = "<h3>Película no encontrada</h3>";
        DELETE_MOVIE.style.display = "none";

        return;
    }

    let htmlElemment = `
        <div class="card">
            <img id="card-img" src="../../cliente/src/img/peliculas/${movie.imagen}" alt="Pelicula Poster">
            <div class="card-content">
                <h3 id="card-title">Titulo: ${movie.titulo}</h3>
                <p>ID: ${movie.id}</p>
                <p>Sinopsis: ${movie.sinopsis}</p>
                <p>Genero: ${movie.categoria}</p>
                <p>Tags: ${movie.tags}</p>
                <p>Clasificacion: ${movie.clasificacion}</p>
                <p>Precio: $${movie.precio}</p>
            </div>
        </div>
                    `

    movieRes.innerHTML = htmlElemment;
    DELETE_MOVIE.style.display = "block";

}

function showCollectRes(collect){


    if (!collect || !collect.id) {
        collectRes.innerHTML = "<h3>Producto no encontrado</h3>";
        DELETE_COLLECTIBLE.style.display = "none";
        return;
    }

    let htmlElemment = `
        <div class="card">
            <img id="card-img" src="${collect.imagen}" alt="Imagen Producto">
            <div class="card-content">
                <h3 id="card-title">Nombre: ${collect.nombre}</h3>
                <p id="card-id">ID: ${collect.id}</p>
                <p id="card-sinopsis">Descripcion: ${collect.descripcion}</p>
                <p id="card-genre">Precio: $${collect.precio}</p>
            </div>
        </div>
                    `

    collectRes.innerHTML = htmlElemment;
    DELETE_COLLECTIBLE.style.display = "block";

}