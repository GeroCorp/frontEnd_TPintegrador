///////////////////////////
// Variables Globales ////

const SECTION_PELICULAS = document.getElementById("section-peliculas");
const RUTA = "http://localhost:3000/"
let carrito = [];


/////////////////////////////////////
// Recuperar el carrito si existe //


if(sessionStorage.getItem("carrito")){

    carrito = JSON.parse(sessionStorage.getItem("carrito"));
    console.log(carrito);

}


/////////////////////////////////////////////////////////////////////////////////////////////
// Funcion que envia una peticion para obtener las peliculas en cartelera y renderizarlas //


async function obtener_peliculas(){

    try{

        let peliculas = await fetch(`${RUTA}peliculas`);
        let datos = await peliculas.json();
        mostrar_peliculas(datos.payload)

    } catch(error){

        console.log(error);

    }

}


///////////////////////////////////////////////////
// Funcion para agregar una pelicula al carrito //


async function agregar_pelicula(id){

    if(carrito.some((pelicula) => pelicula.pelicula_id === id)){
        return
    }


    try{


        let pelicula = await fetch(`${RUTA}peliculas/${id}`);
        pelicula = await pelicula.json();
        pelicula = pelicula.payload;
        pelicula[0].cantidad = 1;
        carrito.push(pelicula[0]);
        console.log(carrito);
        sessionStorage.setItem("carrito", JSON.stringify(carrito));

        document.getElementById(`boton-${id}`).innerHTML = "En el carrito";
            
        
    }catch(error){
        console.log(error);
    }
}


/////////////////////////////////////////////////////
// Funcion para renderizar las peliculas enviadas //


function mostrar_peliculas(peliculas){

    let elemento_html= "";

    
    for(let i=0; i<peliculas.length; i++){

        elemento_html += `<a href="#" class="container-producto">

                <div class="card-producto">

                    <div class="prod-img-container">
                        <div class="clasificacion-edad">
                            <strong>${peliculas[i].clasificacion_edad}</strong>
                        </div>
                        <div class="movie-time">
                            <span>${"2 HS"}</span>
                        </div>
                        <img src="${peliculas[i].url_imagen}" alt="${peliculas[i].titulo}" class="imagen-prod">
                    </div>

                    <div class="prod-text">
                        <h3 class="movie-title">${peliculas[i].titulo.toUpperCase()}</h3>
                        <p>${"tags"}</p>
                    </div>

                </div>

            </a>
        `;
    }

    SECTION_PELICULAS.innerHTML = elemento_html;

    cambiar_texto_boton();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
// Funcion para cambiar el texto de añadir al carrito del boton si el producto ya esta en el carrito //


function cambiar_texto_boton(){

    for(let i=0; i<carrito.length; i++){

        console.log(carrito[i]);
        document.getElementById(`boton-${carrito[i].pelicula_id}`).innerHTML = "En el carrito";

    }

}


////////////////////////
// Funcion de inicio //


function init(){

    obtener_peliculas();

}


//////////////
// Iniciar //


init();


