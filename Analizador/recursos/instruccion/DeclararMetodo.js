//Declaracion de metodos
//Si retorna null, se completo con éxito
const Metodo = require("../datos/Metodo")

function DeclararMetodo(instruccion, entorno){
    const nuevo = new Metodo(instruccion.nombre, instruccion.parametros, instruccion.instrucciones, instruccion.linea, instruccion.columna)

    if(entorno.buscarSimbolo(nuevo.id) == true){
        return {
            tipo: 'Semántico',
            descripcion: `${nuevo.id} es el nombre de una variable. No puede ser asignado al método.`,
            linea: instruccion.linea,
            columna: instruccion.columna
        }
    }else if(entorno.buscarMetodo(nuevo.id) ==false){
        return {
            tipo: 'Semántico',
            descripcion: `${nuevo.id} es el nombre de un método. No puede ser asignado al método.`,
            linea: instruccion.linea,
            columna: instruccion.columna
        }
    }
    //Añadir a la tabla de simbolos
    entorno.addMetodo(nuevo.id, nuevo)
    return null

}

module.exports = DeclararMetodo