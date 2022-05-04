const $cerrarSesion = document.querySelector("#cerrar")
const $cerrarBtn = document.querySelector("#cerrar-btn")
const $registro = document.querySelector("#registro")
const $ingresar = document.querySelector("#ingresar")

if(window.localStorage.getItem("datosUsuario")){
    $cerrarSesion.classList.remove("d-none")
    $registro.classList.add("d-none")
    $ingresar.classList.add("d-none")

    $cerrarBtn.addEventListener("click", () => {
        localStorage.removeItem("datosUsuario")
        const reload = () => {
            return location.reload()
        }
        reload()
        })
} else {
    $cerrarSesion.classList.add("d-none")
    $registro.classList.remove("d-none")
    $ingresar.classList.remove("d-none")
   
    }
