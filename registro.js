const nombre = document.getElementById("nombre")
const password = document.getElementById("password")
const email = document.getElementById("email")
const form = document.getElementById("form")
const parrafo = document.getElementById("peligro")

form.addEventListener("submit", e=>{
e.preventDefault()
let entrar = false
let peligro = ""
let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
parrafo.innerHTML= ""
if(nombre.value.length <6){
    alert("Nombre invalido")
    entrar= true
}
if(!regexEmail.test(email.value)){
    alert("Email no valido")
    entrar= true
}
if(password.value.length <8){
    alert("Clave invalida")
    entrar= true
}
if(entrar){
    parrafo.innerHTML = peligro
} else {
    parrafo.innerHTML = "Enviado"
}
})
