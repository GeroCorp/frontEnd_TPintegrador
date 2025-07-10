const DELETE_MOVIE = document.getElementById("delMovie");
const DELETE_COLLECTIBLE = document.getElementById("delCollect")


DELETE_MOVIE.addEventListener("click", e=>{

    const DATA = new FormData(movieForm);


    let id = parseInt(DATA.get("ID"))

    deleteMovie(id)

})
DELETE_COLLECTIBLE.addEventListener("click", e =>{
    const DATA = new FormData(collectForm);

    let id = parseInt(DATA.get("ID"));

    deleteCollectible(id)
}
)

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
            DELETE_MOVIE.style.display="none";
        }else{
            console.error("Error: ", result.message);
            alert("No se pudo eliminar el producto")
        }


    } catch (error) {
        console.error("Error en la solicitud DELETE", error);
        alert("Ocurrio un error al eliminar una pelicula")
    }

}


async function deleteCollectible(id){

    try 
    {

        let res = await fetch(`${url}collectibles/${id}`, {
            method: "DELETE"
        });

        let result = await res.json();

        if(res.ok) {
            alert(result.message);
            collectRes.innerHTML= "";
            DELETE_COLLECTIBLE.style.display="none";
        }else{
            console.error("Error: ", result.message);
            alert("No se pudo eliminar el producto")
        }


    } catch (error) {
        console.error("Error en la solicitud DELETE", error);
        alert("Ocurrio un error al eliminar un producto")
    }

}