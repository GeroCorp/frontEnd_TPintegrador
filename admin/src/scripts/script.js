

const SECTION_MOVIES = document.getElementById("lista")
const ADMIN_USER = document.getElementById("admin-user")


function nameSet(){
    let user = sessionStorage.getItem("admin")
    ADMIN_USER.innerHTML = `Bienvenido ${user}`;
}

function init(){
    nameSet()
}

init()