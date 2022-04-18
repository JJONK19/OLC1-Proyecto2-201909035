//Conversión y retorno de valores basicos
//Es una operacion terminal
const TIPO_DATO = require("../enum/TipoDato");
const TIPO_VALOR = require("../enum/TipoValor");

function Valores(expresion, entorno){
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
    else if(expresion.tipo === TIPO_VALOR.STRING){
        return {
            valor: expresion.valor.substring(0, expresion.valor.length),
            tipo: TIPO_DATO.STRING,
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
    else if(expresion.tipo === TIPO_VALOR.CHAR){
        return {
            valor: expresion.valor.charAt(0),
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
        return {
            valor: {
                tipo: 'Semántico',
                descripcion: "Variable Inexistente: " + expresion.valor,
                linea: expresion.linea,
                columna: expresion.columna
            },
            tipo: null,
            linea: expresion.linea,
            columna: expresion.columna
        }
    }
}

module.exports = Valores