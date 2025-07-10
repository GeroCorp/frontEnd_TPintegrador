const search_collectForm = document.getElementById("update-collect")
const res_collectForm = document.getElementById("update-collect-result")

search_collectForm.addEventListener("submit", e =>{
    e.preventDefault();


    try{
    const DATA = new FormData(e.target);

    let id = parseInt(DATA.get("ID"));

    if(!id){
        throw new Error("Ingresar un id valido")
    }

    getItem(e,"collectibles", id)
    }catch(e){
        console.error(e);
        
    }
})

function toUpdateCollectibles(e, collect){

    e.stopPropagation();

    console.log(collect.id);

    let htmlElement = `
        <div class="card-content">
            <form id="update-collectFrom">
            <img id="card-img" src="${collect.imagen}" alt="Pelicula Poster">
            
            <h3 id="card-id">ID:<input type="number" name="id" value="${collect.id}"required></h3>
                <h2 id="card-title">Titulo: <input type="text" name="name" value="${collect.nombre}"> </h2>
                <p id="card-descripcion">
                Descripcion: 
                <input type="text" name="desc" value="${collect.descripcion}">
                </p>
                

                <p id="card-date">Precio: <input type="number" name="price" value="${collect.precio}"></p>
                
                <p id="card-image">Imagen: <input type="text" name="image" value="${collect.imagen}"></p>
                <button class="updateBtn" id="update-movie-btn">Actualizar</button>
            </form>

        </div>
    `
    res_collectForm.innerHTML = htmlElement;
    const update_CollectForm = document.getElementById("update-collectFrom")

    update_CollectForm.addEventListener("submit", e =>{
        setUpdateCollect(e,collect.id)
        console.log(collect);
    })

}

async function setUpdateCollect (event,id){

    event.preventDefault();
    console.log(id);

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries())
    

    try {
        let res = await fetch(`${url}collectibles/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        } );

        if(res.ok){
            console.log(res);
            let result = await res.json();
            console.log(result);
            alert(result.message);

            res_collectForm.innerHTML = "";
        }
    } catch (error) {
        console.error(error);
        alert("Error al procesar solicitud");
        
    }
}