const TIPO_OPERACION = require("../enum/TipoOperacion")
const TIPO_DATO = require("../enum/TipoDato")
const TIPO_VALOR = require("../enum/TipoValor")
const Aritmetica = require("./OperacionAritmetica")
const Valores = require("./Valores")
const Tipos = require("./Tipos")
const ListaErrores = require("../errores/ListaErrores")

function Relacional(expresion, entorno, errores){
    if(expresion.tipo === TIPO_VALOR.INT || expresion.tipo === TIPO_VALOR.DOUBLE || 
        expresion.tipo === TIPO_VALOR.STRING || expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        expresion.tipo === TIPO_VALOR.BOOLEAN || expresion.tipo === TIPO_VALOR.CHAR){
            return Valores(expresion, entorno, errores)
    }
    else if(expresion.tipo === TIPO_OPERACION.SUMA || expresion.tipo === TIPO_OPERACION.RESTA ||
        expresion.tipo === TIPO_OPERACION.MULTIPLICACION || expresion.tipo === TIPO_OPERACION.DIVISION ||
        expresion.tipo === TIPO_OPERACION.POTENCIA || expresion.tipo === TIPO_OPERACION.MODULO || 
        expresion.tipo === TIPO_OPERACION.UNARIO){
        return Aritmetica(expresion, entorno, errores)
    }
    else if(expresion.tipo === TIPO_OPERACION.IGUAL){
        return igual(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.DESIGUAL){
        return desigual(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorigual(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorigual(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayor(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.MENOR){
        return menor(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.TERNARIO){
        return ternario(expresion.condicion, expresion.izquierda, expresion.derecha, entorno, errores)
    }

}


function igual(_izquierda, _derecha, entorno, errores){
    const izquierda = Relacional(_izquierda, entorno, errores)
    const derecha = Relacional(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.IGUAL)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_DATO.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_DATO.CHAR){
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
    errores.add("Semántico", "No se pudo realizar si son iguales. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function desigual(_izquierda, _derecha, entorno, errores){
    const izquierda = Relacional(_izquierda, entorno, errores)
    const derecha = Relacional(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.DESIGUAL)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_DATO.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_DATO.CHAR){
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
    errores.add("Semántico", "No se pudo realizar no son iguales. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function mayorigual(_izquierda, _derecha, entorno, errores){
    const izquierda = Relacional(_izquierda, entorno, errores)
    const derecha = Relacional(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MAYORIGUAL)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_DATO.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_DATO.CHAR){
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
    errores.add("Semántico", "No se pudo realizar si es mayor o igual. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function menorigual(_izquierda, _derecha, entorno, errores){
    const izquierda = Relacional(_izquierda, entorno, errores)
    const derecha = Relacional(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MENORIGUAL)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_DATO.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_DATO.CHAR){
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
    errores.add("Semántico", "No se pudo realizar si es menor o igual. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function mayor(_izquierda, _derecha, entorno, errores){
    const izquierda = Relacional(_izquierda, entorno, errores)
    const derecha = Relacional(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MAYOR)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_DATO.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_DATO.CHAR){
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
    errores.add("Semántico", "No se pudo realizar si es mayor. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function menor(_izquierda, _derecha, entorno, errores){
    const izquierda = Relacional(_izquierda, entorno, errores)
    const derecha = Relacional(_derecha, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, derecha.tipo, TIPO_OPERACION.MENOR)
    if(tipoSalida!=null){
        let op1 = izquierda;
        let op2 = derecha;
        if(op1.tipo === TIPO_DATO.CHAR){
            op1.valor = op1.valor.charCodeAt(0); 
        }else if(op2.tipo === TIPO_DATO.CHAR){
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
    errores.add("Semántico", "No se pudo realizar si es menor. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function ternario(_condicion, _izquierda, _derecha, entorno, errores){

    const condicion = Relacional(_condicion, entorno, errores)
    const izquierda = Relacional(_izquierda, entorno, errores)
    const derecha = Relacional(_derecha, entorno, errores)
    if(condicion.tipo === TIPO_DATO.BOOLEAN){
        if(condicion.valor){
            return {
                valor: izquierda.valor,
                tipo: izquierda.tipo,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }else{
            return {
                valor: derecha.valor,
                tipo: derecha.tipo,
                linea: derecha.linea,
                columna: derecha.columna
            }
        }
    }
    errores.add("Semántico", "La condición ingresada debe retornar un booleano."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

module.exports = Relacional