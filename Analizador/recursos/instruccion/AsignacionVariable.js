//Permite asignar un valor de cualquier tipo a una variable
//Si retorna null, se completo con éxito
const Operacion = require("../operacion/Operacion")

function Asignacion(instruccion, entorno){
    const id = instruccion.id               
    const buscar = entorno.buscarSimboloGlobal(id)
    if(buscar){
        var valor = Operacion(instruccion.expresion, entorno)
        var variable = entorno.getSimbolo(id)
        let antiguo = variable.tipo
        let nuevo = valor.tipo
        
        if(antiguo===nuevo){
            variable.valor = valor.valor
            entorno.actualizar(id , variable)
            return null
        }
        return {
            tipo: 'Semántico',
            descripcion: `${id} 'es de tipo ${antiguo}, no de tipo ${nuevo}.`,
            linea: instruccion.linea,
            columna: instruccion.columna    
        }
    }
    return {
        tipo: 'Semántico',
        descripcion: `${id} no existe.`,
        linea: instruccion.linea,
        columna: instruccion.columna
    }
}

module.exports = Asignacion