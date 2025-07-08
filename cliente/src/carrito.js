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

                    <div><button id="boton-menos-${prod.id}" class="boton-cantidad">-</button></div>  
                    <p id="cant-prod-${prod.id}">${prod.cantidad}</p>
                    <div><button id="boton-mas-${prod.id}" class="boton-cantidad">+</button></div>
                    
                </div>

                <div><p>Precio: <span id="precio-producto-1">$2000</span></p></div>

            </div>`;

    });

    html += `<div class="linea-carrito"></div>

            <div class="total-container"><p>Total: <span>$4000</span></p></div>`;

    SECTION_CARRITO.innerHTML = html;

}

function evento_boton_cantidad(){

    for(let i=0; i<carrito.length; i++){

    const BOTON_MAS = document.getElementById(`boton-mas-${carrito[i].id}`);
    const BOTON_MENOS = document.getElementById(`boton-menos-${carrito[i].id}`);
    const TXT_CANT = document.getElementById(`cant-prod-${carrito[i].id}`);

    BOTON_MAS.addEventListener("click", () => {
        carrito[i].cantidad += 1;
        TXT_CANT.innerHTML = carrito[i].cantidad;
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    })

    BOTON_MENOS.addEventListener("click", () => {
        carrito[i].cantidad -= 1;

        if(carrito[i].cantidad <= 0){

            carrito.splice(i, 1);
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
            mostrar_carrito();
            return;
        }


        TXT_CANT.innerHTML = carrito[i].cantidad;
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    })

    }

}

function init(){
    verificar_nombre();
    mostrar_carrito();
    evento_boton_cantidad();
}

init();