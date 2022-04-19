const TIPO_DATO = require("../enum/TipoDato")
const Entorno = require("../datos/Entorno")
const Operacion = require("../operacion/Operacion")

function While(instruccion, entorno){
    var salida = ""
    var condicion  = Operacion(instruccion.expresion, entorno)
    if(condicion.tipo === TIPO_DATO.BOOLEAN){
        while(condicion.valor){
            let Local = require('./Local')
            var entornoLocal = new Entorno(entorno)
            var ejec = Local(instruccion.instrucciones, entornoLocal)
            salida += ejec
            condicion = Operacion(instruccion.expresion, entorno)   //Actualizar Condicion
        }
        return salida
    }
    return {
        tipo: 'Semántico',
        descripcion: 'Se esperaba una expresión booleana como condición.',
        linea: instruccion.linea,
        columna: instruccion.columna    
    }
}

module.exports = While