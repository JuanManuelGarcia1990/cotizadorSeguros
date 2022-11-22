const selectPropiedad = document.querySelector("#propiedad")
const selectUbicacion = document.querySelector("#ubicacion")
const inputMetros2 = document.querySelector("#metros2")
const btnCotizar = document.querySelector("button.button.button-outline")
const valorPoliza = document.querySelector("#valorPoliza")
const btnEnviar = document.querySelector("span.guardar")

const cargarCombo = (select, array)=> {
    if (array.length > 0) {
        array.forEach(elemento => {
            select.innerHTML += `<option value="${elemento.factor}">${elemento.tipo}</option>`
        });
    } else {
        alert("⛔️ No existen elementos en el array.")
        btnCotizar.disabled = true
    }
}
cargarCombo(selectPropiedad, datosPropiedad)
cargarCombo(selectUbicacion, datosUbicacion)

//valido que el usuario haya seleccionado todo del HTML
const datosCompletos = ()=> (selectPropiedad.value !== "..." && selectUbicacion.value !== "..." && inputMetros2.value >= 20)

//Instancio el cotizador y llamo al método cotizar()
const cotizo = ()=> {
    const coti = new Cotizador(inputMetros2.value, selectPropiedad.value, selectUbicacion.value, costoM2)
          valorPoliza.innerText = coti.cotizar()
          btnEnviar.classList.remove("ocultar")
}

const realizarCotizacion = ()=> {
    if (datosCompletos()) {
        cotizo()
    } else {
        alert("⛔️ Completa los valores solicitados.")
    }
}

btnCotizar.addEventListener("click", realizarCotizacion)

const enviarPorEmail = ()=> {
    const cotizacionRealizada = {propiedad: selectPropiedad[selectPropiedad.selectedIndex].text,
                                 ubicacion: selectUbicacion[selectUbicacion.selectedIndex].text,
                                 metrosCuadrados: inputMetros2.value,
                                 cuotaEstimada: valorPoliza.innerText,
                                 fechaCotizacion: new Date().toLocaleString()}

    localStorage.setItem("UltimaCotizacion", JSON.stringify(cotizacionRealizada))
    alert("✅ Cotización enviada. Muchas gracias por elegirnos!")
    btnEnviar.classList.add("ocultar")
}

btnEnviar.addEventListener("click", enviarPorEmail)