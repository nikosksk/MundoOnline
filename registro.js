const nombre = document.getElementById("nombre")
const password = document.getElementById("password")
const email = document.getElementById("email")
const form = document.getElementById("formulario")

if(window.localStorage.getItem("datosUsuario")){ 
    window.location.href="/index.html"
} else {
form.addEventListener("submit", (e)=>{
e.preventDefault()
const user = {
    nombre: e.target[0].value,
    apellido: e.target[1].value,
    clave: e.target[2].value,
    email: e.target[3].value
};
window.localStorage.setItem("datosUsuario", JSON.stringify(user))


console.log(e)
let entrar = false
let peligro = ""
let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
if(nombre.value.length <6){
    alert("Nombre invalido")
    entrar= true
}
if(!regexEmail.test(email.value)){
    alert("Email no valido")
    entrar= true
}
// if(password.value.length <8){
//     alert("Clave invalida")
//     entrar= true
// }
window.location.href="/index.html";
})
}