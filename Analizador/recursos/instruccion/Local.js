//Manejo de datos encapsulados entren llaves
const TIPO_INSTRUCCION = require("../enum/TipoInstruccion")
const AsignacionVariable = require("./AsignacionVariable")
const AsignacionArreglos = require("./AsignacionArreglo")
const DeclararVariable = require("./DeclararVariable")
const DeclararArreglos = require("./DeclararArreglos")
const While = require("./While")
const Print = require("./Print")
const Return = require("./Return")

function Local(instrucciones, entorno, errores, simbolo){
    var salida = ""
    instrucciones.forEach(instruccion=>{
        if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACIONV){
            var consola = DeclararVariable(instruccion, entorno, errores, simbolo, entorno.nombre)
            if(consola != null){
                salida += consola + "\n"
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACIONV){
            var consola = AsignacionVariable(instruccion, entorno, errores, simbolo, entorno.nombre)
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACIONA1 || instruccion.tipo === TIPO_INSTRUCCION.DECLARACIONA2){
            var consola = DeclararArreglos(instruccion, entorno, errores, simbolo, entorno.nombre)
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACIONA){
            var consola = AsignacionArreglos(instruccion, entorno, errores, simbolo, entorno.nombre)
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA){
            const Run = require('./Run')
            var consola = Run(instruccion, entorno, errores, simbolo)
            if(consola != null){
                if(typeof(consola) == 'object'){
                    salida += consola.salida +'\n'
                }else{
                    salida += consola +'\n'
                }
            }
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.RETURN){
            var consola = Return(instruccion, entorno, errores, simbolo)
            if(consola != null){
                if(typeof(consola) == 'object'){
                    return{
                        resultado: consola,
                        salida: salida
                    }
                }else{
                    salida += consola +'\n'
                    return salida
                }
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var consola = While(instruccion, entorno, errores, simbolo)
            if(consola != null){
                salida += consola +'\n'
            }
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            var consola = Print(instruccion, entorno)
            if(consola != null){
                salida += consola +'\n'
            }
        }
    })
    return salida
}

module.exports = Local