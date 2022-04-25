//Tioos de Instruccion que pueden encontrarse en el lenguaje
const TIPO_INSTRUCCION = {
    //Declaraciones
    DECLARACIONV: 'DECLARACIONV',
    DECLARACIONP: 'DECLARACIONP',
    DECLARACIONA1: 'DECLARACIONA1',       //Vectores TIpo 1
    DECLARACIONA2: 'DECLARACIONA2',
    DECLARACIONA3: 'DECLARACIONA3',
    DMETODO: 'DMETODO',
    DFUNCION: 'DFUNCION',
    ASIGNACIONV: 'ASIGNACIONV',       //Vectores TIpo 2
    ASIGNACIONA: 'ASIGNACIONA',
    //Operaciones
    RUN: 'RUN',
    RETURN: 'RETURN',
    LLAMADA: 'LLAMADA',
    LLAMADAA: 'LLAMADAA',     //LLamada Asignacion
    WHILE: 'WHILE',
    PRINT: 'PRINT',
    PRINTLN: 'PRINTLN',
    UPPER: 'UPPER',
    ROUND: 'ROUND',
    LENGTH: 'LENGTH',
    TYPEOF: 'TYPEOF',
    TOSTRING: 'TOSTRING',
    TOCHAR: 'TOCHAR',
    LOWER: 'LOWER',
    //Sentencias de control
    IF: 'IF',
    SWITCH: 'SWITCH',
    BREAK: 'BREAK'
    
}

module.exports = TIPO_INSTRUCCION
