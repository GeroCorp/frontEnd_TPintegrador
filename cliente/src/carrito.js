const BTN_CARTELERA = document.getElementById("movies-button");
const BTN_COLECCIONABLES = document.getElementById("coleccionables-button");
const NOMBRE_USUARIO = document.getElementById("nombre")
const SECTION_CARRITO = document.getElementById("carrito-container");
const CAPACIDAD_MAXIMA_SALA = 150;


let carrito_pelicula = JSON.parse(sessionStorage.getItem("carrito_pelicula")) || [];
let carrito_coleccionable = JSON.parse(sessionStorage.getItem("carrito_coleccionable")) || [];

BTN_CARTELERA.addEventListener("click", () => {
    location.href = "../main.html";
});

BTN_COLECCIONABLES.addEventListener("click", () => {
    location.href = "coleccionables.html";
});

function verificar_nombre(){

    let nombre = sessionStorage.getItem("nombre");

    if(!nombre){
        location.href = "../index.html";
    }

    NOMBRE_USUARIO.innerHTML = "Hola, " + nombre;

}

function mostrar_carrito(){

    let html = ""; 

    if(carrito_pelicula.length === 0 && carrito_coleccionable.length === 0){
        SECTION_CARRITO.innerHTML = "<h2>El carrito esta vacio</h2>";
        return;
    }

    carrito_pelicula.forEach((prod) => {

        html += `<div class="card-carrito">

                <div><img src="${prod.imagen}" alt="${prod.titulo.toUpperCase()}" class="img-carrito"></div>

                <div class="detalles-container">

                    <h3>${prod.titulo.toUpperCase()}</h3>
                    <p>Sala: 2D</p>

                </div>

                <div class="cantidad-container">

                    <div><button id="boton-menos-${prod.id}" class="boton-cantidad">-</button></div>  
                    <p id="cant-prod-${prod.id}">${prod.cantidad}</p>
                    <div><button id="boton-mas-${prod.id}" class="boton-cantidad">+</button></div>
                    
                </div>

                <div><p>Precio: <span id="precio-prod-${prod.id}">${prod.cantidad * prod.precio}$</span></p></div>

            </div>`;

    });

    carrito_coleccionable.forEach(c => {
        html += `<div class="card-carrito">

                <div><img src="${c.imagen}" alt="${c.nombre.toUpperCase()}" class="img-carrito"></div>

                <div class="detalles-container">

                    <h3>${c.nombre.toUpperCase()}</h3>
                    <p>Descripcion: ${c.descripcion}</p>

                </div>

                <div class="cantidad-container">

                    <div><button id="boton-menos-col-${c.id}" class="boton-cantidad">-</button></div>  
                    <p id="cant-col-${c.id}">${c.cantidad}</p>
                    <div><button id="boton-mas-col-${c.id}" class="boton-cantidad">+</button></div>
                    
                </div>

                <div><p>Precio: <span id="precio-col-${c.id}">${c.precio * c.cantidad}$</span></p></div>

            </div>`;
    });

    html += `<div class="linea-carrito"></div>

            <div id="precio-total" class="total-container"><p>Total: <span>${calcular_total()}$</span></p></div>`;

    SECTION_CARRITO.innerHTML = html;

}

