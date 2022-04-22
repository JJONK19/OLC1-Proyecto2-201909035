//Constructor de Instrucciones
const TIPO_INSTRUCCION = require("../enum/TipoInstruccion")
const TIPO_VALOR = require("../enum/TipoValor")
//Tipo es el tipo de instruccion

const Instruccion = {
    operacion: function(_izquierda, _derecha, _tipo, _linea, _columna){
        return {
            izquierda: _izquierda,
            derecha: _derecha,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    ternario: function(_condicion, _izquierda, _derecha, _tipo, _linea, _columna){
        return {
            condicion: _condicion,
            izquierda: _izquierda,
            derecha: _derecha,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    valor: function(_valor, _tipo, _linea, _columna){
        return{
            valor: _valor,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    valorv: function(_identificador, _expresion1, _expresion2, _linea, _columna){
        return{
            id: _identificador,
            posicion1: _expresion1,
            posicion2: _expresion2,
            tipo: TIPO_VALOR.VECTORU,
            linea: _linea,
            columna: _columna
        }
    },
    asignarv: function(_identificador, _expresion1, _expresion2, _expresion,  _linea, _columna){
        return{
            id: _identificador,
            posicion1: _expresion1,
            posicion2: _expresion2,
            expresion: _expresion,
            tipo: TIPO_INSTRUCCION.ASIGNACIONA,
            linea: _linea,
            columna: _columna
        }
    },
    casteo: function(_casteo, _valor, _tipo, _linea, _columna){
        return{
            casteo: _casteo,
            valor: _valor,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    declaracionv: function(_tipodato, _listaid, _valor, _linea, _columna){
        return {
            tipodato: _tipodato,                //Tipado de las variables
            id: _listaid,                       //Lista de identificadores
            valor: _valor,                      //Valor a asignar a las variables
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.DECLARACIONV
        }
    },
    asignacionv: function(_id, _expresion, _linea, _columna){
        return {
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.ASIGNACIONV
        }
    },
    //Declaracion de Vector de Tipo 1
    declaraciona1: function(_tipo1, _id, _tipo2, _tamaño1, _tamaño2, _linea, _columna){
        return {
            tipo1: _tipo1,                
            id: _id,     
            tipo2: _tipo2,                  
            tamaño1: _tamaño1,
            tamaño2: _tamaño2,                      
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.DECLARACIONA1
        }
    },
    //Declaracion de Vector de Tipo 2
    declaraciona2: function(_dimension, _tipo1, _id, _valores, _linea, _columna){
        return {
            dimension: _dimension,
            tipo1: _tipo1,                
            id: _id,
            valores: _valores,     
            linea: _linea,
            columna: _columna,
            tipo: TIPO_INSTRUCCION.DECLARACIONA2
        }
    },
    while: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    dmetodo: function(_nombre, _parametros, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DMETODO,
            nombre: _nombre,
            parametros: _parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    llamada: function(_nombre, _valores, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.LLAMADA,
            nombre: _nombre,
            valores: _valores,
            linea: _linea,
            columna: _columna
        }
    },
    print: function(_expresion, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },
    run: function(_nombre, _valores, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.RUN,
            nombre: _nombre,
            valores: _valores,
            linea: _linea,
            columna: _columna
        }
    }
}

module.exports = Instruccion