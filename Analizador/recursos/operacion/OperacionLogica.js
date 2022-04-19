const TIPO_DATO = require("../enum/TipoDato")
const TIPO_OPERACION = require("../enum/TipoOperacion")
const TIPO_VALOR = require("../enum/TipoValor")
const Aritmetica = require("./OperacionAritmetica")
const Relacional = require("./OperacionRelacional")
const Valores = require("./Valores")

function Logica(expresion, entorno){
    if(expresion.tipo === TIPO_VALOR.INT || expresion.tipo === TIPO_VALOR.DOUBLE || 
        expresion.tipo === TIPO_VALOR.STRING || expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        expresion.tipo === TIPO_VALOR.BOOLEAN || expresion.tipo === TIPO_VALOR.CHAR){
            return Valores(expresion, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.SUMA || expresion.tipo === TIPO_OPERACION.RESTA ||
        expresion.tipo === TIPO_OPERACION.MULTIPLICACION || expresion.tipo === TIPO_OPERACION.DIVISION ||
        expresion.tipo === TIPO_OPERACION.POTENCIA || expresion.tipo === TIPO_OPERACION.MODULO || 
        expresion.tipo === TIPO_OPERACION.UNARIO){
        return Aritmetica(expresion.izquierda, expresion.derecha, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.IGUAL || expresion.tipo === TIPO_OPERACION.DESIGUAL ||
        expresion.tipo === TIPO_OPERACION.MENORIGUAL || expresion.tipo === TIPO_OPERACION.MAYORIGUAL ||
        expresion.tipo === TIPO_OPERACION.MAYOR || expresion.tipo === TIPO_OPERACION.MENOR){
        return Relacional(expresion.izquierda, expresion.derecha, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.AND){
        return and(expresion.izquierda, expresion.derecha, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.OR){
        return or(expresion.izquierda, expresion.derecha, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.NOT){
        return not(expresion.izquierda, null, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.TERNARIO){
        return not(expresion.izquierda, null, entorno)
    }
}

function and(_izquierda, _derecha, entorno){
    const izquierda = Logica(_izquierda, entorno)
    const derecha = Logica(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.AND)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;

        let resultado = false;
        if(op1.valor && op2.valor){
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: tipoSalida,
            linea: _izquierda.linea,
            columna: _izquierda.columna
        }
    }
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo validar la operación and. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

function or(_izquierda, _derecha, entorno){
    const izquierda = Logica(_izquierda, entorno)
    const derecha = Logica(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.OR)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;

        let resultado = false;
        if(op1.valor || op2.valor){
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: tipoSalida,
            linea: _izquierda.linea,
            columna: _izquierda.columna
        }
    }
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo validar la operación or. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

function not(_izquierda, _derecha, entorno){
    const izquierda = Logica(_izquierda, entorno)
    const tipoSalida = Tipos(izquierda.tipo, null, TIPO_OPERACION.NOT)
    if(tipoSalida!=null){
        let op1 = izquierda;

        let resultado = !op1.valor;
        
        return {
            valor: resultado,
            tipo: tipoSalida,
            linea: _izquierda.linea,
            columna: _izquierda.columna
        }
    }
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo validar la operación not. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

module.exports = Logica