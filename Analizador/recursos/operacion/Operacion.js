//Modulo Central. Indica como debe de manejarse cualquier tipo de expresion.
const TIPO_OPERACION = require("../enum/TipoOperacion")
const TIPO_VALOR = require("../enum/TipoValor")
const Aritmetica = require("./OperacionAritmetica")
const Logica = require("./OperacionLogica")
const Relacional = require("./OperacionRelacional")
const Valores = require("./Valores")

function Operacion(expresion, entorno){
    if(expresion.tipo === TIPO_VALOR.INT || expresion.tipo === TIPO_VALOR.DOUBLE || 
        expresion.tipo === TIPO_VALOR.STRING || expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        expresion.tipo === TIPO_VALOR.BOOLEAN || expresion.tipo === TIPO_VALOR.CHAR){
            return Valores(expresion, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.SUMA || expresion.tipo === TIPO_OPERACION.RESTA ||
        expresion.tipo === TIPO_OPERACION.MULTIPLICACION || expresion.tipo === TIPO_OPERACION.DIVISION ||
        expresion.tipo === TIPO_OPERACION.POTENCIA || expresion.tipo === TIPO_OPERACION.MODULO || 
        expresion.tipo === TIPO_OPERACION.UNARIO){
        return Aritmetica(expresion, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.IGUAL || expresion.tipo === TIPO_OPERACION.DESIGUAL ||
        expresion.tipo === TIPO_OPERACION.MENORIGUAL || expresion.tipo === TIPO_OPERACION.MAYORIGUAL ||
        expresion.tipo === TIPO_OPERACION.MAYOR || expresion.tipo === TIPO_OPERACION.MENOR){
        return Relacional(expresion, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.AND || expresion.tipo === TIPO_OPERACION.OR ||
        expresion.tipo === TIPO_OPERACION.NOT || expresion.tipo === TIPO_OPERACION.TERNARIO){
        return Relacional(expresion, entorno)
    }
}

module.exports = Operacion