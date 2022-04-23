const Operacion = require("../operacion/Operaciones")

function Print(instruccion, entorno){
    let expresion = instruccion.expresion
    let salida = ""
    let consola = Operacion(expresion, entorno, errores, simbolo).valor
    if(typeof consola === 'object'){
        salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
    }
    return salida
}

module.exports = Print