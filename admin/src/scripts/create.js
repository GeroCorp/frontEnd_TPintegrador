let url= "http://localhost:3000"

const MOVIE_FORM = document.getElementById("form-movie");
const COLLECT_FORM = document.getElementById("form-coleccionable");

MOVIE_FORM.addEventListener("submit", e =>{
    e.preventDefault();

    let data = new FormData(MOVIE_FORM);

    let pelicula = Object.fromEntries(data.entries())



    console.log(pelicula);

    createMovie(pelicula)

})

COLLECT_FORM.addEventListener("submit", e =>{
    e.preventDefault();

    let data = new FormData(COLLECT_FORM);

    let collectible = Object.fromEntries(data.entries())


    console.log(collectible);

    createCollectible(collectible)

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
                clasificacion: movie.clasificacion,
                precio: movie.precio

            })
        }) 

        const result = await res.json();
        console.log(result.message + "\n" + result.movieId);

        alert("Pelicula agregada")

    }catch (e) {
        console.error("Error al crear la pelicula", e);
        
    }
}

async function createCollectible(collectible) {
    
    try{

        const res = await fetch(`${url}/collectibles/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: collectible.nombre, 
                image: collectible.imagen, 
                desc: collectible.descripcion, 
                price: collectible.precio

            })
        }) 

        const result = await res.json();
        console.log(result.message + "\n" + result.productId);
        alert("Producto agregado")


    }catch (e) {
        console.error("Error al crear la pelicula", e);
        
    }
}