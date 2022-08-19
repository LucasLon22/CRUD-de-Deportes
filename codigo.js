// CRUD: CREATE, READ, UPDATE AND DELETE. CREAR LEER ACTUALIZAR Y ELIMINAR

//EL OBJETIVO ES ARMAR UN PROGRAMA TIPO AGENDA DE TAREAS QUE NOS PERMITA CARGAR UNA TAREA O UN DEPORTE EN ESTE CASO QUE TENGAMOS PLANEADO HACER, QUE NOS PERMITA EDITARLO Y A LA POSTRE ELIMINARLO.

//CREAR LOS ELEMENTOS QUE NOS PERMITEN VINCULAR CON EL DOM
const formularioUi = document.querySelector(`#formulario`);
const listaActividades = document.getElementById("listaActividades");
const arrayActividades = [];

const crearActividades = (actividad) => {
    const item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item)
    return item;
    
}

const guardarDB = () => {
    localStorage.setItem(`acciones`, JSON.stringify(arrayActividades))

    mostrarDB()
    
}

const mostrarDB = () => {
    listaActividades.innerHTML = "";

    let arrayActividades = JSON.parse(localStorage.getItem(`acciones`))

    if (arrayActividades === null) {
        arrayActividades = []
    } else {
        arrayActividades.forEach((element) => {
            if (element.estado) {
                listaActividades.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">check_box</i><i class="material-icons">delete</i></span></div>`                      //el += se usa para concatenar
            } else {
                listaActividades.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">check_box_outline_blank</i><i class="material-icons">delete</i></span></div>` 
            }
            
        });
    }

}


const eliminarDB = (actividad) => {
    let arrayIndex //vacio
    arrayActividades.forEach((element, index) => {
        if (element.actividad === actividad) {
            arrayActividades === index
        }
        arrayActividades.splice(arrayIndex, 1)
        guardarDB()
    })
}

const editarDB = (actividad) => {
    let arrayIndex = arrayActividades.findIndex(element => element.actividad === actividad);
    console.log(actividad, "<-- actividad")
    console.log(arrayIndex, "<-- arrayIndex")
    console.log(arrayActividades[arrayIndex], "<-- arrayActividades[arrayIndex]")
    console.log(arrayActividades[arrayIndex].estado, "<-- arrayActividades[arrayIndex]")
    arrayActividades[arrayIndex].estado = true
    guardarDB()
}


formularioUi.addEventListener("submit", (e) => {
    e.preventDefault();
    let actividadUi = document.querySelector(`#actividad`).value;

    crearActividades(actividadUi);
    guardarDB();

    formularioUi.reset()
})

document.addEventListener("DOMContentLoaded", mostrarDB)

listaActividades.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(e)

    if (e.target.innerHTML === "check_box" || e.target.innerHTML === "check_box_outline_blank" || e.target.innerHTML === "delete") {
        let texto = e.path[2].childNodes[1].innerHTML; {
            if (e.target.innerHTML === "delete")
                eliminarDB(texto);
        }
        if (e.target.innerHTML === "check_box" || e.target.innerHTML === "check_box_outline_blank") {
            editarDB(texto);
        }
    }
})


//crear la funcion que permita ver lo que ingresamos al input

// necesitamos guardar lo que ingresamos en el input para mostrarlo en algun lado







