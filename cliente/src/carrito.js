const BTN_CARTELERA = document.getElementById("movies-button");
const NOMBRE_USUARIO = document.getElementById("nombre")
const SECTION_CARRITO = document.getElementById("carrito-container");

let carrito = JSON.parse(sessionStorage.getItem("carrito"));

BTN_CARTELERA.addEventListener("click", () => {
    location.href = "../main.html";
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

    carrito.forEach((prod) => {

        html += `<div class="card-carrito">

                <div><img src="${prod.imagen}" alt="${prod.titulo}" class="img-carrito"></div>

                <div class="detalles-container">

                    <h3>${prod.titulo}</h3>
                    <p>Sala: 2D</p>

                </div>

                <div class="cantidad-container">

                    <div><button class="boton-cantidad">-</button></div>  
                    <p>1</p>
                    <div><button class="boton-cantidad">+</button></div>
                    
                </div>

                <div><p>Precio: <span id="precio-producto-1">$2000</span></p></div>

            </div>`;

    });

    html += `<div class="linea-carrito"></div>

            <div class="total-container"><p>Total: <span>$4000</span></p></div>`;

    SECTION_CARRITO.innerHTML = html;

}

function init(){
    verificar_nombre();
    mostrar_carrito();
}

init();