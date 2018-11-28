const fs = require("fs");

let agregar = (desc) => {
    let tareas = JSON.parse(fs.readFileSync("./tareas.json"));
    if (tareas.find(tarea => tarea.descripcion === desc)) {
        return false;
    } else {
        tareas.push({
            descripcion: desc,
            completada: false
        });
        fs.writeFileSync("tareas.json", JSON.stringify(tareas));
        return true;
    }
}

let listar = () => {
    let tareas = JSON.parse(fs.readFileSync("./tareas.json"));
    let cadena = "";
    tareas.forEach(element => {
        cadena += `Descripción: ${element.descripcion}\nCompletada: ${element.completada}\n\n`
    });
    return cadena;
}

let actualizar = (desc, val = true) => {
    let tareas = JSON.parse(fs.readFileSync("./tareas.json"));
    let object = tareas.find(tarea => tarea.descripcion === desc);
    if (object) {
        tareas.forEach(element => {
            if (element === object) {
                object.completada = val;
                element = object;
                fs.writeFileSync("tareas.json", JSON.stringify(tareas));
            }
        });
        return true;
    } else {
        return false;
    }
}

let borrar = (desc) => {
    let tareas = JSON.parse(fs.readFileSync("./tareas.json"));
    if (tareas.find(tarea => tarea.descripcion === desc)) {
        tareas.splice(tareas.indexOf(tareas.find(tarea => tarea.descripcion === desc)), 1);
        fs.writeFileSync("tareas.json", JSON.stringify(tareas));
        return true;
    } else {
        return false;
    }
}

module.exports = {
    agregar,
    actualizar,
    borrar,
    listar
};