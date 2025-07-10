const url = "http://localhost:3000/";

const search_movieForm = document.getElementById("update-movie");
const res_movieForm = document.getElementById("update-movie-result")

search_movieForm.addEventListener("submit", e =>{
    e.preventDefault();


    try{
    const DATA = new FormData(e.target);

    let id = parseInt(DATA.get("ID"));

    if(!id){
        throw new Error("Ingresar un id valido")
    }

    getItem(e,"movies", id)
    }catch(e){
        console.error(e);
        
    }
})

async function getItem(e,target,id){
    try {
        let res = await fetch(`${url}${target}/${id}`)

        if(!res.ok){
            console.error("Producto no encontrado");
                alert("Item no encontrado")
                return ;
        }

        const data = await res.json();

        if(!data.payload || data.payload.length=== 0){
            throw new Error("Producto no encontrado")
        }

        let item = data.payload[0];

        target === "movies" ? toUpdateMovie(e,item) : toUpdateCollectibles(e,item);

    } catch (error) {
        console.error(error);
        
    }
}

function toUpdateMovie(e, movie){

    e.stopPropagation();

    let htmlElement = `
        <div class="card-content">
            <form id="update-rows">
            <img id="card-img" src="../../cliente/src/img/peliculas/${movie.imagen}" alt="Pelicula Poster">
            
            <h3 id="card-id">ID:<input type="number" name="id" value="${movie.id}"required></p>
                <h2 id="card-title">Titulo: <input type="text" name="titulo" value="${movie.titulo}"> </h3>
                <p id="card-sinopsis">
                Sinopsis: 
                <input type="text" name="sinopsis" value="${movie.sinopsis}">
                </p>
                
                <p id="card-genre">Género: 
                    <select name="genero" id="" required>
                        <option value="Aventura" selected>Aventura</option>
                        <option value="Accion">Accion</option>
                        <option value="Comedia">Comedia</option>
                        <option value="Terror">Terror</option>
                    </select>
                </p>

                <p id="card-date">Tags: <input type="text" name="tags" value="${movie.tags}"></p>
                <p id="card-duration">Duración: <input type="number" name="duracion" value="${movie.duracion}"min="1"></p>
                
                <p id="card-classification">Clasificación: 
                    <select name="clasificacion" id="">
                    <option value="ATP" selected>ATP</option>
                    <option value="+13">+13</option>
                    <option value="+16">+16</option>
                    <option value="+18">+18</option>
                    </select>
                </p>

                <p id="card-image">Imagen: <input type="text" name="imagen" value="${movie.imagen}"></p>
                <button class="updateBtn" id="update-movie-btn">Actualizar</button>
            </form>

        </div>
    `
    res_movieForm.innerHTML = htmlElement;
    const update_movieForm = document.getElementById("update-rows")

    update_movieForm.addEventListener("submit", e =>{
        setUpdateMovie(e,movie.id)
        console.log("object");
    })

}

async function setUpdateMovie (event,id){

    event.preventDefault();
    console.log(id);

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries())

    try {
        let res = await fetch(`${url}movies/${id}`,{
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

            res_movieForm.innerHTML = "";
        }else{
            let err = await res.json();
            console.error(err);
            
        }
    } catch (error) {
        console.error(error);
        alert("Error al procesar solicitud");
        
    }
}