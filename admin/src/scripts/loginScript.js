const form = document.getElementById("logIn-form");
const errorMSG = document.getElementById("error-msg");


form.addEventListener("submit", e =>{
    e.preventDefault();

    const data = new FormData(form);

    const user = data.get("username");
    const password = data.get("password");

    sessionStorage.setItem("admin", user);

    console.log(`${user}\n${password}`)

    if (validateAccount(user,password)) form.submit();


})

function validateAccount (user,password){
    if (!(user == "admin") && !(password == "pass")){
        errorMSG.style.display = "block";
        return false;
    }
    return true;
}