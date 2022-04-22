const TIPO_DATO = require("../enum/TipoDato")
const TIPO_OPERACION = require("../enum/TipoOperacion")
const TIPO_VALOR = require("../enum/TipoValor")
const Tipos = require("./Tipos")

//Modulo Principal -----------------------------------------------------
function Operaciones(expresion, entorno, errores){
    if(expresion.tipo === TIPO_VALOR.INT || expresion.tipo === TIPO_VALOR.DOUBLE || 
        expresion.tipo === TIPO_VALOR.STRING || expresion.tipo === TIPO_VALOR.IDENTIFICADOR ||
        expresion.tipo === TIPO_VALOR.BOOLEAN || expresion.tipo === TIPO_VALOR.CHAR){
            return Valores(expresion, entorno, errores)
    }
    else if(expresion.tipo === TIPO_VALOR.VECTORU){
        return ValoresV(expresion, entorno, errores)
    }
    //Opraciones Aritmeticas
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
    //Operaciones Relacionales
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
    //Operaciones Logicas
    else if(expresion.tipo === TIPO_OPERACION.AND){
        return and(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.OR){
        return or(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.NOT){
        return not(expresion.izquierda, null, entorno, errores)
    }
    //Otros
    else if(expresion.tipo === TIPO_OPERACION.CASTEO){
        return casteo(expresion.casteo, expresion.valor, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.INCREMENTO){
        return incremento(expresion.izquierda, expresion.derecha, entorno, errores)
    }else if(expresion.tipo === TIPO_OPERACION.DECREMENTO){
        return decremento(expresion.izquierda, expresion.derecha, entorno, errores)
    }
}

//Operaciones-----------------------------------------------------------------------------
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

function ValoresV(expresion, entorno, errores){
    let id = expresion.id
    let posicion1 = expresion.posicion1 
    let posicion2 = expresion.posicion2
    if(posicion2 == null){
        //Vectores Unidimensionales
        let tamaño1 = Operaciones(posicion1, entorno, errores)
        if(tamaño1.tipo === TIPO_DATO.INT){
            const temp = entorno.getSimbolo(id)
            if(temp!=null){
                if(Array.isArray(temp.valor)){
                    let salida = temp.valor[tamaño1.valor]
                    if(salida != undefined){
                        return {
                            valor: salida,
                            tipo: temp.tipo,
                            linea: temp.linea,
                            columna: temp.columna
                        }
                    }
                    errores.add("Semántico", "La posición no existe en el arreglo (U)." , expresion.linea, expresion.columna);
                    return {
                        valor: null,
                        tipo: "ERROR",
                        linea: expresion.linea,
                        columna: expresion.columna
                    }
                }
                errores.add("Semántico", "La variable no es un arreglo." , expresion.linea, expresion.columna);
                return {
                    valor: null,
                    tipo: "ERROR",
                    linea: expresion.linea,
                    columna: expresion.columna
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
        errores.add("Semántico", `La posicion ingresada ingresado de ser de tipo INT, no ${tamaño1.tipo}.` , instruccion.linea, instruccion.columna);
        return {
            valor: null,
            tipo: "ERROR",
            linea: expresion.linea,
            columna: expresion.columna
        }
    }else{
        //Vectores Bidimensionales
        let tamaño1 = Operaciones(posicion1, entorno, errores)
        let tamaño2 = Operaciones(posicion2, entorno, errores)
        if(tamaño1.tipo === TIPO_DATO.INT && tamaño2.tipo === TIPO_DATO.INT){
            const temp = entorno.getSimbolo(id)
            if(temp!=null){
                if(Array.isArray(temp.valor)){
                    let salida = temp.valor[tamaño1.valor][tamaño2.valor]
                    if(salida != undefined){
                        return {
                            valor: salida,
                            tipo: temp.tipo,
                            linea: temp.linea,
                            columna: temp.columna
                        }
                    }
                    errores.add("Semántico", "La posición no existe en el arreglo(B)." , expresion.linea, expresion.columna);
                    return {
                        valor: null,
                        tipo: "ERROR",
                        linea: expresion.linea,
                        columna: expresion.columna
                    }
                }
                errores.add("Semántico", "La variable no es un arreglo." , expresion.linea, expresion.columna);
                return {
                    valor: null,
                    tipo: "ERROR",
                    linea: expresion.linea,
                    columna: expresion.columna
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
        errores.add("Semántico", `Las posiciones ingresadas deben ser de tipo INT.` , instruccion.linea, instruccion.columna);
        return {
            valor: null,
            tipo: "ERROR",
            linea: expresion.linea,
            columna: expresion.columna
        }
    }

}


//Operacioness

function suma(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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



function resta(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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


function multiplicacion(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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


function division(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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


function potencia(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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

function modulo(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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
    const izquierda = Operaciones(_izquierda, entorno, errores)
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

//Operaciones
function igual(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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
    const condicion = Operaciones(_condicion, entorno, errores)
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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

function and(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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
    errores.add("Semántico", "No se pudo validar la operación and. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function or(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const derecha = Operaciones(_derecha, entorno, errores)
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
    errores.add("Semántico", "No se pudo validar la operación or. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function not(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
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
    errores.add("Semántico", "No se pudo validar la operación not. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

//Otros
function casteo(_casteo, _expresion, entorno, errores){
    const valor = Operaciones(_expresion, entorno, errores)
    const nuevo = _casteo
    const tipoSalida = Tipos(valor.tipo, nuevo, TIPO_OPERACION.CASTEO)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.INT){
            let salida = valor;
            if(valor.tipo === TIPO_DATO.CHAR){
                salida.valor = salida.valor.charCodeAt(0)
            }else if(valor.tipo === TIPO_DATO.DOUBLE){
                salida.valor = Math.trunc(salida.valor)
            }
            return {
                valor: salida.valor,
                tipo: tipoSalida,
                linea: valor.linea,
                columna: valor.columna
            }
        }else if(tipoSalida === TIPO_DATO.DOUBLE){
            let salida = valor;
            if(valor.tipo === TIPO_DATO.CHAR){
                salida.valor = salida.valor.charCodeAt(0)
                salida.valor = salida.valor + 0.0
            }else if(valor.tipo === TIPO_DATO.INT){
                salida.valor = salida.valor + 0.0
            }
            return {
                valor: salida.valor,
                tipo: tipoSalida,
                linea: valor.linea,
                columna: valor.columna
            }
        }else if(tipoSalida === TIPO_DATO.CHAR){
            let salida = valor;
            if(valor.tipo === TIPO_DATO.INT){
                salida.valor = String.fromCharCode(salida.valor)
            }
            return {
                valor: salida.valor,
                tipo: tipoSalida,
                linea: valor.linea,
                columna: valor.columna
            }
        }
    }
    errores.add("Semántico", `Casteo Invalido. ${valor.tipo} no puede ser casteado a ${nuevo}.`  , valor.linea, valor.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function incremento(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, null, TIPO_OPERACION.INCREMENTO)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.DOUBLE || tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            const resultado = op1.valor + 1;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }
    }
    errores.add("Semántico", "No se pudo realizar el incremento. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

function decremento(_izquierda, _derecha, entorno, errores){
    const izquierda = Operaciones(_izquierda, entorno, errores)
    const tipoSalida = Tipos(izquierda.tipo, null, TIPO_OPERACION.DECREMENTO)
    if(tipoSalida!=null){
        if(tipoSalida === TIPO_DATO.DOUBLE || tipoSalida === TIPO_DATO.INT){
            let op1 = izquierda;
            const resultado = op1.valor - 1;
            return {
                valor: resultado,
                tipo: tipoSalida,
                linea: _izquierda.linea,
                columna: _izquierda.columna
            }
        }
    }
    errores.add("Semántico", "No se pudo realizar el decremento. Tipos Invalidos."  , _izquierda.linea, _izquierda.columna);
    return {
        valor: null,
        tipo: "ERROR",
        linea: null,
        columna: null
    }
}

module.exports = Operaciones