//Las categorias de las edades son ATP: 0, +13: 1, +16: 2, +18: 3
rate = ["ATP","+13","+16","+18"]

//Lista para probar funcionamiento
movies = [
    {
        titulo: "Como entrenar a tu dragon",
        genre: ["accion","comedia","fantasia"],
        tags:["3d","4d","e-motion"],
        age_rate: rate[0],
        time: "2H 20M",
        img_url: "HO00010345.jpg"
    },
    {
        titulo: "Guerreras kpop",
        genre: ["accion","comedia"],
        tags: ["2d","3d","e-motion"],
        age_rate:rate[0],
        time: "2H 40M",
        img_url: "kpop.jpg"
    },
    {
        titulo: "Metegol",
        genre: ["accion","comedia"],
        tags: ["2d","3d","e-motion"],
        age_rate:rate[3],
        time: "2H 40M",
        img_url: "gol.webp"
    },
    {
        titulo: "la la land",
        genre: ["accion","comedia"],
        tags: ["2d","3d","e-motion"],
        age_rate:rate[2],
        time: "2H 40M",
        img_url: "lala.jpg"
    },
    {
        titulo: "harry",
        genre: ["accion","comedia"],
        tags: ["2d","3d","e-motion"],
        age_rate:rate[1],
        time: "2H 40M",
        img_url: "harry.jpg"
    },
    {
        titulo: "Karoo the movie: live action 2",
        genre: ["accion","comedia"],
        tags: ["2d","3d","e-motion"],
        age_rate:rate[3],
        time: "2H 40M",
        img_url: "kaure.webp"
    }
]

const SECTION_MOVIES = document.getElementById("section-productos");
const SEARCH_BAR = document.getElementById("search-input")
const AGE_FILTER = document.getElementById("age-filter")

function filterMovies (type){
    let newList = [];

    console.log(AGE_FILTER.value);

    switch (parseInt(AGE_FILTER.value)) {
        case -1:
            newList = movies;
            break;
        case 0:
            newList = movies.filter(
                m => m.age_rate == rate[0]
            )
            break;
        case 1:
            newList = movies.filter(
                m => m.age_rate == rate[1]
            )
            break;
        case 2:
            newList = movies.filter(
                m => m.age_rate == rate[2]
            )
            break;
    
        case 3:
            newList = movies.filter(
                m => m.age_rate == rate[3]
            )
            break;

    }
    setMovies(newList)
}

function setMovies(array){
    let temp_append= "";
    array.forEach(e => {
        temp_append += `<a href="#" class="container-producto">

                <div class="card-producto">

                    <div class="prod-img-container">
                        <div class="clasificacion-edad">
                            <strong>${e.age_rate}</strong>
                        </div>
                        <div class="movie-time">
                            <span>${e.time}</span>
                        </div>
                        <img src="./src/img/${e.img_url}" alt="${e.titulo}" class="imagen-prod">
                    </div>

                    <div class="prod-text">
                        <h3 class="movie-title">${e.titulo.toUpperCase()}</h3>
                        <p>${e.tags.join(' · ').toUpperCase()}</p>
                    </div>

                </div>

            </a>
        `
        SECTION_MOVIES.innerHTML = temp_append;


    });
} 

SEARCH_BAR.addEventListener("keyup", e  =>{
    let inputValue = SEARCH_BAR.value.toUpperCase()

    let filtered = movies.filter(
        m => m.titulo.toUpperCase().includes(inputValue)
    );

    setMovies(filtered);
})

AGE_FILTER.addEventListener("click", e =>{
    
    filterMovies(e)

})

function init(){
    setMovies(movies)
}

init()
console.log("hola mundo");