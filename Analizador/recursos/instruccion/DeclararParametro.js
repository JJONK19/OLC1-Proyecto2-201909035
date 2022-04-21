//Declaracion de Parametros
//Si retorna null, se completo con éxito
const Simbolo = require("../datos/Simbolo")
const TIPO_DATO = require("../enum/TipoDato")
const Operacion = require("../operacion/Operaciones")

function DeclararParametro(instruccion, entorno){
    //Declaracion de Enteros
    if(instruccion.tipodato === TIPO_DATO.INT){
        let valor = 0
        if(instruccion.valor != null){
            let resultado = Operacion(instruccion.valor, entorno)
            if(resultado.tipo === TIPO_DATO.INT){
                valor = resultado.valor
            }
            else{
                return {
                    tipo: 'Semántico',
                    descripcion: `${instruccion.id} 'es de tipo ${instruccion.tipodato}, no de tipo ${resultado.tipo}.`,
                    linea: instruccion.linea,
                    columna: instruccion.columna    
                }
            }
        }
        const nuevo = new Simbolo(instruccion.id, valor, instruccion.tipodato, instruccion.linea, instruccion.columna)
        if(entorno.existeSimbolo(nuevo.id) == true){
            return {
                tipo: 'Semántico',
                descripcion: `${nuevo.id} no puede ser asignado porque ya existe.`,
                linea: instruccion.linea,
                columna: instruccion.columna
            }
        }
        entorno.addSimbolo(nuevo.id, nuevo)
        return null
    }
    //Declaracion de Doubles
    else if(instruccion.tipodato === TIPO_DATO.DOUBLE){
        let valor = 0.0
        if(instruccion.valor != null){
            let resultado = Operacion(instruccion.valor, entorno)
            if(resultado.tipo === TIPO_DATO.DOUBLE){
                valor = resultado.valor
            }
            else{
                return {
                    tipo: 'Semántico',
                    descripcion: `${instruccion.id} 'es de tipo ${instruccion.tipodato}, no de tipo ${resultado.tipo}.`,
                    linea: instruccion.linea,
                    columna: instruccion.columna    
                }
            }
        }
        const nuevo = new Simbolo(instruccion.id, valor, instruccion.tipodato, instruccion.linea, instruccion.columna)
        if(entorno.existeSimbolo(nuevo.id) == true){
            return {
                tipo: 'Semántico',
                descripcion: `${nuevo.id} no puede ser asignado porque ya existe.`,
                linea: instruccion.linea,
                columna: instruccion.columna
            }
        }
        entorno.addSimbolo(nuevo.id, nuevo)
        return null
    }
    //Declaracion de Boolean
    else if(instruccion.tipodato === TIPO_DATO.BOOLEAN){
        let valor = true
        if(instruccion.valor != null){
            let resultado = Operacion(instruccion.valor, entorno)
            if(resultado.tipo === TIPO_DATO.BOOLEAN){
                valor = resultado.valor
            }
            else{
                return {
                    tipo: 'Semántico',
                    descripcion: `${instruccion.id} 'es de tipo ${instruccion.tipodato}, no de tipo ${resultado.tipo}.`,
                    linea: instruccion.linea,
                    columna: instruccion.columna    
                }
            }
        }
        const nuevo = new Simbolo(instruccion.id, valor, instruccion.tipodato, instruccion.linea, instruccion.columna)
        if(entorno.existeSimbolo(nuevo.id) == true){
            return {
                tipo: 'Semántico',
                descripcion: `${nuevo.id} no puede ser asignado porque ya existe.`,
                linea: instruccion.linea,
                columna: instruccion.columna
            }
        }
        entorno.addSimbolo(nuevo.id, nuevo)
        return null
    }
    //Declaracion de Character
    else if(instruccion.tipodato === TIPO_DATO.CHAR){
        let valor = '\u0000'
        if(instruccion.valor != null){
            let resultado = Operacion(instruccion.valor, entorno)
            if(resultado.tipo === TIPO_DATO.CHAR){
                valor = resultado.valor
            }
            else{
                return {
                    tipo: 'Semántico',
                    descripcion: `${instruccion.id} 'es de tipo ${instruccion.tipodato}, no de tipo ${resultado.tipo}.`,
                    linea: instruccion.linea,
                    columna: instruccion.columna    
                }
            }
        }
        const nuevo = new Simbolo(instruccion.id, valor, instruccion.tipodato, instruccion.linea, instruccion.columna)
        if(entorno.existeSimbolo(nuevo.id) == true){
            return {
                tipo: 'Semántico',
                descripcion: `${nuevo.id} no puede ser asignado porque ya existe.`,
                linea: instruccion.linea,
                columna: instruccion.columna
            }
        }
        entorno.addSimbolo(nuevo.id, nuevo)
        return null
    }
    //Declaracion de String
    else if(instruccion.tipodato === TIPO_DATO.STRING){
        let valor = ''
        if(instruccion.valor != null){
            let resultado = Operacion(instruccion.valor, entorno)
            if(resultado.tipo === TIPO_DATO.STRING){
                valor = resultado.valor
            }
            else{
                return {
                    tipo: 'Semántico',
                    descripcion: `${instruccion.id} 'es de tipo ${instruccion.tipodato}, no de tipo ${resultado.tipo}.`,
                    linea: instruccion.linea,
                    columna: instruccion.columna    
                }
            }
        }
        const nuevo = new Simbolo(instruccion.id, valor, instruccion.tipodato, instruccion.linea, instruccion.columna)
        if(entorno.existeSimbolo(nuevo.id) == true){
            return {
                tipo: 'Semántico',
                descripcion: `${nuevo.id} no puede ser asignado porque ya existe.`,
                linea: instruccion.linea,
                columna: instruccion.columna
            }
        }
        entorno.addSimbolo(nuevo.id, nuevo)
        return null
    }

}

module.exports = DeclararParametro