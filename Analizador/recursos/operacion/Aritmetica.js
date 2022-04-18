const TIPO_DATO = require("../enum/TipoDato");
const TIPO_OPERACION = require("../enum/TipoOperacion");
const TIPO_VALOR = require("../enum/TipoValor");
const Tipos = require("./Tipos");
const Valores = require("./Valores");

function Aritmetica(expresion, entorno){
    if(expresion.tipo === TIPO_VALOR.INT || expresion.tipo === TIPO_VALOR.DOUBLE || 
        expresion.tipo === TIPO_VALOR.STRING || expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        expresion.tipo === TIPO_VALOR.BOOLEAN || expresion.tipo === TIPO_VALOR.CHAR){
            return Valores(expresion, entorno)
    }
    else if(expresion.tipo === TIPO_OPERACION.SUMA){
        return suma(expresion.izquierda, expresion.derecha, entorno)
    }else if(expresion.tipo === TIPO_OPERACION.RESTA){
        return resta(expresion.izquierda, expresion.derecha, entorno)
    }else if(expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return multiplicacion(expresion.izquierda, expresion.derecha, entorno)
    }else if(expresion.tipo === TIPO_OPERACION.DIVISION){
        return division(expresion.izquierda, expresion.derecha, entorno)
    }else if(expresion.tipo === TIPO_OPERACION.POTENCIA){
        return potencia(expresion.izquierda, expresion.derecha, entorno)
    }else if(expresion.tipo === TIPO_OPERACION.MODULO){
        return modulo(expresion.izquierda, expresion.derecha, entorno)
    }else if(expresion.tipo === TIPO_OPERACION.UNARIO){
        return unario(expresion.izquierda, null, entorno)
    }
}

//Calculo de la suma
function suma(_izquierda, _derecha, entorno){
    const izquierda = Aritmetica(_izquierda, entorno)
    const derecha = Aritmetica(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.SUMA)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_VALOR.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_VALOR.CHAR){
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
            if(op1.tipo === TIPO_VALOR.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_VALOR.CHAR){
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
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo realizar la suma. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}


//Calculo de la resta
function resta(_izquierda, _derecha, entorno){
    const izquierda = Aritmetica(_izquierda, entorno)
    const derecha = Aritmetica(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.RESTA)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_VALOR.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_VALOR.CHAR){
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
            if(op1.tipo === TIPO_VALOR.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_VALOR.CHAR){
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
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo realizar la resta. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

//Calculo de la multiplicacion
function multiplicacion(_izquierda, _derecha, entorno){
    const izquierda = Aritmetica(_izquierda, entorno)
    const derecha = Aritmetica(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MULTIPLICACION)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_VALOR.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_VALOR.CHAR){
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
            if(op1.tipo === TIPO_VALOR.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_VALOR.CHAR){
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
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo realizar la multiplicación. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

//Calculo de la division
function division(_izquierda, _derecha, entorno){
    const izquierda = Aritmetica(_izquierda, entorno)
    const derecha = Aritmetica(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.DIVISION)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.DOUBLE){
            let op1 = izquierda;
            let op2 = derecha;
            if(op1.tipo === TIPO_VALOR.CHAR){
                op1.valor = op1.valor.charCodeAt(0); 
            }else if(op2.tipo === TIPO_VALOR.CHAR){
                op2.valor = op2.valor.charCodeAt(0);
            }
            if(op2.valor === 0){
                return {
                    valor: {
                        tipo: 'Semántico',
                        descripcion: "No se pudo realizar la división. División entre 0.",
                        linea: expresion.linea,
                        columna: expresion.columna
                    },
                    tipo: null,
                    linea: izquierda.linea,
                    columna: derecha.columna
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
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo realizar la división. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

//Evaluar la potencia
function potencia(_izquierda, _derecha, entorno){
    const izquierda = Aritmetica(_izquierda, entorno)
    const derecha = Aritmetica(_derecha, entorno)
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
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo realizar la potencia. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

//Evaluar modulo
function modulo(_izquierda, _derecha, entorno){
    const izquierda = Aritmetica(_izquierda, entorno)
    const derecha = Aritmetica(_derecha, entorno)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MODULO)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.DOUBLE){
            let op1 = izquierda;
            let op2 = derecha;
            if(op2.valor === 0){
                return {
                    valor: {
                        tipo: 'Semántico',
                        descripcion: "No se pudo realizar el modulo. División entre 0.",
                        linea: expresion.linea,
                        columna: expresion.columna
                    },
                    tipo: null,
                    linea: izquierda.linea,
                    columna: derecha.columna
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
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo realizar la división. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

function unario(_izquierda, _derecha, entorno){
    const izquierda = Aritmetica(_izquierda, entorno)
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
    return {
        valor: {
            tipo: 'Semántico',
            descripcion: "No se pudo realizar la negación. Tipos Invalidos.",
            linea: expresion.linea,
            columna: expresion.columna
        },
        tipo: null,
        linea: izquierda.linea,
        columna: derecha.columna
    }
}

module.exports = Aritmetica