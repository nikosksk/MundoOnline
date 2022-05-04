const productos = []
const cards = document.getElementById("cards")
const templateCard = document.getElementById("template-card").content
const fragment = document.createDocumentFragment()
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const items = document.getElementById("items")
const footer = document.getElementById("footer")
let carrito = {}

window.localStorage.setItem("productos", JSON.stringify(productos))
let item = JSON.parse(window.localStorage.getItem("productos")); 
console.log(item)

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        pintarCarrito()
    }
})
cards.addEventListener("click", e => {
    addCarrito(e)
})
items.addEventListener("click", e =>{
    btnAccion(e)
})
const fetchData = async() => {
    try{
        const response = await fetch("../../productos.json");
        const data = await response.json()
        pintarCards(data)
    } catch(error){
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        // console.log(data)
        templateCard.querySelector("h5").textContent = producto.tittle
        templateCard.querySelector("p").textContent = producto.price
        templateCard.querySelector("img").setAttribute("src", producto.imagen)
        templateCard.querySelector(".btn-dark").dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}
const addCarrito = e => {
    // console.log(e.target)
    // console.log(e.target.classList.contains("btn-dark"))
    if(e.target.classList.contains("btn-dark")) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}
const setCarrito = objeto =>{
    // console.log(objeto)
    const producto = {
        id: objeto.querySelector(".btn-dark").dataset.id,
        tittle: objeto.querySelector("h5").textContent,
        price: objeto.querySelector("p").textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()

}
const pintarCarrito = () => {
    // console.log(carrito)
    items.innerHTML=""
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector("th").textContent = producto.id
        templateCarrito.querySelectorAll("td")[0].textContent = producto.tittle
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id
        templateCarrito.querySelector("span").textContent =  producto.cantidad * producto.price
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)

    })
    items.appendChild(fragment)

    pintarFooter()

    window.localStorage.setItem("carrito", JSON.stringify(carrito))
}
const pintarFooter = () =>{
    footer.innerHTML=""
    if(Object.keys(carrito).length === 0){
        footer.innerHTML= "<th scope=`row` colspan=`5`></th>"
        return
    }
    
const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
const nPrice = Object.values(carrito).reduce((acc, {cantidad, price}) => acc + cantidad * price,0)

templateFooter.querySelectorAll("td")[0].textContent = nCantidad
templateFooter.querySelector("span").textContent = nPrice

const clone = templateFooter.cloneNode(true)
fragment.appendChild(clone)
footer.appendChild(fragment)

const btnVaciar = document.getElementById("vaciar-carrito")
btnVaciar.addEventListener("click", () => {
    carrito = {}
    pintarCarrito()
})
}

const btnAccion = e =>{
    if(e.target.classList.contains("btn-info")){
        carrito[e.target.dataset.id]

        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }
    if(e.target.classList.contains("btn-danger")){
        const producto = carrito[e.target.dataset.id]
        if(producto.cantidad <= 1){
            delete carrito[e.target.dataset.id]
        } else {
            producto.cantidad = carrito[e.target.dataset.id].cantidad - 1
        }
        pintarCarrito()
    
    }
    e.stopPropagation()
}


localStorage.setItem("formulario", "nombre", "apellido", "email")

console.log(localStorage.getItem("formulario"))