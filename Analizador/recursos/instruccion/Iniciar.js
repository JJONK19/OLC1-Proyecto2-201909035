//Prepara y carga la informacion relevante
const TIPO_INSTRUCCION = require("../enum/TipoInstruccion")
const AsignacionVariable = require("./AsignacionVariable")
const AsignacionArreglos = require("./AsignacionArreglo")
const DeclararVariable = require("./DeclararVariable")
const DeclararArreglos = require("./DeclararArreglos")
const DeclararMetodo = require("./DeclararMetodo")
const ListaErrores = require("../errores/ListaErrores");
const ListaSimbolos = require("../datos/ListaSimbolos");
const Run = require("./Run")

function Iniciar(instrucciones, entorno, errores, simbolo){
    var salida = ""
    
    //Declaracion, asignacion y creacion de metodos y variables
    for(let i = 0; i< instrucciones.length; i++){
        if (instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACIONV){
            var consola = DeclararVariable(instrucciones[i], entorno, errores, simbolo, "GLOBAL")
            if(consola != null){
                salida += consola + "\n"
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACIONV){
            var consola = AsignacionVariable(instrucciones[i], entorno, errores, simbolo, "GLOBAL")
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACIONA1 || instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACIONA2){
            var consola = DeclararArreglos(instrucciones[i], entorno, errores, simbolo, "GLOBAL")
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACIONA){
            var consola = AsignacionArreglos(instrucciones[i], entorno, errores, simbolo, "GLOBAL")
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if (instrucciones[i].tipo === TIPO_INSTRUCCION.DMETODO){
            var consola = DeclararMetodo(instrucciones[i], entorno)
            if(consola != null){
                salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
            }
        }
    }

    //Ejecutar las funciones con Run
    for(let i = 0; i < instrucciones.length; i++){
        if (instrucciones[i].tipo === TIPO_INSTRUCCION.RUN){
            var consola = Run(instrucciones[i], entorno)
            if(consola != null){
                if(typeof consola === 'object'){
                    salida += consola.descripcion + " Fila: " + consola.linea + " Columna: " + consola.columna +'\n'
                }
                salida += consola +'\n'
            }
        }
    }
    return salida
}

module.exports = Iniciar