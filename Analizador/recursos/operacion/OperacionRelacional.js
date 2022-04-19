const TIPO_OPERACION = require("../enum/TipoOperacion")
const TIPO_VALOR = require("../enum/TipoValor")
const Aritmetica = require("./OperacionAritmetica")
const Valores = require("./Valores")
const Tipos = require("./Tipos")

function Relacional(expresion, entorno){
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
    else if(_expresion.tipo === TIPO_OPERACION.IGUAL){
        return igual(expresion.izquierda, expresion.derecha, entorno)
    }else if(_expresion.tipo === TIPO_OPERACION.DESIGUAL){
        return desigual(expresion.izquierda, expresion.derecha, entorno)
    }else if(_expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorigual(expresion.izquierda, expresion.derecha, entorno)
    }else if(_expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorigual(expresion.izquierda, expresion.derecha, entorno)
    }else if(_expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayor(expresion.izquierda, expresion.derecha, entorno)
    }else if(_expresion.tipo === TIPO_OPERACION.MENOR){
        return menor(expresion.izquierda, expresion.derecha, entorno)
    }
}

function igual(_izquierda, _derecha, entorno){
    const izquierda = Relacional(_izquierda, entorno)
    const derecha = Relacional(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.IGUAL)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_VALOR.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_VALOR.CHAR){
            op2.valor = op2.valor.charCodeAt(0);
        }
        let resultado = false;
        if(op1.valor == op2.valor){
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
            descripcion: "No se pudo validar si son iguales. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

function desigual(_izquierda, _derecha, entorno){
    const izquierda = Relacional(_izquierda, entorno)
    const derecha = Relacional(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.DESIGUAL)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_VALOR.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_VALOR.CHAR){
            op2.valor = op2.valor.charCodeAt(0);
        }
        let resultado = true;
        if(op1.valor == op2.valor){
            resultado = false;
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
            descripcion: "No se pudo validar si no son iguales. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

function mayorigual(_izquierda, _derecha, entorno){
    const izquierda = Relacional(_izquierda, entorno)
    const derecha = Relacional(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MAYORIGUAL)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_VALOR.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_VALOR.CHAR){
            op2.valor = op2.valor.charCodeAt(0);
        }
        let resultado = false;
        if(op1.valor >= op2.valor){
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
            descripcion: "No se pudo validar si es mayor o igual. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

function menorigual(_izquierda, _derecha, entorno){
    const izquierda = Relacional(_izquierda, entorno)
    const derecha = Relacional(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MENORIGUAL)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_VALOR.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_VALOR.CHAR){
            op2.valor = op2.valor.charCodeAt(0);
        }
        let resultado = false;
        if(op1.valor <= op2.valor){
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
            descripcion: "No se pudo validar si es menor o igual. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

function mayor(_izquierda, _derecha, entorno){
    const izquierda = Relacional(_izquierda, entorno)
    const derecha = Relacional(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MAYOR)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_VALOR.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_VALOR.CHAR){
            op2.valor = op2.valor.charCodeAt(0);
        }
        let resultado = false;
        if(op1.valor > op2.valor){
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
            descripcion: "No se pudo validar si es mayor. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

function menor(_izquierda, _derecha, entorno){
    const izquierda = Relacional(_izquierda, entorno)
    const derecha = Relacional(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MENOR)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_VALOR.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_VALOR.CHAR){
            op2.valor = op2.valor.charCodeAt(0);
        }
        let resultado = false;
        if(op1.valor < op2.valor){
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
            descripcion: "No se pudo validar si es menor. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

module.exports = Relacional