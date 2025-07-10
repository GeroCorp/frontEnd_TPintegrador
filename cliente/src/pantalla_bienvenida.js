const INPUT_NOMBRE = document.getElementById("input-nombre");
const BOTON_CONFIRMAR = document.getElementById("boton-confirmar-nombre");


function continuar_pantalla_principal(){

    if(!INPUT_NOMBRE.value){
        alert("Ingrese su nombre");
        return;
    }

    sessionStorage.setItem("nombre", INPUT_NOMBRE.value);
    location.href = "pages/cartelera.html";
}

BOTON_CONFIRMAR.addEventListener("click", continuar_pantalla_principal);