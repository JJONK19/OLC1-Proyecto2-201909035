const TIPO_DATO = require("../enum/TipoDato")
const TIPO_OPERACION = require("../enum/TipoOperacion")
const TIPO_VALOR = require("../enum/TipoValor")
const Tipos = require("./Tipos")
const Valores = require("./Valores")
const Relacional = require("./OperacionRelacional")
const Logica = require("./OperacionLogica")
const ListaErrores = require("../errores/ListaErrores")

function Aritmetica(expresion, entorno, errores){
    if(expresion.tipo === TIPO_VALOR.INT || expresion.tipo === TIPO_VALOR.DOUBLE || 
        expresion.tipo === TIPO_VALOR.STRING || expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        expresion.tipo === TIPO_VALOR.BOOLEAN || expresion.tipo === TIPO_VALOR.CHAR){
            return Valores(expresion, entorno, errores)
    }
    else if(expresion.tipo === TIPO_OPERACION.SUMA){
        return suma(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.RESTA){
        return resta(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multiplicacion(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.DIVISION){
        return division(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.POTENCIA){
        return potencia(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.MODULO){
        return modulo(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.UNARIO){
        return unario(expresion.izquierda, expresion.derecha, entorno, errores)
    }
}

//Calculo de la suma
function suma(_izquierda, _derecha, entorno, errores){
    const izquierda = Aritmetica(_izquierda, entorno, errores)
    const derecha = Aritmetica(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.SUMA)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_DATO.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_DATO.CHAR){
                op2.valor = op2.valor.charCodeAt(0);
            }
            const resultado = op1.valor + op2.valor;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }else if(tipoSalida === TIPO_DATO.DOUBLE){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_DATO.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_DATO.CHAR){
                op2.valor = op2.valor.charCodeAt(0);
            }
            const resultado = op1.valor + op2.valor;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }else if(tipoSalida === TIPO_DATO.STRING){
            let op1 = izquierda;
            let op2 = derecha;
            const resultado = op1.valor + op2.valor;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }
    }
    errores.add("Semántico", "No se pudo realizar la suma. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}


//Calculo de la resta
function resta(_izquierda, _derecha, entorno, errores){
    const izquierda = Aritmetica(_izquierda, entorno, errores)
    const derecha = Aritmetica(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.RESTA)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_DATO.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_DATO.CHAR){
                op2.valor = op2.valor.charCodeAt(0);
            }
            const resultado = op1.valor - op2.valor;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna 
            }
        }else if(tipoSalida === TIPO_DATO.DOUBLE){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_DATO.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_DATO.CHAR){
                op2.valor = op2.valor.charCodeAt(0);
            }
            const resultado = op1.valor - op2.valor;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }
    }
    errores.add("Semántico", "No se pudo realizar la resta. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

//Calculo de la multiplicacion
function multiplicacion(_izquierda, _derecha, entorno, errores){
    const izquierda = Aritmetica(_izquierda, entorno, errores)
    const derecha = Aritmetica(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MULTIPLICACION)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_DATO.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_DATO.CHAR){
                op2.valor = op2.valor.charCodeAt(0);
            }
            const resultado = op1.valor * op2.valor;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }else if(tipoSalida === TIPO_DATO.DOUBLE){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_DATO.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_DATO.CHAR){
                op2.valor = op2.valor.charCodeAt(0);
            }
            const resultado = op1.valor * op2.valor;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }
    }
    errores.add("Semántico", "No se pudo realizar la multiplicación. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

//Calculo de la division
function division(_izquierda, _derecha, entorno, errores){
    const izquierda = Aritmetica(_izquierda, entorno, errores)
    const derecha = Aritmetica(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.DIVISION)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.DOUBLE){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_DATO.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_DATO.CHAR){
                op2.valor = op2.valor.charCodeAt(0);
            }
            if(op2.valor === 0){
                errores.add("Semántico", "No se pudo realizar la división. División entre 0."  , _izquierda.linea, _izquierda.columna);
                return {
                    valor: null,
                    tipo: "ERROR",
                    linea: null,
                    columna: null
                }
            }else{
                const resultado = op1.valor / op2.valor;
                return {
                    valor: resultado,
                    tipo: tipoSalida,
                    linea: _izquierda.linea,
                    columna: _izquierda.columna
                }
            }
        }
    }
    errores.add("Semántico", "No se pudo realizar la división. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

//Evaluar la potencia
function potencia(_izquierda, _derecha, entorno, errores){
    const izquierda = Aritmetica(_izquierda, entorno, errores)
    const derecha = Aritmetica(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.POTENCIA)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            let op2 = derecha;
            const resultado = Math.pow(op1.valor, op2.valor);
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }else if(tipoSalida === TIPO_DATO.DOUBLE){
            let op1 = izquierda;
            let op2 = derecha;
            const resultado = Math.pow(op1.valor, op2.valor);
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }
    }
    errores.add("Semántico", "No se pudo realizar la potencia. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

//Evaluar modulo
function modulo(_izquierda, _derecha, entorno, errores){
    const izquierda = Aritmetica(_izquierda, entorno, errores)
    const derecha = Aritmetica(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MODULO)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.DOUBLE){
            let op1 = izquierda;
            let op2 = derecha;
            if(op2.valor === 0){
                errores.add("Semántico", "No se pudo realizar el modulo. División entre 0."  , _izquierda.linea, _izquierda.columna);
                return {
                    valor: null,
                    tipo: "ERROR",
                    linea: expresion.linea,
                    columna: expresion.columna
                }
            }else{
                const resultado = op1.valor % op2.valor;
                return {
                    valor: resultado,
                    tipo: tipoSalida,
                    linea: _izquierda.linea,
                    columna: _izquierda.columna
                }
            }
        }
    }
    errores.add("Semántico", "No se pudo realizar el modulo. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function unario(_izquierda, _derecha, entorno, errores){
    const izquierda = Aritmetica(_izquierda, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, null, TIPO_OPERACION.UNARIO)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.DOUBLE || tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            const resultado = op1.valor * -1;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }
    }
    errores.add("Semántico", "No se pudo realizar la operación unaria. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

module.exports = Aritmetica