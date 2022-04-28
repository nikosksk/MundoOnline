const prueba = [
    {
    "id": 1,
    "name": "item1",
    "tittle": "Play Station 5",
    "price": "700",
    "imagen": "https://laverdadnoticias.com/__export/1600624173295/sites/laverdad/img/2020/09/20/ps5_lanzamiento.jpg_1834093470.jpg"
},{
    "id": 2,
    "name": "item2",
    "tittle": "Xbox Series X",
    "price": "400",
    "imagen": "https://th.bing.com/th/id/R.bac485b1bb3d1569e28d3328eef04d79?rik=SO4Ms7FS8N5jSA&pid=ImgRaw&r=0"
},{
    "id": 3,
    "name": "item3",
    "tittle": "Nintendo Switch",
    "price": "650",
    "imagen": "https://1.bp.blogspot.com/-86PlDZ8vRkg/XG-wrtMhUWI/AAAAAAAABzA/MQlmRGd0OrUul2yYRXETRncCCtd_cobxQCLcBGAs/s1600/Switch.jpg"
},{
    "id": 4,
    "name": "item4",
    "tittle": "God of War 4",
    "price": "60",
    "imagen": "https://th.bing.com/th/id/R.3eb2a8b0ab3ef12c683fe95a444c6169?rik=%2f4wX4mlBqpPzYA&pid=ImgRaw&r=0"
},{
    "id": 5,
    "name": "item5",
    "tittle": "Forza Horizon 5",
   "price": "70",
   "imagen": "https://th.bing.com/th/id/OIP.sAkvSdZqTtuNG8aeXsfZuQHaEK?pid=ImgDet&rs=1"
},{
    "id": 6,
    "name": "item6",
   "tittle": "Mario Bross Odyssy",
   "price": "50",
   "imagen": "https://th.bing.com/th/id/R.e3fca9a25b87dfa98633c2ff01bd46a3?rik=8WUGeJJQ83FI7w&pid=ImgRaw&r=0"
}
]

const cards = document.getElementById("cards")
const templateCard = document.getElementById("template-card").content
const fragment = document.createDocumentFragment()
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const items = document.getElementById("items")
const footer = document.getElementById("footer")
let carrito = {}


window.localStorage.setItem("prueba", JSON.stringify(prueba))
let item = JSON.parse(window.localStorage.getItem("prueba")); 
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
        pintarCards(prueba)
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
        const producto = carrito[e.target.dataset.id].cantidad --
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    
    }
    e.stopPropagation()
}



