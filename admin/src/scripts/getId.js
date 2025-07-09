const url = "http://localhost:3000/"
const movieForm = document.getElementById("get-movie");
const collectForm = document.getElementById("get-collect");
const movieRes = document.getElementById("get-movie-result");
const collectRes = document.getElementById("get-collect-result");



movieForm.addEventListener("submit", e=>{
    e.preventDefault();

    const DATA = new FormData(movieForm);


    let id = parseInt(DATA.get("ID"))

    getByID(id)

    console.log(movieRes.childNodes);

})

async function getByID(id){

    try{
        
        let res = await fetch(`${url}movies/${id}`)

        const data = await res.json();

        movie = data.payload[0];

        showMovieRes(movie)

    }catch(e){
        console.error(e);
        
    }


}

function showMovieRes(movie){

    if (!movie || !movie.id) {
        movieRes.innerHTML = "<h3>Película no encontrada</h3>";
        DELETE_BUTTON.style.display = "none";

        return;
    }

    let htmlElemment = `
        <div class="card">
            <img id="card-img" src="${movie.titulo}" alt="Pelicula Poster">
            <div class="card-content">
                <h3 id="card-title">Titulo: ${movie.titulo}</h3>
                <p id="card-id">ID: ${movie.id}</p>
                <p id="card-sinopsis">Sinopsis: ${movie.sinopsis}</p>
                <p id="card-genre">Genero: ${movie.categoria}</p>
                <p id="card-tags">Tags: ${movie.tags}</p>
                <p id="card-clas">Clasificacion: ${movie.clasificacion}</p>
            </div>
        </div>
                    `

    movieRes.innerHTML = htmlElemment;
    DELETE_BUTTON.style.display = "block";

}