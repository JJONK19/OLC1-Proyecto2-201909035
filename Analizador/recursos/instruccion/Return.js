const Operaciones = require("../operacion/Operaciones")

function Return(instruccion, entorno, errores, simbolo){
    if(instruccion.valor == null){
        if(entorno.retorno == null){
            return null
        }else{
            errores.add("Semántico", `Retorno Inexistente. Se esperaba un objeto de tipo ${entorno.retorno}` , instruccion.linea, instruccion.columna);
            return `Retorno Inexistente. Se esperaba un objeto de tipo ${entorno.retorno}`
        }
    }else{
        if(entorno.retorno == null){
            errores.add("Semántico", `Los metodos no retornan valores.` , instruccion.linea, instruccion.columna);
            return `Los metodos no retornan valores.`
        }else{
            let expresion = Operaciones(instruccion.valor,entorno, errores, simbolo)
            if(expresion.tipo == entorno.retorno){
                return {
                    valor: expresion.valor,
                    tipo: expresion.tipo,
                    linea: expresion.linea,
                    columna: expresion.columna
                }            
            }else{
                errores.add("Semántico", `Retorno Invalido. Se esperaba un objeto de tipo ${entorno.retorno}` , instruccion.linea, instruccion.columna);
                return `Retorno Invalido. Se esperaba un objeto de tipo ${entorno.retorno}`
            }
        }
    }
}

module.exports = Return