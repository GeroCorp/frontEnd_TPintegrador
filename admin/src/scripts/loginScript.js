let url = "http://localhost:3000/admins/";

const form = document.getElementById("logIn-form");
const errorMSG = document.getElementById("error-msg");
let adminAccounts = ""

async function getAccounts(){

    try {
        
        let res = await fetch(url)

        let data = await res.json();

        return data.payload;

    } catch (error) {
        console.error(error);
    }

}


form.addEventListener("submit", e =>{
    e.preventDefault();

    const data = new FormData(form);

    const user = data.get("username");
    const password = data.get("password");

    sessionStorage.setItem("admin", user);


    if (validateAccount(user,password)) form.submit();


})

function validateAccount (user,pass){

    const valid = adminAccounts.some(account =>
        user === account.username && pass === account.password
    );

    if (!valid) {
        errorMSG.style.display = "block";
        return false;
    }

    return true;

}



async function init(){
    adminAccounts = await getAccounts()
    console.log(adminAccounts);
}

init()