const colors = require("colors");
const fs = require("fs");
const argv = require("yargs")
    .command("crear", "Crea una tarea", {
        descripcion: {
            demand: true,
            alias: "d"
        }
    })
    .command("listar", "Muestra todas las tareas")
    .command("actualizar", "Actualizar tareas", {
        descripcion: {
            demand: true,
            alias: "d"
        },
        val: {
            alias: "v",
            fault: true
        }
    })
    .argv;
let tareas;

let opcion = argv._[0];
let desc = argv.descripcion;
let val = argv.val;


switch (opcion) {
    case "crear":
        tareas = JSON.parse(fs.readFileSync("./tareas.json"));
        if (tareas.find(tarea => tarea.descripcion === desc)) {
            console.log(`La tarea ${desc} ya existe`);
        } else {
            let tarea = {
                descripcion: desc,
                completada: false
            };
            tareas.push(tarea);
            fs.writeFile("tareas.json", JSON.stringify(tareas), err => console.log(err));
            console.log(`La tarea ${JSON.stringify(tarea)} ha si guardado con exito`);
        }
        break;

    case "listar":
        tareas = require("./tareas.json");
        console.log(tareas);
        break;

    case "actualizar":
        tareas = JSON.parse(fs.readFileSync("./tareas.json"));
        let search = tareas.find(tarea => tarea.descripcion === desc);
        if (search) {
            search.completada = Boolean(val);
            for (let index = 0; index < tareas.length; index++) {
                if (tareas[index].descripcion === desc) {
                    tareas[index] = search;
                    break;
                }
            }
            fs.writeFile("tareas.json", JSON.stringify(tareas), err => console.log(err));
            console.log(`La tarea ${desc} se ha reportado completada con exito`);
        } else {
            console.log(`La tarea ${desc} no exite`);
            break;
        }

    default:
        console.log("Comando no reconocido");
        break;
}