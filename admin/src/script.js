let url= "http://localhost:3000"

const SECTION_MOVIES = document.getElementById("lista")


async function test () {
    let test = await fetch(`${url}/movies`); 
    let data = await test.json();
    console.log(data.payload);
}

test()

function showMovies(array) {
    let htmlElement = "";

    array.forEach(movie => {
        htmlElement +=`
            <li class="movie-card">
                <img src="../src/logo.png" alt="${movie.imagen}" height="50" width="50">
                <h3>${movie.titulo}</h3>
                <p>${movie.sinopsis}</p>
                <p>${movie.genero}</p>
                <p>${movie.duracion}</p>
                <p>${movie.calsificacio}</p>
            </li>
        `
    });

    SECTION_MOVIES.innerHTML = htmlElement;

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

