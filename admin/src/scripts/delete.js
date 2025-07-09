const DELETE_BUTTON = document.getElementById("delButton");


DELETE_BUTTON.addEventListener("click", e=>{

    const DATA = new FormData(movieForm);


    let id = parseInt(DATA.get("ID"))

    deleteMovie(id)

})


async function deleteMovie(id){

    try 
    {

        let res = await fetch(`${url}movies/${id}`, {
            method: "DELETE"
        });

        let result = await res.json();

        if(res.ok) {
            alert(result.message);
            movieRes.innerHTML= "";
            DELETE_BUTTON.style.display="none";
        }else{
            console.error("Error: ", result.message);
            alert("No se pudo eliminar el producto")
        }


    } catch (error) {
        console.error("Error en la solicitud DELETE", error);
        alert("Ocurrio un error al eliminar un producto")
    }

}