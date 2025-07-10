
const SEARCH_BAR = document.getElementById("search-input");
const SECTION_PRODUCTOS = document.getElementById("section-productos");
const url = "http://localhost:3000";

let carrito = JSON.parse(sessionStorage.getItem("carrito_coleccionable")) || [];
let coleccionables = [];

SEARCH_BAR.addEventListener("keyup", e  =>{
    let inputValue = SEARCH_BAR.value.toUpperCase();

    let filtered = coleccionables.filter(
        c => c.nombre.toUpperCase().includes(inputValue)
    );

    mostrar_coleccionables(filtered);
});

async function cargar_coleccionables(){

    try{

        let peticion = await fetch(`${url}/collectibles`);
        let datos = await peticion.json();
        return datos.payload;

    }catch(error){
        console.log(error);
    }
}

function verificar_nombre(){

    let nombre = sessionStorage.getItem("nombre");

    if(!nombre){
        location.href = "../index.html";
    }

    //NOMBRE_USUARIO.innerHTML = "Hola, " + nombre;

}


function mostrar_coleccionables(coleccionables){

    let html = "";

    coleccionables.forEach((c) => {

        html += `<div class="container-producto">

                <div class="card-producto">
    
                    <div class="prod-img-container"><img class="imagen-prod" src="${c.imagen}" alt="${c.titulo}"></div>
    
                    <div class="prod-text">
    
                        <h3 class="movie-title">${c.nombre}</h3>
    
                        <p>${c.descripcion}</p>
    
                        <p>Precio: ${c.precio}$</p>
    
                    </div>
    
                    <div><button id=boton-${c.id} class="boton-añadir">Añadir</button></div>
    
                </div>
                </div>`;
   });
   
   SECTION_PRODUCTOS.innerHTML = html;

}

function addToCart(id){

    if(carrito.some((c) => c.id === id)){
        return;
    }

    coleccionable = coleccionables.find((coleccionable) => coleccionable.id === id);
    coleccionable.cantidad = 1;

    carrito.push(coleccionable);
    sessionStorage.setItem("carrito_coleccionable", JSON.stringify(carrito));
    console.log(carrito);

}

function buttonEvents(){

    coleccionables.forEach((c) => {
        const button = document.getElementById(`boton-${c.id}`);

        button.addEventListener("click", () => {

            addToCart(c.id);
        });

    });

}

async function init(){
    verificar_nombre();
    coleccionables = await cargar_coleccionables();
    mostrar_coleccionables(coleccionables);
    buttonEvents();
}

init();