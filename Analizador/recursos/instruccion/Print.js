const Operacion = require("../operacion/Operaciones")

function Print(instruccion, entorno, errores, simbolo){
    let expresion = instruccion.expresion
    let consola = Operacion(expresion, entorno, errores, simbolo).valor
    return consola
}

module.exports = Print