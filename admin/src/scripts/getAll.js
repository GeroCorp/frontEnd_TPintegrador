function showMovies(array) {
    let htmlElement = "";

    array.forEach(movie => {
        htmlElement +=`
            <li class="movie-card">
                <img src="../src/logo.png" alt="${movie.imagen}" height="50" width="50">
                <h3>${movie.titulo}</h3>
                <p>${movie.sinopsis}</p>
                <p>${movie.categoria}</p>
                <p>${movie.duracion}</p>
                <p>${movie.clasificacion}</p>
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
