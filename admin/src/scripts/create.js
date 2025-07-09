let url= "http://localhost:3000"

const MOVIE_FORM = document.getElementById("form-movie");
const COLECT_FORM = document.getElementById("form-coleciconable");

MOVIE_FORM.addEventListener("submit", e =>{
    e.preventDefault();

    let data = new FormData(MOVIE_FORM);

    let pelicula = Object.fromEntries(data.entries())



    console.log(pelicula);

    createMovie(pelicula)

})


async function createMovie(movie) {
    
    try{

        const res = await fetch(`${url}/movies/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: movie.titulo, 
                genero: movie.categoria, 
                duracion: parseInt(movie.duracion), 
                sinopsis: movie.sinopsis, 
                imagen: movie.imagen,
                tags: movie.tags,
                clasificacion: movie.clasificacion

            })
        }) 

        const result = await res.json();
        console.log(result.message + "\n" + result.movieId);

    }catch (e) {
        console.error("Error al crear la pelicula", e);
        
    }
}