function evento_boton_cantidad(){

    const PRECIO_TOTAL = document.getElementById("precio-total");

    //peliculas
    for(let i=0; i<carrito_pelicula.length; i++){

    const BOTON_MAS = document.getElementById(`boton-mas-${carrito_pelicula[i].id}`);
    const BOTON_MENOS = document.getElementById(`boton-menos-${carrito_pelicula[i].id}`);
    const TXT_CANT = document.getElementById(`cant-prod-${carrito_pelicula[i].id}`);
    const TXT_PRECIO = document.getElementById(`precio-prod-${carrito_pelicula[i].id}`);

    BOTON_MAS.addEventListener("click", () => {

        if(carrito_pelicula[i].cantidad >= CAPACIDAD_MAXIMA_SALA){
            return;
        }

        carrito_pelicula[i].cantidad += 1;
        TXT_CANT.innerHTML = carrito_pelicula[i].cantidad;
        TXT_PRECIO.innerHTML = carrito_pelicula[i].cantidad * carrito_pelicula[i].precio + "$";
        PRECIO_TOTAL.innerHTML = "Total: " + calcular_total() + "$";
        sessionStorage.setItem("carrito_pelicula", JSON.stringify(carrito_pelicula));
    })

    BOTON_MENOS.addEventListener("click", () => {
        carrito_pelicula[i].cantidad -= 1;

        if(carrito_pelicula[i].cantidad <= 0){

            carrito_pelicula.splice(i, 1);
            sessionStorage.setItem("carrito_pelicula", JSON.stringify(carrito_pelicula));
            mostrar_carrito();
            evento_boton_cantidad();
            return;
        }


        TXT_CANT.innerHTML = carrito_pelicula[i].cantidad;
        TXT_PRECIO.innerHTML = carrito_pelicula[i].cantidad * carrito_pelicula[i].precio + "$";
        PRECIO_TOTAL.innerHTML = "Total: " + calcular_total() + "$";
        sessionStorage.setItem("carrito_pelicula", JSON.stringify(carrito_pelicula));
    })

    }

    //coleccionables
    for(let i=0; i<carrito_coleccionable.length; i++){

    const BOTON_MAS = document.getElementById(`boton-mas-col-${carrito_coleccionable[i].id}`);
    const BOTON_MENOS = document.getElementById(`boton-menos-col-${carrito_coleccionable[i].id}`);
    const TXT_CANT = document.getElementById(`cant-col-${carrito_coleccionable[i].id}`);
    const TXT_PRECIO = document.getElementById(`precio-col-${carrito_coleccionable[i].id}`);

    BOTON_MAS.addEventListener("click", () => {

        if(carrito_coleccionable[i].cantidad >= CAPACIDAD_MAXIMA_SALA){
            return;
        }

        carrito_coleccionable[i].cantidad += 1;
        TXT_CANT.innerHTML = carrito_coleccionable[i].cantidad;
        TXT_PRECIO.innerHTML = carrito_coleccionable[i].precio * carrito_coleccionable[i].cantidad + "$";
        PRECIO_TOTAL.innerHTML = "Total: " + calcular_total() + "$";
        sessionStorage.setItem("carrito_coleccionable", JSON.stringify(carrito_coleccionable));
    })

    BOTON_MENOS.addEventListener("click", () => {
        carrito_coleccionable[i].cantidad -= 1;

        if(carrito_coleccionable[i].cantidad <= 0){

            carrito_coleccionable.splice(i, 1);
            sessionStorage.setItem("carrito_coleccionable", JSON.stringify(carrito_coleccionable));
            mostrar_carrito();
            evento_boton_cantidad();
            return;
        }


        TXT_CANT.innerHTML = carrito_coleccionable[i].cantidad;
        TXT_PRECIO.innerHTML = carrito_coleccionable[i].precio * carrito_coleccionable[i].cantidad  + "$";
        PRECIO_TOTAL.innerHTML = "Total: " + calcular_total() + "$";
        sessionStorage.setItem("carrito_coleccionable", JSON.stringify(carrito_coleccionable));
    })

    }

}

function calcular_total(){

    let total_pelicula = Array.isArray(carrito_pelicula) ? 
        carrito_pelicula.reduce((acum, p) => acum + (p.precio * p.cantidad), 0) : 0;

    let total_coleccionable = Array.isArray(carrito_coleccionable) ? 
        carrito_coleccionable.reduce((acum, c) => acum + (c.precio * c.cantidad), 0) : 0;

    return total_coleccionable + total_pelicula;

}

function init(){
    verificar_nombre();
    mostrar_carrito();
    evento_boton_cantidad();
}

init();