//Constructor de Instrucciones
const TIPO_INSTRUCCION = require("../enum/TipoInstruccion")

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
    valor: function(_valor, _tipo, _linea, _columna){
        return{
            valor: _valor,
            tipo: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    declaracionv: function(_id, _valor, _tipodato, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DECLARACIONV,
            id: _id,
            valor: _valor,
            tipodato: _tipodato,
            linea: _linea,
            columna: _columna
        }
    },
    asignacionv: function(_id, _expresion, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACIONV,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
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