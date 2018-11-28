const colors = require("colors");
const ops = require("./operaciones")
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
    .command("borrar", "Borra la tarea solicitada", {
        descripcion: {
            demand: true,
            alias: "d"
        }
    })
    .argv;

let opcion = argv._[0];
let desc = argv.descripcion;
let val = argv.val;
switch (opcion) {
    case "crear":
        if (ops.agregar(desc)) {
            console.log(`La tarea ${desc} ha sido guardada exitosamente`);
        } else {
            console.log(`La tarea ${desc} no fue listada porque ya exite`);
        }
        break;

    case "listar":
        console.log(ops.listar());
        break;

    case "actualizar":
        if (ops.actualizar(desc, val)) {
            console.log(`La tarea ${desc} fue actualizada exitosamente`);
        } else {
            console.log(`La tarea ${desc} no se encontró`)
        }
        break;

    case "borrar":
        if (ops.borrar(desc)) {
            console.log(`La tarea ${desc} fue borrada exitosamente`);
        } else {
            console.log(`La tarea ${desc} no se encontró`);
        }
        break;

    default:
        console.log("Comando no reconocido");
        break;
}