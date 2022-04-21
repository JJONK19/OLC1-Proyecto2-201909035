//Conversión y retorno de valores basicos
//Es una operacion terminal
const TIPO_DATO = require("../enum/TipoDato")
const TIPO_VALOR = require("../enum/TipoValor")
const ListaErrores = require("../errores/ListaErrores")

function Valores(expresion, entorno, errores){
    if(expresion.tipo === TIPO_VALOR.INT){
        return {
            valor: Number(expresion.valor),
            tipo: TIPO_DATO.INT,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
    else if(expresion.tipo === TIPO_VALOR.DOUBLE){
        return {
            valor: Number(expresion.valor),
            tipo: TIPO_DATO.DOUBLE,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
    else if(expresion.tipo === TIPO_VALOR.BOOLEAN){
        return {
            valor: expresion.valor.toLowerCase() ==='false' ? false: true,
            tipo: TIPO_DATO.BOOLEAN,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
    else if(expresion.tipo === TIPO_VALOR.STRING){
        return {
            valor: expresion.valor.substring(0, expresion.valor.length),
            tipo: TIPO_DATO.STRING,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
    else if(expresion.tipo === TIPO_VALOR.CHAR){
        return {
            valor: expresion.valor.charAt(1),
            tipo: TIPO_DATO.CHAR,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
    else if(expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        const temp = entorno.getSimbolo(expresion.valor)
        if(temp!=null){
            return {
                valor: temp.valor,
                tipo: temp.tipo,
                linea: temp.linea,
                columna: temp.columna
            }
        }
        errores.add("Semántico", "Variable Inexistente: " + expresion.valor , expresion.linea, expresion.columna);
        return {
            valor: null,
            tipo: "ERROR",
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
}

module.exports = Valores